
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-bold mb-4 strat-gradient inline-block px-6 py-3 rounded-lg">
          Strat AI Report
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Dashboard completo de análise de leads e campanhas conectado ao Supabase
        </p>
        <Button 
          size="lg"
          onClick={() => navigate('/login')}
          className="bg-primary hover:bg-primary/90 px-8 py-6"
        >
          Entrar no Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Index;
