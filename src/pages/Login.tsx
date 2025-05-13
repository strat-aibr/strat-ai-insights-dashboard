
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';
import { LoginForm } from '@/components/auth/LoginForm';

const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 strat-gradient inline-block px-4 py-2 rounded-lg">
            Strat AI Report
          </h1>
          <p className="text-muted-foreground">
            Dashboard de análise de leads e campanhas
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
