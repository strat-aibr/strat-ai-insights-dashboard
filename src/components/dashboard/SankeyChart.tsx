
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
  return (
    <Card className="chart-container">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Fluxo de Campanhas</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <Sankey
              data={data}
              nodePadding={50}
              nodeWidth={10}
              linkCurvature={0.5}
              iterations={64}
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
