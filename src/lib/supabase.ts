
import { supabase as supabaseClient } from '@/integrations/supabase/client';
import { Database } from '@/types/supabase';

// Export the already configured client from the integration
export const supabase = supabaseClient;

// Types for the application
export type Card = {
  id: number;
  nome: string;
  numero_de_telefone: string;
  user_id: string;
  fonte: string;
  campanha: string;
  conjunto: string;
  anuncio: string;
  palavra_chave: string;
  browser: string;
  location: string;
  dispositivo: string;
  data_criacao: string;
  created_at: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  instancia: string;
};

export type LeadCount = {
  count: number;
  date: string;
};

export type MetricData = {
  totalLeads: number;
  trackedLeads: number;
  organicLeads: number;
  averageLeadsPerDay: number;
  percentChange: number;
};

export const generateClientToken = (userId: string): string => {
  // In a real implementation, this would be a more secure process
  // using JWT or a similar technology
  return btoa(`client-${userId}-${Date.now()}`);
};

export const decodeClientToken = (token: string): string | null => {
  try {
    const decoded = atob(token);
    const userId = decoded.split('-')[1];
    return userId;
  } catch (e) {
    console.error('Invalid token', e);
    return null;
  }
};
