
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ResponsiveContainer, 
  Sankey, 
  Tooltip 
} from 'recharts';

// Sankey diagram requires specific data structure
type SankeyNode = {
  name: string;
};

type SankeyLink = {
  source: number;
  target: number;
  value: number;
};

type SankeyData = {
  nodes: SankeyNode[];
  links: SankeyLink[];
};

type SankeyChartProps = {
  data: SankeyData;
};

export function SankeyChart({ data }: SankeyChartProps) {
  // Validate and ensure the Sankey data doesn't have circular references
  const validateSankeyData = (data: SankeyData): SankeyData => {
    if (!data || !data.nodes || !data.links || data.nodes.length === 0) {
      return { nodes: [{ name: 'No Data' }], links: [] };
    }

    // Create a map to check for circular references
    const validLinks = data.links.filter(link => {
      // Ensure source and target are valid indices
      if (link.source === undefined || 
          link.target === undefined || 
          link.source === link.target ||
          link.source < 0 || 
          link.target < 0 || 
          link.source >= data.nodes.length || 
          link.target >= data.nodes.length) {
        return false;
      }
      
      return true;
    });

    return {
      nodes: data.nodes,
      links: validLinks
    };
  };

  // Apply validation to the data
  const safeData = validateSankeyData(data);

  // If no valid links, show a placeholder message
  if (safeData.links.length === 0) {
    return (
      <Card className="chart-container">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Fluxo de Campanhas (Fonte → Campanha → Conjunto → Anúncio)</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex items-center justify-center h-[400px]">
          <p className="text-muted-foreground">Não há dados suficientes para exibir o fluxo de campanhas</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="chart-container">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Fluxo de Campanhas (Fonte → Campanha → Conjunto → Anúncio)</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <Sankey
              data={safeData}
              nodePadding={50}
              nodeWidth={10}
              linkCurvature={0.5}
              iterations={16} // Reduced iterations to prevent stack overflow
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <Tooltip 
                formatter={(value) => [`${value} leads`, 'Volume']}
                labelFormatter={(name) => `${name}`}
              />
            </Sankey>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
