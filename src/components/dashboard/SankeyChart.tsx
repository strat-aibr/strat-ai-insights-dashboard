
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ResponsiveContainer, 
  Sankey, 
  Tooltip,
  Layer,
  Text
} from 'recharts';
import { cn } from '@/lib/utils';

// Sankey diagram requires specific data structure
type SankeyNode = {
  name: string;
  color?: string;
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

// Define color palette for different node types
const getNodeColor = (nodeName: string): string => {
  if (nodeName.startsWith('Fonte:')) {
    return '#8884d8'; // Purple for source
  } else if (nodeName.startsWith('Campanha:')) {
    return '#82ca9d'; // Green for campaigns
  } else if (nodeName.startsWith('Conjunto:')) {
    return '#ffc658'; // Yellow for ad sets
  } else if (nodeName.startsWith('Anúncio:')) {
    return '#ff8042'; // Orange for ads
  }
  return '#83a6ed'; // Default blue
};

// Custom label rendering function
const renderCustomNodeLabel = ({ x, y, width, height, index, payload, name }: any) => {
  // Extract the node name without the prefix (Fonte:, Campanha:, etc.)
  let displayName = name;
  if (name.includes(':')) {
    displayName = name.split(': ')[1] || displayName;
  }
  
  // Truncate long names
  const truncatedName = displayName.length > 15 
    ? displayName.substring(0, 12) + '...' 
    : displayName;

  return (
    <Layer key={`CustomNode${index}`}>
      <Text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        verticalAnchor="middle"
        fill="#fff"
        fontSize={10}
        fontWeight="bold"
        stroke="#000"
        strokeWidth={0.5}
      >
        {truncatedName}
      </Text>
    </Layer>
  );
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

    // Assign colors to nodes based on their type
    const coloredNodes = data.nodes.map(node => ({
      ...node,
      color: getNodeColor(node.name)
    }));

    return {
      nodes: coloredNodes,
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
          <CardTitle className="text-lg">Fluxo de Campanhas</CardTitle>
          <p className="text-sm text-muted-foreground">Visualização do tráfego de leads: Fonte → Campanha → Conjunto → Anúncio</p>
        </CardHeader>
        <CardContent className="pt-0 flex items-center justify-center h-[400px]">
          <p className="text-muted-foreground">Não há dados suficientes para exibir o fluxo de campanhas</p>
        </CardContent>
      </Card>
    );
  }

  // Format node name to be cleaner in the tooltip
  const formatNodeName = (name: string) => {
    if (name.includes(':')) {
      const [type, value] = name.split(': ');
      return `${type}: ${value || 'Desconhecido'}`;
    }
    return name;
  };

  return (
    <Card className="chart-container">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Fluxo de Campanhas</CardTitle>
        <p className="text-sm text-muted-foreground">Visualização do tráfego de leads: Fonte → Campanha → Conjunto → Anúncio</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[550px]"> {/* Increased height for better visibility with labels */}
          <ResponsiveContainer width="100%" height="100%">
            <Sankey
              data={safeData}
              nodePadding={50} // Increased padding to give more space for labels
              nodeWidth={25} // Slightly increased node width
              linkCurvature={0.5}
              iterations={32}
              margin={{ top: 30, right: 30, bottom: 30, left: 30 }} // Increased margins
              link={{ 
                stroke: '#d0d0d0',
                opacity: 0.8, // Slight transparency for better visualization
              }}
              node={{
                fill: '#8884d8',
                stroke: '#fff',
                strokeWidth: 1,
              }}
            >
              <Tooltip 
                formatter={(value) => [`${value} leads`, 'Volume']}
                labelFormatter={(name) => formatNodeName(name)}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  padding: '10px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                }}
              />
              {safeData.nodes.map((entry, index) => (
                renderCustomNodeLabel({
                  ...entry,
                  index,
                  payload: entry
                })
              ))}
            </Sankey>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 text-xs text-muted-foreground flex flex-wrap justify-center gap-4">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 mr-1 rounded-sm" style={{ backgroundColor: '#8884d8' }}></span>
            <span>Fontes</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 mr-1 rounded-sm" style={{ backgroundColor: '#82ca9d' }}></span>
            <span>Campanhas</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 mr-1 rounded-sm" style={{ backgroundColor: '#ffc658' }}></span>
            <span>Conjuntos</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 mr-1 rounded-sm" style={{ backgroundColor: '#ff8042' }}></span>
            <span>Anúncios</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
