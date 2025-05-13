
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { FilterBar, FilterState } from '@/components/dashboard/FilterBar';
import { MetricsCards } from '@/components/dashboard/MetricsCards';
import { LeadsLineChart } from '@/components/dashboard/LeadsLineChart';
import { DeviceChart } from '@/components/dashboard/DeviceChart';
import { SankeyChart } from '@/components/dashboard/SankeyChart';
import { TopRankings } from '@/components/dashboard/TopRankings';
import { LeadsTable } from '@/components/dashboard/LeadsTable';
import { WeeklyHeatmap } from '@/components/dashboard/WeeklyHeatmap';
import { supabase } from '@/integrations/supabase/client';
import { Card as LeadCard, User } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { format, subMonths } from 'date-fns';

const Dashboard = () => {
  const { user, clientId, signOut, isAdmin } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<LeadCard[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);
  
  // Filter lists
  const [fontes, setFontes] = useState<string[]>([]);
  const [campanhas, setCampanhas] = useState<string[]>([]);
  const [conjuntos, setConjuntos] = useState<string[]>([]);
  const [anuncios, setAnuncios] = useState<string[]>([]);

  // For charts
  const [leadsByDay, setLeadsByDay] = useState<{ date: string; count: number }[]>([]);
  const [deviceData, setDeviceData] = useState<{ name: string; value: number }[]>([]);
  const [sankeyData, setSankeyData] = useState({
    nodes: [{ name: 'No Data' }],
    links: [{ source: 0, target: 0, value: 0 }]
  });
  const [topCampaigns, setTopCampaigns] = useState<{ name: string; value: number }[]>([]);
  const [topConjuntos, setTopConjuntos] = useState<{ name: string; value: number }[]>([]);
  const [topAnuncios, setTopAnuncios] = useState<{ name: string; value: number }[]>([]);
  const [heatmapData, setHeatmapData] = useState<{ [day: string]: { [hour: string]: number } }>({});
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    trackedLeads: 0,
    organicLeads: 0,
    averageLeadsPerDay: 0,
    percentChange: 0
  });

  // Set default date range to last 30 days
  const now = new Date();
  const thirtyDaysAgo = subMonths(now, 1);

  const [filters, setFilters] = useState<FilterState>({
    clientId: clientId || null,
    dateRange: {
      from: thirtyDaysAgo,
      to: now
    },
    fonte: null,
    campanha: null,
    conjunto: null,
    anuncio: null,
    search: ''
  });

  // If viewing as client, lock the clientId filter
  useEffect(() => {
    if (clientId) {
      setFilters(prev => ({ ...prev, clientId }));
    }
  }, [clientId]);

  // Load clients if admin
  useEffect(() => {
    const loadClients = async () => {
      if (isAdmin) {
        try {
          const { data, error } = await supabase
            .from('TRACKING | USERS')
            .select('*')
            .order('name');
          
          if (error) throw error;
          // Transform the data to match the User type structure
          const clientData: User[] = data?.map((item: any) => ({
            id: item.id.toString(), // Convert to string to match User type
            name: item.name || 'Unknown',
            email: item.email || '',
            instancia: item.instancia || ''
          })) || [];
          
          setClients(clientData);
        } catch (error: any) {
          console.error('Error loading clients:', error.message);
          toast({
            title: 'Erro ao carregar clientes',
            description: error.message,
            variant: 'destructive'
          });
        }
      }
    };

    loadClients();
  }, [isAdmin, toast]);

  // Load data based on filters
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Build the base query
        let query = supabase
          .from('TRACKING | CARDS')
          .select('*', { count: 'exact' });
        
        // Apply filters
        if (filters.clientId) {
          query = query.eq('user_id', parseInt(filters.clientId)); // Convert string to number
        }
        
        if (filters.dateRange.from) {
          const fromDate = format(filters.dateRange.from, 'yyyy-MM-dd');
          query = query.gte('data_criacao', fromDate);
        }
        
        if (filters.dateRange.to) {
          const toDate = format(filters.dateRange.to, 'yyyy-MM-dd');
          query = query.lte('data_criacao', toDate + 'T23:59:59');
        }
        
        if (filters.fonte) {
          query = query.eq('fonte', filters.fonte);
        }
        
        if (filters.campanha) {
          query = query.eq('campanha', filters.campanha);
        }
        
        if (filters.conjunto) {
          query = query.eq('conjunto', filters.conjunto);
        }
        
        if (filters.anuncio) {
          query = query.eq('anuncio', filters.anuncio);
        }
        
        if (filters.search) {
          query = query.or(`nome.ilike.%${filters.search}%,numero_de_telefone.ilike.%${filters.search}%`);
        }
        
        // Execute the query with pagination
        const { data, count, error } = await query
          .order('data_criacao', { ascending: false })
          .range(0, 9); // First 10 rows for the table
        
        if (error) throw error;
        
        // Transform data to match the LeadCard type
        const transformedData = data?.map((item: any) => ({
          id: item.id,
          nome: item.nome || '',
          numero_de_telefone: item.numero_de_telefone || '',
          user_id: item.user_id?.toString() || '', // Convert to string if needed
          fonte: item.fonte || '',
          campanha: item.campanha || '',
          conjunto: item.conjunto || '',
          anuncio: item.anuncio || '',
          palavra_chave: item.palavra_chave || '',
          browser: item.browser || '',
          location: item.location || '',
          dispositivo: item.dispositivo || '',
          data_criacao: item.data_criacao || '',
          created_at: item.created_at || ''
        })) || [];
        
        setLeads(transformedData);
        setTotalLeads(count || 0);

        // Once we have the filtered data, we can fetch the metrics, charts, etc.
        await fetchMetrics();
        await fetchFiltersData();
        await fetchChartData();
        
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
        toast({
          title: 'Erro ao carregar dados',
          description: error.message,
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    // This is a simplified mock for the metrics
    const fetchMetrics = async () => {
      // In a real implementation, these would come from Supabase queries
      // Here we're just generating mock data
      
      // Total leads based on already fetched data
      const total = totalLeads;
      
      // Tracked leads (with campaign data)
      const tracked = Math.floor(total * 0.8);
      
      // Organic leads
      const organic = total - tracked;
      
      // Calculate days in period
      let daysInPeriod = 30; // Default
      if (filters.dateRange.from && filters.dateRange.to) {
        const diffTime = Math.abs(filters.dateRange.to.getTime() - filters.dateRange.from.getTime());
        daysInPeriod = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      }
      
      // Average per day
      const average = total / daysInPeriod;
      
      // Percent change (mock)
      const percentChange = Math.random() > 0.5 ? 15.7 : -8.3;
      
      setMetrics({
        totalLeads: total,
        trackedLeads: tracked,
        organicLeads: organic,
        averageLeadsPerDay: average,
        percentChange: percentChange
      });
    };

    // Fetch the filter options
    const fetchFiltersData = async () => {
      try {
        // In a real implementation, these would be separate queries
        // Here we're creating mock data
        setFontes(['Google', 'Facebook', 'Instagram', 'Direct']);
        setCampanhas(['Brand', 'Retargeting', 'Cold Traffic', 'Partner']);
        setConjuntos(['Desktop', 'Mobile', 'Mixed', 'High Intent']);
        setAnuncios(['Banner A', 'Video 01', 'Carousel', 'Collection']);
      } catch (error: any) {
        console.error('Error fetching filter data:', error.message);
      }
    };

    // Fetch the chart data
    const fetchChartData = async () => {
      try {
        // Mock data for charts
        // In a real implementation, these would be based on Supabase queries
        
        // Leads by day
        const daysData = [];
        const startDate = filters.dateRange.from || new Date();
        const endDate = filters.dateRange.to || new Date();
        
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          daysData.push({
            date: format(currentDate, 'yyyy-MM-dd'),
            count: Math.floor(Math.random() * 20) + 5
          });
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        setLeadsByDay(daysData);
        
        // Device data
        setDeviceData([
          { name: 'Mobile', value: Math.floor(Math.random() * 100) + 50 },
          { name: 'Desktop', value: Math.floor(Math.random() * 70) + 30 },
          { name: 'Tablet', value: Math.floor(Math.random() * 30) + 10 },
          { name: 'Unknown', value: Math.floor(Math.random() * 15) + 5 }
        ]);
        
        // Sankey data
        setSankeyData({
          nodes: [
            { name: 'Google' },
            { name: 'Facebook' },
            { name: 'Brand' },
            { name: 'Retargeting' },
            { name: 'Desktop' },
            { name: 'Mobile' },
            { name: 'Banner A' },
            { name: 'Video 01' }
          ],
          links: [
            { source: 0, target: 2, value: 30 },
            { source: 0, target: 3, value: 20 },
            { source: 1, target: 2, value: 15 },
            { source: 1, target: 3, value: 25 },
            { source: 2, target: 4, value: 25 },
            { source: 2, target: 5, value: 20 },
            { source: 3, target: 4, value: 15 },
            { source: 3, target: 5, value: 30 },
            { source: 4, target: 6, value: 25 },
            { source: 4, target: 7, value: 15 },
            { source: 5, target: 6, value: 20 },
            { source: 5, target: 7, value: 30 }
          ]
        });
        
        // Top performers
        setTopCampaigns([
          { name: 'Brand', value: 145 },
          { name: 'Retargeting', value: 120 },
          { name: 'Cold Traffic', value: 85 },
          { name: 'Partner', value: 65 },
          { name: 'Promotion', value: 40 }
        ]);
        
        setTopConjuntos([
          { name: 'Desktop', value: 110 },
          { name: 'Mobile', value: 105 },
          { name: 'Mixed', value: 90 },
          { name: 'High Intent', value: 80 },
          { name: 'Low Cost', value: 70 }
        ]);
        
        setTopAnuncios([
          { name: 'Banner A', value: 85 },
          { name: 'Video 01', value: 75 },
          { name: 'Carousel', value: 65 },
          { name: 'Collection', value: 55 },
          { name: 'Product Feed', value: 45 }
        ]);
        
        // Heatmap data
        const heatmap: { [day: string]: { [hour: string]: number } } = {};
        
        // Initialize days
        for (let day = 0; day < 7; day++) {
          heatmap[day.toString()] = {};
          // Initialize hours
          for (let hour = 0; hour < 24; hour++) {
            const hourKey = hour.toString().padStart(2, '0');
            heatmap[day.toString()][hourKey] = Math.floor(Math.random() * 8);
          }
        }
        
        setHeatmapData(heatmap);
        
      } catch (error: any) {
        console.error('Error fetching chart data:', error.message);
      }
    };

    fetchData();
  }, [filters, toast, totalLeads]);

  const handleExport = () => {
    // In a real implementation, this would export the data
    // based on the current filters
    toast({
      title: 'Exportação iniciada',
      description: 'Os dados filtrados serão baixados em breve.'
    });
  };

  const generateClientLink = () => {
    if (!filters.clientId) {
      toast({
        title: 'Selecione um cliente',
        description: 'É necessário selecionar um cliente para gerar o link.',
        variant: 'destructive'
      });
      return;
    }

    const token = btoa(`client-${filters.clientId}-${Date.now()}`);
    const url = `${window.location.origin}/dashboard/client?token=${token}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: 'Link copiado',
        description: 'O link de acesso do cliente foi copiado para a área de transferência.'
      });
    });
  };

  return (
    <div className="dashboard-layout">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Strat AI Report</h1>
          <p className="text-muted-foreground">
            Dashboard de análise de leads e campanhas
          </p>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <Button variant="outline" onClick={generateClientLink}>
              Gerar Link de Cliente
            </Button>
          )}
          <Button variant="outline" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <FilterBar
        filters={filters}
        setFilters={setFilters}
        clients={clients}
        fontes={fontes}
        campanhas={campanhas}
        conjuntos={conjuntos}
        anuncios={anuncios}
        onExport={handleExport}
        isClientView={!!clientId}
      />

      <div className="space-y-6">
        <MetricsCards metrics={metrics} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LeadsLineChart data={leadsByDay} />
          <DeviceChart data={deviceData} />
        </div>

        <SankeyChart data={sankeyData} />

        <TopRankings
          topCampaigns={topCampaigns}
          topConjuntos={topConjuntos}
          topAnuncios={topAnuncios}
        />

        <LeadsTable leads={leads} totalLeads={totalLeads} />

        <WeeklyHeatmap data={heatmapData} />
      </div>
    </div>
  );
};

export default Dashboard;
