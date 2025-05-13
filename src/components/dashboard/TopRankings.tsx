
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type RankingItem = {
  name: string;
  value: number;
};

type TopRankingsProps = {
  topCampaigns: RankingItem[];
  topConjuntos: RankingItem[];
  topAnuncios: RankingItem[];
};

export function TopRankings({ 
  topCampaigns, 
  topConjuntos, 
  topAnuncios 
}: TopRankingsProps) {
  // Cores para destacar os valores
  const colors = {
    campaigns: 'bg-primary/20',
    conjuntos: 'bg-accent/20',
    anuncios: 'bg-success/20'
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="stat-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Top 5 Campanhas</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {topCampaigns.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-primary/10 text-primary font-medium rounded w-6 h-6 flex items-center justify-center mr-2">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium truncate max-w-[240px]" title={item.name}>
                    {item.name}
                  </span>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-md ${colors.campaigns}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="stat-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Top 5 Conjuntos</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {topConjuntos.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-accent/10 text-accent font-medium rounded w-6 h-6 flex items-center justify-center mr-2">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium truncate max-w-[240px]" title={item.name}>
                    {item.name}
                  </span>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-md ${colors.conjuntos}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="stat-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Top 5 Anúncios</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {topAnuncios.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-success/10 text-success font-medium rounded w-6 h-6 flex items-center justify-center mr-2">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium truncate max-w-[240px]" title={item.name}>
                    {item.name}
                  </span>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-md ${colors.anuncios}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
