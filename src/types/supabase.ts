
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cards: {
        Row: {
          id: number
          nome: string
          numero_de_telefone: string
          user_id: string
          fonte: string
          campanha: string
          conjunto: string
          anuncio: string
          palavra_chave: string
          browser: string
          location: string
          dispositivo: string
          data_criacao: string
          created_at: string
        }
        Insert: {
          id?: number
          nome: string
          numero_de_telefone: string
          user_id: string
          fonte?: string
          campanha?: string
          conjunto?: string
          anuncio?: string
          palavra_chave?: string
          browser?: string
          location?: string
          dispositivo?: string
          data_criacao: string
          created_at?: string
        }
        Update: {
          id?: number
          nome?: string
          numero_de_telefone?: string
          user_id?: string
          fonte?: string
          campanha?: string
          conjunto?: string
          anuncio?: string
          palavra_chave?: string
          browser?: string
          location?: string
          dispositivo?: string
          data_criacao?: string
          created_at?: string
        }
      }
      user: {
        Row: {
          id: string
          name: string
          email: string
          instancia: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          instancia?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          instancia?: string
        }
      }
    }
  }
}
