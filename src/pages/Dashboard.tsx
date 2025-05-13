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
  const [page, setPage] = useState(1);
  
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
  const [weekdayData, setWeekdayData] = useState<{ [day: string]: number }>({});
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    trackedLeads: 0,
    organicLeads: 0,
    averageLeadsPerDay: 0,
    percentChange: 0
  });

  // Handle page change for the leads table
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

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

  // Load filter options from available data
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        // Building the query
        let query = supabase
          .from('TRACKING | CARDS')
          .select('fonte, campanha, conjunto, anuncio');
        
        // Apply client filter if set
        if (filters.clientId) {
          query = query.eq('user_id', parseInt(filters.clientId));
        }
        
        const { data, error } = await query;
        
        if (error) throw error;

        if (data && data.length > 0) {
          // Extract unique values for each filter
          const uniqueFontes = [...new Set(data.map(item => item.fonte).filter(Boolean))];
          const uniqueCampanhas = [...new Set(data.map(item => item.campanha).filter(Boolean))];
          const uniqueConjuntos = [...new Set(data.map(item => item.conjunto).filter(Boolean))];
          const uniqueAnuncios = [...new Set(data.map(item => item.anuncio).filter(Boolean))];

          setFontes(uniqueFontes);
          setCampanhas(uniqueCampanhas);
          setConjuntos(uniqueConjuntos);
          setAnuncios(uniqueAnuncios);
        }
      } catch (error: any) {
        console.error('Error loading filter options:', error.message);
      }
    };

    loadFilterOptions();
  }, [filters.clientId]);

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
        
        // Calculate pagination
        const pageSize = 10;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize - 1;
        
        // Execute the query with ordering by data_criacao and pagination
        const { data, count, error } = await query
          .order('data_criacao', { ascending: false })
          .range(startIndex, endIndex);
        
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

        // Once we have the filtered data, we need to fetch all data to generate metrics and charts
        fetchAllFilteredData();
        
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

    // Fetch all data matching the current filters to generate metrics and charts
    const fetchAllFilteredData = async () => {
      try {
        // Build the base query - same filters but no pagination
        let query = supabase
          .from('TRACKING | CARDS')
          .select('*');
        
        // Apply all the same filters
        if (filters.clientId) {
          query = query.eq('user_id', parseInt(filters.clientId));
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
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        if (data) {
          generateMetricsAndCharts(data);
        }
      } catch (error: any) {
        console.error('Error fetching all data:', error.message);
      }
    };

    const generateMetricsAndCharts = (data: any[]) => {
      // Generate metrics
      const total = data.length;
      
      // Count leads with source "Orgânico"
      const organic = data.filter(item => item.fonte === "Orgânico").length;
      
      // Count leads with any source except "Orgânico"
      const tracked = data.filter(item => item.fonte && item.fonte !== "Orgânico").length;
      
      // Calculate days in period
      let daysInPeriod = 30; // Default
      if (filters.dateRange.from && filters.dateRange.to) {
        const diffTime = Math.abs(filters.dateRange.to.getTime() - filters.dateRange.from.getTime());
        daysInPeriod = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      }
      
      // Average per day
      const average = total / daysInPeriod;
      
      // Set metrics
      setMetrics({
        totalLeads: total,
        trackedLeads: tracked,
        organicLeads: organic,
        averageLeadsPerDay: average,
        percentChange: 0 // This would require historical data to calculate
      });
      
      // Generate leads by day chart data
      const leadsByDayMap = new Map();
      data.forEach(item => {
        if (item.data_criacao) {
          const date = item.data_criacao.split('T')[0]; // Get just the date part
          leadsByDayMap.set(date, (leadsByDayMap.get(date) || 0) + 1);
        }
      });
      
      const leadsByDayArray = Array.from(leadsByDayMap).map(([date, count]) => ({
        date,
        count
      })).sort((a, b) => a.date.localeCompare(b.date));
      
      setLeadsByDay(leadsByDayArray);
      
      // Generate device chart data
      const deviceMap = new Map();
      data.forEach(item => {
        if (item.dispositivo) {
          deviceMap.set(item.dispositivo, (deviceMap.get(item.dispositivo) || 0) + 1);
        } else {
          deviceMap.set('Unknown', (deviceMap.get('Unknown') || 0) + 1);
        }
      });
      
      const deviceArray = Array.from(deviceMap).map(([name, value]) => ({
        name,
        value
      })).sort((a, b) => b.value - a.value);
      
      setDeviceData(deviceArray);
      
      // Generate Sankey chart data (Fonte -> Conjunto -> Anúncio)
      const sankeyData = generateSankeyData(data);
      setSankeyData(sankeyData);
      
      // Generate top campaigns, conjuntos, and anuncios
      generateTopLists(data);
      
      // Generate weekday data
      generateWeekdayData(data);
    };

    const generateSankeyData = (data: any[]) => {
      try {
        // Mapeamento para nomes mais legíveis
        const getReadableName = (type: string, value: string | null): string => {
          if (!value) return `${type}: Desconhecido`;
          return `${type}: ${value}`;
        };

        // Coletar dados únicos organizados por tipo
        const fontes = new Map();
        const campanhas = new Map();
        const conjuntos = new Map();
        const anuncios = new Map();
        
        // Mapeamento para contar relações entre elementos
        const fonteToCampanha = new Map();
        const campanhaToConjunto = new Map();
        const conjuntoToAnuncio = new Map();
        
        // Processar todos os leads e contar ocorrências
        data.forEach(item => {
          const fonte = item.fonte || 'Desconhecido';
          const campanha = item.campanha || 'Desconhecido';
          const conjunto = item.conjunto || 'Desconhecido';
          const anuncio = item.anuncio || 'Desconhecido';
          
          // Incrementar contagens para cada elemento
          fontes.set(fonte, (fontes.get(fonte) || 0) + 1);
          campanhas.set(campanha, (campanhas.get(campanha) || 0) + 1);
          conjuntos.set(conjunto, (conjuntos.get(conjunto) || 0) + 1);
          anuncios.set(anuncio, (anuncios.get(anuncio) || 0) + 1);
          
          // Incrementar contagens para cada relação
          const fonteToKey = `${fonte}->${campanha}`;
          fonteToCampanha.set(fonteToKey, (fonteToCampanha.get(fonteToKey) || 0) + 1);
          
          const campanhaToKey = `${campanha}->${conjunto}`;
          campanhaToConjunto.set(campanhaToKey, (campanhaToConjunto.get(campanhaToKey) || 0) + 1);
          
          const conjuntoToKey = `${conjunto}->${anuncio}`;
          conjuntoToAnuncio.set(conjuntoToKey, (conjuntoToAnuncio.get(conjuntoToKey) || 0) + 1);
        });
        
        // Criar nós com prefixos para evitar conflitos de nome
        const nodes: { name: string }[] = [];
        
        // Adicionar os nós com prefixos para garantir exclusividade
        Array.from(fontes.keys()).forEach(fonte => 
          nodes.push({ name: getReadableName('Fonte', fonte) }));
        
        Array.from(campanhas.keys()).forEach(campanha => 
          nodes.push({ name: getReadableName('Campanha', campanha) }));
        
        Array.from(conjuntos.keys()).forEach(conjunto => 
          nodes.push({ name: getReadableName('Conjunto', conjunto) }));
        
        Array.from(anuncios.keys()).forEach(anuncio => 
          nodes.push({ name: getReadableName('Anúncio', anuncio) }));
        
        // Criar links
        const links: { source: number; target: number; value: number }[] = [];
        
        // Mapear índices dos nós
        const nodeMap = new Map();
        nodes.forEach((node, index) => {
          nodeMap.set(node.name, index);
        });
        
        // Adicionar links de fonte para campanha
        fonteToCampanha.forEach((value, key) => {
          const [fonte, campanha] = key.split('->');
          const sourceIndex = nodeMap.get(getReadableName('Fonte', fonte));
          const targetIndex = nodeMap.get(getReadableName('Campanha', campanha));
          
          if (sourceIndex !== undefined && targetIndex !== undefined) {
            links.push({
              source: sourceIndex,
              target: targetIndex,
              value
            });
          }
        });
        
        // Adicionar links de campanha para conjunto
        campanhaToConjunto.forEach((value, key) => {
          const [campanha, conjunto] = key.split('->');
          const sourceIndex = nodeMap.get(getReadableName('Campanha', campanha));
          const targetIndex = nodeMap.get(getReadableName('Conjunto', conjunto));
          
          if (sourceIndex !== undefined && targetIndex !== undefined) {
            links.push({
              source: sourceIndex,
              target: targetIndex,
              value
            });
          }
        });
        
        // Adicionar links de conjunto para anúncio
        conjuntoToAnuncio.forEach((value, key) => {
          const [conjunto, anuncio] = key.split('->');
          const sourceIndex = nodeMap.get(getReadableName('Conjunto', conjunto));
          const targetIndex = nodeMap.get(getReadableName('Anúncio', anuncio));
          
          if (sourceIndex !== undefined && targetIndex !== undefined) {
            links.push({
              source: sourceIndex,
              target: targetIndex,
              value
            });
          }
        });
        
        // Se não houver dados suficientes, retornar estrutura vazia
        if (nodes.length <= 1 || links.length === 0) {
          return {
            nodes: [{ name: 'No Data' }],
            links: []
          };
        }
        
        return { nodes, links };
      } catch (error) {
        console.error('Error generating Sankey data:', error);
        return {
          nodes: [{ name: 'Error' }],
          links: []
        };
      }
    };

    const generateTopLists = (data: any[]) => {
      // Count campaigns
      const campaignMap = new Map();
      data.forEach(item => {
        if (item.campanha) {
          campaignMap.set(item.campanha, (campaignMap.get(item.campanha) || 0) + 1);
        }
      });
      
      const campaignArray = Array.from(campaignMap).map(([name, value]) => ({
        name,
        value
      })).sort((a, b) => b.value - a.value).slice(0, 5);
      
      setTopCampaigns(campaignArray);
      
      // Count conjuntos
      const conjuntoMap = new Map();
      data.forEach(item => {
        if (item.conjunto) {
          conjuntoMap.set(item.conjunto, (conjuntoMap.get(item.conjunto) || 0) + 1);
        }
      });
      
      const conjuntoArray = Array.from(conjuntoMap).map(([name, value]) => ({
        name,
        value
      })).sort((a, b) => b.value - a.value).slice(0, 5);
      
      setTopConjuntos(conjuntoArray);
      
      // Count anuncios
      const anuncioMap = new Map();
      data.forEach(item => {
        if (item.anuncio) {
          anuncioMap.set(item.anuncio, (anuncioMap.get(item.anuncio) || 0) + 1);
        }
      });
      
      const anuncioArray = Array.from(anuncioMap).map(([name, value]) => ({
        name,
        value
      })).sort((a, b) => b.value - a.value).slice(0, 5);
      
      setTopAnuncios(anuncioArray);
    };

    const generateWeekdayData = (data: any[]) => {
      // Initialize counters for each day of the week (0 = Sunday, 6 = Saturday)
      const weekdayCounts = {
        '0': 0, // Sunday
        '1': 0, // Monday
        '2': 0, // Tuesday
        '3': 0, // Wednesday
        '4': 0, // Thursday
        '5': 0, // Friday
        '6': 0  // Saturday
      };
      
      // Count leads by day of week
      data.forEach(item => {
        if (item.data_criacao) {
          const date = new Date(item.data_criacao);
          const dayOfWeek = date.getDay().toString();
          weekdayCounts[dayOfWeek] = weekdayCounts[dayOfWeek] + 1;
        }
      });
      
      setWeekdayData(weekdayCounts);
    };

    fetchData();
  }, [filters, page, toast]);

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1">
            <TopRankings
              topCampaigns={topCampaigns}
              topConjuntos={topConjuntos}
              topAnuncios={topAnuncios}
            />
          </div>
          <div className="col-span-1 lg:col-span-2">
            <LeadsTable 
              leads={leads} 
              totalLeads={totalLeads} 
              onPageChange={handlePageChange}
            />
          </div>
        </div>

        <WeeklyHeatmap data={weekdayData} />
      </div>
    </div>
  );
};

export default Dashboard;
