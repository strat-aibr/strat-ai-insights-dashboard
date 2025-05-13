
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// These will be replaced with actual values when connected via the Supabase integration
// For now, we're using placeholders
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

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
