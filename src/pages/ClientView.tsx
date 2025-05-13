
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { decodeClientToken } from '@/lib/supabase';
import Dashboard from './Dashboard';

const ClientView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Parse token from URL
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    // Validate token
    if (!token) {
      navigate('/unauthorized');
      return;
    }
    
    const userId = decodeClientToken(token);
    if (!userId) {
      navigate('/unauthorized');
    }
  }, [location.search, navigate]);

  return <Dashboard />;
};

export default ClientView;
