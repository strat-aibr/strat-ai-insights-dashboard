
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Acesso não autorizado</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Você não tem permissão para acessar esta página ou o link expirou.
        </p>
        <Button onClick={() => navigate('/login')}>Voltar para o Login</Button>
      </div>
    </div>
  );
};

export default Unauthorized;
