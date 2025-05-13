export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "[BC] [RELATÓRIO] [002. Ls Serviços de Cobrança LTDA]": {
        Row: {
          atendente: string | null
          created_at: string | null
          data: string | null
          fonte: string | null
          id: number | null
          id_bc: number | null
          mensagem: string | null
          nome: string | null
          telefone: string | null
        }
        Insert: {
          atendente?: string | null
          created_at?: string | null
          data?: string | null
          fonte?: string | null
          id?: number | null
          id_bc?: number | null
          mensagem?: string | null
          nome?: string | null
          telefone?: string | null
        }
        Update: {
          atendente?: string | null
          created_at?: string | null
          data?: string | null
          fonte?: string | null
          id?: number | null
          id_bc?: number | null
          mensagem?: string | null
          nome?: string | null
          telefone?: string | null
        }
        Relationships: []
      }
      "[BC][RELATÓRIO][002. Ls Serviços de Cobrança LTDA][Itajaí]": {
        Row: {
          atendente: string | null
          created_at: string | null
          data: string | null
          fonte: string | null
          id: number | null
          id_bc: number | null
          mensagem: string | null
          nome: string | null
          telefone: string | null
        }
        Insert: {
          atendente?: string | null
          created_at?: string | null
          data?: string | null
          fonte?: string | null
          id?: number | null
          id_bc?: number | null
          mensagem?: string | null
          nome?: string | null
          telefone?: string | null
        }
        Update: {
          atendente?: string | null
          created_at?: string | null
          data?: string | null
          fonte?: string | null
          id?: number | null
          id_bc?: number | null
          mensagem?: string | null
          nome?: string | null
          telefone?: string | null
        }
        Relationships: []
      }
      "[CADASTRO] [TIME]": {
        Row: {
          apelido: string | null
          cpf: number | null
          email: string | null
          endereco: string | null
          grupo: string | null
          id: number
          id_clickup: number | null
          nome: string | null
          phone: number | null
          rg: number | null
        }
        Insert: {
          apelido?: string | null
          cpf?: number | null
          email?: string | null
          endereco?: string | null
          grupo?: string | null
          id?: number
          id_clickup?: number | null
          nome?: string | null
          phone?: number | null
          rg?: number | null
        }
        Update: {
          apelido?: string | null
          cpf?: number | null
          email?: string | null
          endereco?: string | null
          grupo?: string | null
          id?: number
          id_clickup?: number | null
          nome?: string | null
          phone?: number | null
          rg?: number | null
        }
        Relationships: []
      }
      "[DISPAROS] [WHATSAPP] [INSTANCIA = Disparos]": {
        Row: {
          created_at: string | null
          fonte: string | null
          hora_disparo: string | null
          id: number
          nome: string | null
          status: string | null
          telefone: number | null
          valido: string | null
        }
        Insert: {
          created_at?: string | null
          fonte?: string | null
          hora_disparo?: string | null
          id: number
          nome?: string | null
          status?: string | null
          telefone?: number | null
          valido?: string | null
        }
        Update: {
          created_at?: string | null
          fonte?: string | null
          hora_disparo?: string | null
          id?: number
          nome?: string | null
          status?: string | null
          telefone?: number | null
          valido?: string | null
        }
        Relationships: []
      }
      "001 | ATENDIMENTOS": {
        Row: {
          anuncio: string | null
          atendente: string | null
          campanha: string | null
          conjunto: string | null
          created_at: string
          fonte: string | null
          id: number
          mensagem: string | null
          nome: string | null
          telefone: string | null
          tipo: string | null
        }
        Insert: {
          anuncio?: string | null
          atendente?: string | null
          campanha?: string | null
          conjunto?: string | null
          created_at?: string
          fonte?: string | null
          id?: number
          mensagem?: string | null
          nome?: string | null
          telefone?: string | null
          tipo?: string | null
        }
        Update: {
          anuncio?: string | null
          atendente?: string | null
          campanha?: string | null
          conjunto?: string | null
          created_at?: string
          fonte?: string | null
          id?: number
          mensagem?: string | null
          nome?: string | null
          telefone?: string | null
          tipo?: string | null
        }
        Relationships: []
      }
      "009 | IA | ATENDIMENTOS": {
        Row: {
          ativo: boolean | null
          created_at: string
          data_trava: string | null
          id: number
          nome: string | null
          whastapp: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string
          data_trava?: string | null
          id?: number
          nome?: string | null
          whastapp?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string
          data_trava?: string | null
          id?: number
          nome?: string | null
          whastapp?: string | null
        }
        Relationships: []
      }
      "009 | IA | RELATORIO": {
        Row: {
          id: number
          nome: string | null
          valor: number | null
        }
        Insert: {
          id?: number
          nome?: string | null
          valor?: number | null
        }
        Update: {
          id?: number
          nome?: string | null
          valor?: number | null
        }
        Relationships: []
      }
      "BLACK | CLIENTES METRICAAS": {
        Row: {
          act_id: string | null
          "CNPJ OU CPF": string | null
          COD: number | null
          "E-MAIL": string | null
          ENDEREÇO: string | null
          id_cliente_asaas: string | null
          id_drive_black: string | null
          id_drive_cliente: string | null
          id_grupo_whats: string | null
          id_metricaas: string | null
          Id_Pasta_cliente_notion: string | null
          id_planilha_crm: string | null
          id_questionario: string | null
          link_grupo_whats: string | null
          "NOME RESPONSÁVEL": string | null
          "PF OU PJ?": string | null
          "RAZÃO SOCIAL": string | null
          status: string | null
          TELEFONE: number | null
          url_pasta_cliente_notion: string | null
        }
        Insert: {
          act_id?: string | null
          "CNPJ OU CPF"?: string | null
          COD?: number | null
          "E-MAIL"?: string | null
          ENDEREÇO?: string | null
          id_cliente_asaas?: string | null
          id_drive_black?: string | null
          id_drive_cliente?: string | null
          id_grupo_whats?: string | null
          id_metricaas?: string | null
          Id_Pasta_cliente_notion?: string | null
          id_planilha_crm?: string | null
          id_questionario?: string | null
          link_grupo_whats?: string | null
          "NOME RESPONSÁVEL"?: string | null
          "PF OU PJ?"?: string | null
          "RAZÃO SOCIAL"?: string | null
          status?: string | null
          TELEFONE?: number | null
          url_pasta_cliente_notion?: string | null
        }
        Update: {
          act_id?: string | null
          "CNPJ OU CPF"?: string | null
          COD?: number | null
          "E-MAIL"?: string | null
          ENDEREÇO?: string | null
          id_cliente_asaas?: string | null
          id_drive_black?: string | null
          id_drive_cliente?: string | null
          id_grupo_whats?: string | null
          id_metricaas?: string | null
          Id_Pasta_cliente_notion?: string | null
          id_planilha_crm?: string | null
          id_questionario?: string | null
          link_grupo_whats?: string | null
          "NOME RESPONSÁVEL"?: string | null
          "PF OU PJ?"?: string | null
          "RAZÃO SOCIAL"?: string | null
          status?: string | null
          TELEFONE?: number | null
          url_pasta_cliente_notion?: string | null
        }
        Relationships: []
      }
      "CADASTRO | CLIENTES": {
        Row: {
          act_id: string | null
          "CNPJ OU CPF": string | null
          COD: number
          "E-MAIL": string | null
          ENDEREÇO: string | null
          id_cliente_asaas: string | null
          id_clienteclickup: string | null
          id_drive_black: string | null
          id_drive_cliente: string | null
          id_grupo_IA: string | null
          id_grupo_whats: string | null
          id_metricas: number | null
          id_planilha_crm: string | null
          id_questionario: string | null
          id_swipe: string | null
          link_grupo_whats: string | null
          link_relatorio: string | null
          link_relatorio_meta: string | null
          "NOME RESPONSÁVEL": string | null
          numeros: string[] | null
          "RAZÃO SOCIAL": string | null
          status: Database["public"]["Enums"]["STATUS CLIENTE"]
          TELEFONE: string | null
        }
        Insert: {
          act_id?: string | null
          "CNPJ OU CPF"?: string | null
          COD: number
          "E-MAIL"?: string | null
          ENDEREÇO?: string | null
          id_cliente_asaas?: string | null
          id_clienteclickup?: string | null
          id_drive_black?: string | null
          id_drive_cliente?: string | null
          id_grupo_IA?: string | null
          id_grupo_whats?: string | null
          id_metricas?: number | null
          id_planilha_crm?: string | null
          id_questionario?: string | null
          id_swipe?: string | null
          link_grupo_whats?: string | null
          link_relatorio?: string | null
          link_relatorio_meta?: string | null
          "NOME RESPONSÁVEL"?: string | null
          numeros?: string[] | null
          "RAZÃO SOCIAL"?: string | null
          status?: Database["public"]["Enums"]["STATUS CLIENTE"]
          TELEFONE?: string | null
        }
        Update: {
          act_id?: string | null
          "CNPJ OU CPF"?: string | null
          COD?: number
          "E-MAIL"?: string | null
          ENDEREÇO?: string | null
          id_cliente_asaas?: string | null
          id_clienteclickup?: string | null
          id_drive_black?: string | null
          id_drive_cliente?: string | null
          id_grupo_IA?: string | null
          id_grupo_whats?: string | null
          id_metricas?: number | null
          id_planilha_crm?: string | null
          id_questionario?: string | null
          id_swipe?: string | null
          link_grupo_whats?: string | null
          link_relatorio?: string | null
          link_relatorio_meta?: string | null
          "NOME RESPONSÁVEL"?: string | null
          numeros?: string[] | null
          "RAZÃO SOCIAL"?: string | null
          status?: Database["public"]["Enums"]["STATUS CLIENTE"]
          TELEFONE?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "CADASTRO | CLIENTES_id_metricas_fkey"
            columns: ["id_metricas"]
            isOneToOne: false
            referencedRelation: "TRACKING | USERS"
            referencedColumns: ["id"]
          },
        ]
      }
      "CADASTRO | COMERCIAL": {
        Row: {
          anuncio: string | null
          campanha: string | null
          conjunto: string | null
          created_at: string
          id: number
          nome: string | null
          whatsapp: string | null
        }
        Insert: {
          anuncio?: string | null
          campanha?: string | null
          conjunto?: string | null
          created_at?: string
          id?: number
          nome?: string | null
          whatsapp?: string | null
        }
        Update: {
          anuncio?: string | null
          campanha?: string | null
          conjunto?: string | null
          created_at?: string
          id?: number
          nome?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      "CADASTRO | GLOBAL": {
        Row: {
          id: number
          nome: string | null
          valor: string | null
        }
        Insert: {
          id?: number
          nome?: string | null
          valor?: string | null
        }
        Update: {
          id?: number
          nome?: string | null
          valor?: string | null
        }
        Relationships: []
      }
      "CADASTRO | VAGAS": {
        Row: {
          created_at: string | null
          curriculo: string | null
          id: number
          id_clickup: string | null
          nome: string | null
          whatsapp: string | null
        }
        Insert: {
          created_at?: string | null
          curriculo?: string | null
          id?: number
          id_clickup?: string | null
          nome?: string | null
          whatsapp?: string | null
        }
        Update: {
          created_at?: string | null
          curriculo?: string | null
          id?: number
          id_clickup?: string | null
          nome?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      "GABAS | CLIENTES": {
        Row: {
          act_id: string | null
          id: number
          id_grupo_whats: string | null
          nome_grupo_whats: string | null
          numeros: string[] | null
        }
        Insert: {
          act_id?: string | null
          id?: number
          id_grupo_whats?: string | null
          nome_grupo_whats?: string | null
          numeros?: string[] | null
        }
        Update: {
          act_id?: string | null
          id?: number
          id_grupo_whats?: string | null
          nome_grupo_whats?: string | null
          numeros?: string[] | null
        }
        Relationships: []
      }
      "IA | ALERTAS": {
        Row: {
          created_at: string
          id: number
          resumo: string | null
          trigger: string | null
          usuario: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          resumo?: string | null
          trigger?: string | null
          usuario?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          resumo?: string | null
          trigger?: string | null
          usuario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "IA | ALERTAS_usuario_fkey"
            columns: ["usuario"]
            isOneToOne: false
            referencedRelation: "IA | USUARIOS"
            referencedColumns: ["id"]
          },
        ]
      }
      "IA | NUMEROS": {
        Row: {
          id: number
          numero: string | null
          user_id: number | null
        }
        Insert: {
          id?: number
          numero?: string | null
          user_id?: number | null
        }
        Update: {
          id?: number
          numero?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "IA | NUMEROS_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "CADASTRO | CLIENTES"
            referencedColumns: ["COD"]
          },
        ]
      }
      "IA | RELATORIO": {
        Row: {
          audios: number | null
          Data: string | null
          id: number
          interação: number | null
          mensagens: number | null
          nome: string | null
          pausados: number | null
          tokens: number | null
          user_id: number | null
        }
        Insert: {
          audios?: number | null
          Data?: string | null
          id?: number
          interação?: number | null
          mensagens?: number | null
          nome?: string | null
          pausados?: number | null
          tokens?: number | null
          user_id?: number | null
        }
        Update: {
          audios?: number | null
          Data?: string | null
          id?: number
          interação?: number | null
          mensagens?: number | null
          nome?: string | null
          pausados?: number | null
          tokens?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "IA | RELATORIO_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "CADASTRO | CLIENTES"
            referencedColumns: ["COD"]
          },
        ]
      }
      "IA | TESTES": {
        Row: {
          id: number
          nome: string | null
          numeros: string[] | null
          senha: string | null
          workflow_id: string | null
        }
        Insert: {
          id?: number
          nome?: string | null
          numeros?: string[] | null
          senha?: string | null
          workflow_id?: string | null
        }
        Update: {
          id?: number
          nome?: string | null
          numeros?: string[] | null
          senha?: string | null
          workflow_id?: string | null
        }
        Relationships: []
      }
      "IA | USUARIOS": {
        Row: {
          aviso_agendamento_1: string | null
          aviso_agendamento_2: string | null
          aviso_agendamento_3: string | null
          aviso_agendamento_4: string | null
          data_agendamento: string | null
          data_pausa: string | null
          email: string | null
          follow_up_1: string | null
          follow_up_2: string | null
          follow_up_3: string | null
          follow_up_4: string | null
          follow_up_5: string | null
          follow_up_6: string | null
          follow_up_7: string | null
          horario_agendamento: string | null
          id: number
          "id.calendar": string | null
          "id.crm": string | null
          "id.crm.lead": string | null
          link_agendamento: string | null
          nome: string | null
          pausado: boolean | null
          telefone: string | null
          thread_id: string | null
          tokens: number | null
          trava_follow_up: boolean | null
          user_id: number | null
        }
        Insert: {
          aviso_agendamento_1?: string | null
          aviso_agendamento_2?: string | null
          aviso_agendamento_3?: string | null
          aviso_agendamento_4?: string | null
          data_agendamento?: string | null
          data_pausa?: string | null
          email?: string | null
          follow_up_1?: string | null
          follow_up_2?: string | null
          follow_up_3?: string | null
          follow_up_4?: string | null
          follow_up_5?: string | null
          follow_up_6?: string | null
          follow_up_7?: string | null
          horario_agendamento?: string | null
          id?: number
          "id.calendar"?: string | null
          "id.crm"?: string | null
          "id.crm.lead"?: string | null
          link_agendamento?: string | null
          nome?: string | null
          pausado?: boolean | null
          telefone?: string | null
          thread_id?: string | null
          tokens?: number | null
          trava_follow_up?: boolean | null
          user_id?: number | null
        }
        Update: {
          aviso_agendamento_1?: string | null
          aviso_agendamento_2?: string | null
          aviso_agendamento_3?: string | null
          aviso_agendamento_4?: string | null
          data_agendamento?: string | null
          data_pausa?: string | null
          email?: string | null
          follow_up_1?: string | null
          follow_up_2?: string | null
          follow_up_3?: string | null
          follow_up_4?: string | null
          follow_up_5?: string | null
          follow_up_6?: string | null
          follow_up_7?: string | null
          horario_agendamento?: string | null
          id?: number
          "id.calendar"?: string | null
          "id.crm"?: string | null
          "id.crm.lead"?: string | null
          link_agendamento?: string | null
          nome?: string | null
          pausado?: boolean | null
          telefone?: string | null
          thread_id?: string | null
          tokens?: number | null
          trava_follow_up?: boolean | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "IA | USUARIOS_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "CADASTRO | CLIENTES"
            referencedColumns: ["COD"]
          },
        ]
      }
      "LOW | KIRVANO": {
        Row: {
          cookies_fbclid: string | null
          cookies_fbp: string | null
          created_at: string
          id: number
          nome: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          whatsapp: string | null
        }
        Insert: {
          cookies_fbclid?: string | null
          cookies_fbp?: string | null
          created_at?: string
          id?: number
          nome?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          whatsapp?: string | null
        }
        Update: {
          cookies_fbclid?: string | null
          cookies_fbp?: string | null
          created_at?: string
          id?: number
          nome?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      "N8N | INSTAGRAM REPOST": {
        Row: {
          created_at: string
          id: number
          legenda: string | null
          nome: string | null
          status: string | null
          user: string | null
          video: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          legenda?: string | null
          nome?: string | null
          status?: string | null
          user?: string | null
          video?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          legenda?: string | null
          nome?: string | null
          status?: string | null
          user?: string | null
          video?: string | null
        }
        Relationships: []
      }
      n8n_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      teste: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      "TOP | USUARIOS": {
        Row: {
          created_at: string
          data: string | null
          data_pausa: string | null
          follow_up_1: string | null
          follow_up_2: string | null
          follow_up_3: string | null
          follow_up_4: string | null
          follow_up_5: string | null
          follow_up_6: string | null
          follow_up_7: string | null
          hora: string | null
          id: number
          pausado: boolean | null
          respondeu: boolean | null
          telefone: string | null
          thread_id: string | null
        }
        Insert: {
          created_at?: string
          data?: string | null
          data_pausa?: string | null
          follow_up_1?: string | null
          follow_up_2?: string | null
          follow_up_3?: string | null
          follow_up_4?: string | null
          follow_up_5?: string | null
          follow_up_6?: string | null
          follow_up_7?: string | null
          hora?: string | null
          id?: number
          pausado?: boolean | null
          respondeu?: boolean | null
          telefone?: string | null
          thread_id?: string | null
        }
        Update: {
          created_at?: string
          data?: string | null
          data_pausa?: string | null
          follow_up_1?: string | null
          follow_up_2?: string | null
          follow_up_3?: string | null
          follow_up_4?: string | null
          follow_up_5?: string | null
          follow_up_6?: string | null
          follow_up_7?: string | null
          hora?: string | null
          id?: number
          pausado?: boolean | null
          respondeu?: boolean | null
          telefone?: string | null
          thread_id?: string | null
        }
        Relationships: []
      }
      "TRACKING | CARDS": {
        Row: {
          anuncio: string | null
          browser: Json | null
          campanha: string | null
          conjunto: string | null
          created_at: string
          ctwaClid: string | null
          data_criacao: string | null
          dispositivo: string | null
          fbc: string | null
          fbp: string | null
          fonte: string | null
          gclid: string | null
          id: number
          location: Json | null
          mensagem_padrao: string | null
          nome: string | null
          numero_de_telefone: string | null
          palavra_chave: string | null
          source_id_meta: string | null
          status: string | null
          user_id: number | null
        }
        Insert: {
          anuncio?: string | null
          browser?: Json | null
          campanha?: string | null
          conjunto?: string | null
          created_at?: string
          ctwaClid?: string | null
          data_criacao?: string | null
          dispositivo?: string | null
          fbc?: string | null
          fbp?: string | null
          fonte?: string | null
          gclid?: string | null
          id?: number
          location?: Json | null
          mensagem_padrao?: string | null
          nome?: string | null
          numero_de_telefone?: string | null
          palavra_chave?: string | null
          source_id_meta?: string | null
          status?: string | null
          user_id?: number | null
        }
        Update: {
          anuncio?: string | null
          browser?: Json | null
          campanha?: string | null
          conjunto?: string | null
          created_at?: string
          ctwaClid?: string | null
          data_criacao?: string | null
          dispositivo?: string | null
          fbc?: string | null
          fbp?: string | null
          fonte?: string | null
          gclid?: string | null
          id?: number
          location?: Json | null
          mensagem_padrao?: string | null
          nome?: string | null
          numero_de_telefone?: string | null
          palavra_chave?: string | null
          source_id_meta?: string | null
          status?: string | null
          user_id?: number | null
        }
        Relationships: []
      }
      "TRACKING | LINK": {
        Row: {
          id: number
          mensagem: string | null
          nome: string | null
          user_id: number
        }
        Insert: {
          id?: number
          mensagem?: string | null
          nome?: string | null
          user_id: number
        }
        Update: {
          id?: number
          mensagem?: string | null
          nome?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "TRACKING | LINK_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "TRACKING | USERS"
            referencedColumns: ["id"]
          },
        ]
      }
      "TRACKING | USERS": {
        Row: {
          act_id: string | null
          aviso_conexao: boolean | null
          email: string | null
          evolution_nome: string | null
          evolution_telefone: string | null
          grupo_aviso: string | null
          id: number
          instance_id: string | null
          instancia: string | null
          name: string | null
          strat: boolean | null
          token_graphAPi_Meta: string | null
          webhook_response: string | null
        }
        Insert: {
          act_id?: string | null
          aviso_conexao?: boolean | null
          email?: string | null
          evolution_nome?: string | null
          evolution_telefone?: string | null
          grupo_aviso?: string | null
          id?: number
          instance_id?: string | null
          instancia?: string | null
          name?: string | null
          strat?: boolean | null
          token_graphAPi_Meta?: string | null
          webhook_response?: string | null
        }
        Update: {
          act_id?: string | null
          aviso_conexao?: boolean | null
          email?: string | null
          evolution_nome?: string | null
          evolution_telefone?: string | null
          grupo_aviso?: string | null
          id?: number
          instance_id?: string | null
          instancia?: string | null
          name?: string | null
          strat?: boolean | null
          token_graphAPi_Meta?: string | null
          webhook_response?: string | null
        }
        Relationships: []
      }
      "TRACKING | WEB": {
        Row: {
          browser: Json | null
          created_at: string | null
          data: string | null
          fbc: string | null
          fbp: string | null
          gclid: string | null
          hora: string | null
          id: number
          link_id: number | null
          location: Json | null
          url: string | null
          usado: boolean | null
          user_id: number | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          browser?: Json | null
          created_at?: string | null
          data?: string | null
          fbc?: string | null
          fbp?: string | null
          gclid?: string | null
          hora?: string | null
          id?: number
          link_id?: number | null
          location?: Json | null
          url?: string | null
          usado?: boolean | null
          user_id?: number | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          browser?: Json | null
          created_at?: string | null
          data?: string | null
          fbc?: string | null
          fbp?: string | null
          gclid?: string | null
          hora?: string | null
          id?: number
          link_id?: number | null
          location?: Json | null
          url?: string | null
          usado?: boolean | null
          user_id?: number | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      "WHATSAPP | GRUPOS": {
        Row: {
          cliente: boolean | null
          id: number
          nome: string | null
          phone: string | null
        }
        Insert: {
          cliente?: boolean | null
          id?: number
          nome?: string | null
          phone?: string | null
        }
        Update: {
          cliente?: boolean | null
          id?: number
          nome?: string | null
          phone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      match_documents: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_teste: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      "STATUS CLIENTE":
        | "ONBOARDING"
        | "KICKOFF"
        | "ATIVO"
        | "STANDBY"
        | "CANCELADO"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      "STATUS CLIENTE": [
        "ONBOARDING",
        "KICKOFF",
        "ATIVO",
        "STANDBY",
        "CANCELADO",
      ],
    },
  },
} as const
