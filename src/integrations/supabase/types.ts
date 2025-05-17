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
      annotations: {
        Row: {
          ai_generated: boolean | null
          annotation_text: string | null
          article_number: string
          created_at: string | null
          highlight_color: string | null
          id: string
          law_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ai_generated?: boolean | null
          annotation_text?: string | null
          article_number: string
          created_at?: string | null
          highlight_color?: string | null
          id?: string
          law_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ai_generated?: boolean | null
          annotation_text?: string | null
          article_number?: string
          created_at?: string | null
          highlight_color?: string | null
          id?: string
          law_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      biblioteca_anotacoes: {
        Row: {
          cor: string | null
          created_at: string | null
          id: string
          livro_id: string
          pagina: number
          posicao: Json | null
          texto: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cor?: string | null
          created_at?: string | null
          id?: string
          livro_id: string
          pagina: number
          posicao?: Json | null
          texto: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cor?: string | null
          created_at?: string | null
          id?: string
          livro_id?: string
          pagina?: number
          posicao?: Json | null
          texto?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "biblioteca_anotacoes_livro_id_fkey"
            columns: ["livro_id"]
            isOneToOne: false
            referencedRelation: "biblioteca_juridica10"
            referencedColumns: ["id"]
          },
        ]
      }
      biblioteca_html: {
        Row: {
          autor: string | null
          categoria: string
          conteudo_html: string
          created_at: string | null
          data_publicacao: string | null
          descricao: string | null
          id: string
          tags: string[] | null
          thumbnail_url: string | null
          titulo: string
          updated_at: string | null
        }
        Insert: {
          autor?: string | null
          categoria: string
          conteudo_html: string
          created_at?: string | null
          data_publicacao?: string | null
          descricao?: string | null
          id?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          titulo: string
          updated_at?: string | null
        }
        Update: {
          autor?: string | null
          categoria?: string
          conteudo_html?: string
          created_at?: string | null
          data_publicacao?: string | null
          descricao?: string | null
          id?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      biblioteca_html_anotacoes: {
        Row: {
          cor: string | null
          created_at: string | null
          documento_id: string
          id: string
          secao_id: string
          seletor_css: string | null
          texto: string
          texto_selecionado: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cor?: string | null
          created_at?: string | null
          documento_id: string
          id?: string
          secao_id: string
          seletor_css?: string | null
          texto: string
          texto_selecionado?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cor?: string | null
          created_at?: string | null
          documento_id?: string
          id?: string
          secao_id?: string
          seletor_css?: string | null
          texto?: string
          texto_selecionado?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "biblioteca_html_anotacoes_documento_id_fkey"
            columns: ["documento_id"]
            isOneToOne: false
            referencedRelation: "biblioteca_html"
            referencedColumns: ["id"]
          },
        ]
      }
      biblioteca_html_marcadores: {
        Row: {
          cor: string | null
          created_at: string | null
          documento_id: string
          id: string
          posicao: string | null
          secao_id: string
          titulo: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cor?: string | null
          created_at?: string | null
          documento_id: string
          id?: string
          posicao?: string | null
          secao_id: string
          titulo: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cor?: string | null
          created_at?: string | null
          documento_id?: string
          id?: string
          posicao?: string | null
          secao_id?: string
          titulo?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "biblioteca_html_marcadores_documento_id_fkey"
            columns: ["documento_id"]
            isOneToOne: false
            referencedRelation: "biblioteca_html"
            referencedColumns: ["id"]
          },
        ]
      }
      biblioteca_html_progresso: {
        Row: {
          created_at: string | null
          documento_id: string
          favorito: boolean | null
          id: string
          progresso_percentual: number | null
          secao_atual: string | null
          ultima_leitura: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          documento_id: string
          favorito?: boolean | null
          id?: string
          progresso_percentual?: number | null
          secao_atual?: string | null
          ultima_leitura?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          documento_id?: string
          favorito?: boolean | null
          id?: string
          progresso_percentual?: number | null
          secao_atual?: string | null
          ultima_leitura?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "biblioteca_html_progresso_documento_id_fkey"
            columns: ["documento_id"]
            isOneToOne: false
            referencedRelation: "biblioteca_html"
            referencedColumns: ["id"]
          },
        ]
      }
      biblioteca_juridica: {
        Row: {
          area: string | null
          created_at: string
          download: string | null
          id: number
          imagem: string | null
          link: string | null
          livro: string | null
          sobre: string | null
        }
        Insert: {
          area?: string | null
          created_at?: string
          download?: string | null
          id?: number
          imagem?: string | null
          link?: string | null
          livro?: string | null
          sobre?: string | null
        }
        Update: {
          area?: string | null
          created_at?: string
          download?: string | null
          id?: number
          imagem?: string | null
          link?: string | null
          livro?: string | null
          sobre?: string | null
        }
        Relationships: []
      }
      biblioteca_juridica_improved: {
        Row: {
          ano_publicacao: number | null
          area: string
          autor: string | null
          capa_url: string | null
          categoria: string | null
          created_at: string | null
          edicao: string | null
          editora: string | null
          id: string
          link_download: string | null
          link_leitura: string | null
          popularidade: number | null
          sinopse: string | null
          tags: string[] | null
          titulo: string
          updated_at: string | null
        }
        Insert: {
          ano_publicacao?: number | null
          area: string
          autor?: string | null
          capa_url?: string | null
          categoria?: string | null
          created_at?: string | null
          edicao?: string | null
          editora?: string | null
          id?: string
          link_download?: string | null
          link_leitura?: string | null
          popularidade?: number | null
          sinopse?: string | null
          tags?: string[] | null
          titulo: string
          updated_at?: string | null
        }
        Update: {
          ano_publicacao?: number | null
          area?: string
          autor?: string | null
          capa_url?: string | null
          categoria?: string | null
          created_at?: string | null
          edicao?: string | null
          editora?: string | null
          id?: string
          link_download?: string | null
          link_leitura?: string | null
          popularidade?: number | null
          sinopse?: string | null
          tags?: string[] | null
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      biblioteca_juridica10: {
        Row: {
          autor: string | null
          capa_url: string | null
          categoria: string
          created_at: string | null
          data_publicacao: string | null
          descricao: string | null
          id: string
          pdf_url: string
          subcategoria: string | null
          titulo: string
          total_paginas: number | null
          updated_at: string | null
        }
        Insert: {
          autor?: string | null
          capa_url?: string | null
          categoria: string
          created_at?: string | null
          data_publicacao?: string | null
          descricao?: string | null
          id?: string
          pdf_url: string
          subcategoria?: string | null
          titulo: string
          total_paginas?: number | null
          updated_at?: string | null
        }
        Update: {
          autor?: string | null
          capa_url?: string | null
          categoria?: string
          created_at?: string | null
          data_publicacao?: string | null
          descricao?: string | null
          id?: string
          pdf_url?: string
          subcategoria?: string | null
          titulo?: string
          total_paginas?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      biblioteca_leitura_progresso: {
        Row: {
          created_at: string | null
          favorito: boolean | null
          id: string
          livro_id: string
          pagina_atual: number | null
          ultima_leitura: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          favorito?: boolean | null
          id?: string
          livro_id: string
          pagina_atual?: number | null
          ultima_leitura?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          favorito?: boolean | null
          id?: string
          livro_id?: string
          pagina_atual?: number | null
          ultima_leitura?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "biblioteca_leitura_progresso_livro_id_fkey"
            columns: ["livro_id"]
            isOneToOne: false
            referencedRelation: "biblioteca_juridica10"
            referencedColumns: ["id"]
          },
        ]
      }
      biblioteca_marcadores: {
        Row: {
          cor: string | null
          created_at: string | null
          id: string
          livro_id: string
          pagina: number
          titulo: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cor?: string | null
          created_at?: string | null
          id?: string
          livro_id: string
          pagina: number
          titulo?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cor?: string | null
          created_at?: string | null
          id?: string
          livro_id?: string
          pagina?: number
          titulo?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "biblioteca_marcadores_livro_id_fkey"
            columns: ["livro_id"]
            isOneToOne: false
            referencedRelation: "biblioteca_juridica10"
            referencedColumns: ["id"]
          },
        ]
      }
      bibliotecatop: {
        Row: {
          capa_url: string | null
          categoria: string | null
          descricao: string | null
          id: number
          pdf_url: string | null
          titulo: string | null
          total_paginas: string | null
        }
        Insert: {
          capa_url?: string | null
          categoria?: string | null
          descricao?: string | null
          id?: number
          pdf_url?: string | null
          titulo?: string | null
          total_paginas?: string | null
        }
        Update: {
          capa_url?: string | null
          categoria?: string | null
          descricao?: string | null
          id?: number
          pdf_url?: string | null
          titulo?: string | null
          total_paginas?: string | null
        }
        Relationships: []
      }
      categorias: {
        Row: {
          created_at: string | null
          descricao: string | null
          id: string
          nome: string
          tipo: string
        }
        Insert: {
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome: string
          tipo: string
        }
        Update: {
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          tipo?: string
        }
        Relationships: []
      }
      Código_Civil: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      Código_de_Defesa_do_Consumidor: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      Código_de_Processo_Civil: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      Código_de_Processo_Penal: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      Código_de_Trânsito_Brasileiro: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      Código_Eleitoral: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      Código_Penal: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      Código_Tributário_Nacional: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      Constituicao_Federal: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      cronograma: {
        Row: {
          concluido: boolean | null
          cor: string | null
          created_at: string | null
          data_fim: string
          data_inicio: string
          descricao: string | null
          id: string
          titulo: string
          user_id: string | null
        }
        Insert: {
          concluido?: boolean | null
          cor?: string | null
          created_at?: string | null
          data_fim: string
          data_inicio: string
          descricao?: string | null
          id?: string
          titulo: string
          user_id?: string | null
        }
        Update: {
          concluido?: boolean | null
          cor?: string | null
          created_at?: string | null
          data_fim?: string
          data_inicio?: string
          descricao?: string | null
          id?: string
          titulo?: string
          user_id?: string | null
        }
        Relationships: []
      }
      curso_feedback: {
        Row: {
          avaliacao: number
          comentario: string | null
          created_at: string | null
          curso_id: number
          id: string
          user_id: string
        }
        Insert: {
          avaliacao: number
          comentario?: string | null
          created_at?: string | null
          curso_id: number
          id?: string
          user_id: string
        }
        Update: {
          avaliacao?: number
          comentario?: string | null
          created_at?: string | null
          curso_id?: number
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      curso_progress: {
        Row: {
          concluido: boolean
          created_at: string | null
          curso_id: number
          id: string
          progresso: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          concluido?: boolean
          created_at?: string | null
          curso_id: number
          id?: string
          progresso?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          concluido?: boolean
          created_at?: string | null
          curso_id?: number
          id?: string
          progresso?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      cursos_narrados: {
        Row: {
          area: string | null
          capa: string | null
          dificuldade: string | null
          download: string | null
          id: number
          link: string | null
          materia: string | null
          sequencia: string | null
          sobre: string | null
        }
        Insert: {
          area?: string | null
          capa?: string | null
          dificuldade?: string | null
          download?: string | null
          id?: number
          link?: string | null
          materia?: string | null
          sequencia?: string | null
          sobre?: string | null
        }
        Update: {
          area?: string | null
          capa?: string | null
          dificuldade?: string | null
          download?: string | null
          id?: number
          link?: string | null
          materia?: string | null
          sequencia?: string | null
          sobre?: string | null
        }
        Relationships: []
      }
      dicionario_juridico: {
        Row: {
          area_direito: string | null
          created_at: string | null
          definicao: string
          exemplo_uso: string | null
          id: string
          termo: string
        }
        Insert: {
          area_direito?: string | null
          created_at?: string | null
          definicao: string
          exemplo_uso?: string | null
          id?: string
          termo: string
        }
        Update: {
          area_direito?: string | null
          created_at?: string | null
          definicao?: string
          exemplo_uso?: string | null
          id?: string
          termo?: string
        }
        Relationships: []
      }
      dicionario_termo_views: {
        Row: {
          id: string
          termo_id: string
          user_id: string | null
          viewed_at: string | null
        }
        Insert: {
          id?: string
          termo_id: string
          user_id?: string | null
          viewed_at?: string | null
        }
        Update: {
          id?: string
          termo_id?: string
          user_id?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dicionario_termo_views_termo_id_fkey"
            columns: ["termo_id"]
            isOneToOne: false
            referencedRelation: "dicionario_juridico"
            referencedColumns: ["id"]
          },
        ]
      }
      disciplina_materiais: {
        Row: {
          autor: string | null
          created_at: string | null
          descricao: string | null
          disciplina_id: string
          id: string
          thumbnail_url: string | null
          tipo: string
          titulo: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          autor?: string | null
          created_at?: string | null
          descricao?: string | null
          disciplina_id: string
          id?: string
          thumbnail_url?: string | null
          tipo: string
          titulo: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          autor?: string | null
          created_at?: string | null
          descricao?: string | null
          disciplina_id?: string
          id?: string
          thumbnail_url?: string | null
          tipo?: string
          titulo?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "disciplina_materiais_disciplina_id_fkey"
            columns: ["disciplina_id"]
            isOneToOne: false
            referencedRelation: "disciplinas"
            referencedColumns: ["id"]
          },
        ]
      }
      disciplina_prerequisitos: {
        Row: {
          created_at: string | null
          disciplina_id: string
          id: string
          prerequisito_id: string
        }
        Insert: {
          created_at?: string | null
          disciplina_id: string
          id?: string
          prerequisito_id: string
        }
        Update: {
          created_at?: string | null
          disciplina_id?: string
          id?: string
          prerequisito_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "disciplina_prerequisitos_disciplina_id_fkey"
            columns: ["disciplina_id"]
            isOneToOne: false
            referencedRelation: "disciplinas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disciplina_prerequisitos_prerequisito_id_fkey"
            columns: ["prerequisito_id"]
            isOneToOne: false
            referencedRelation: "disciplinas"
            referencedColumns: ["id"]
          },
        ]
      }
      disciplinas: {
        Row: {
          area: string
          carga_horaria: number | null
          codigo: string | null
          created_at: string | null
          descricao: string | null
          ementa: string | null
          grade_id: string
          id: string
          nome: string
          periodo: number
          updated_at: string | null
        }
        Insert: {
          area: string
          carga_horaria?: number | null
          codigo?: string | null
          created_at?: string | null
          descricao?: string | null
          ementa?: string | null
          grade_id: string
          id?: string
          nome: string
          periodo: number
          updated_at?: string | null
        }
        Update: {
          area?: string
          carga_horaria?: number | null
          codigo?: string | null
          created_at?: string | null
          descricao?: string | null
          ementa?: string | null
          grade_id?: string
          id?: string
          nome?: string
          periodo?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "disciplinas_grade_id_fkey"
            columns: ["grade_id"]
            isOneToOne: false
            referencedRelation: "grade_curricular"
            referencedColumns: ["id"]
          },
        ]
      }
      estatisticas: {
        Row: {
          artigos_lidos: number | null
          aulas_assistidas: number | null
          created_at: string | null
          flashcards_feitos: number | null
          id: string
          resumos_criados: number | null
          user_id: string
        }
        Insert: {
          artigos_lidos?: number | null
          aulas_assistidas?: number | null
          created_at?: string | null
          flashcards_feitos?: number | null
          id?: string
          resumos_criados?: number | null
          user_id: string
        }
        Update: {
          artigos_lidos?: number | null
          aulas_assistidas?: number | null
          created_at?: string | null
          flashcards_feitos?: number | null
          id?: string
          resumos_criados?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "estatisticas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      Estatuto_da_Advocacia_e_da_OAB: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      Estatuto_da_Cidade: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      Estatuto_da_Criança_e_do_Adolescente: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      Estatuto_da_Igualdade_Racial: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      Estatuto_da_Pessoa_com_Deficiência: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      Estatuto_da_Terra: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      Estatuto_do_Desarmamento: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      Estatuto_do_Idoso: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      Estatuto_do_Torcedor: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      Estatuto_dos_Servidores_Públicos_Civis_da_União: {
        Row: {
          artigo: string | null
          exemplo: string | null
          formal: string | null
          id: number
          numero: string | null
          tecnica: string | null
        }
        Insert: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id: number
          numero?: string | null
          tecnica?: string | null
        }
        Update: {
          artigo?: string | null
          exemplo?: string | null
          formal?: string | null
          id?: number
          numero?: string | null
          tecnica?: string | null
        }
        Relationships: []
      }
      estudo_repetido: {
        Row: {
          consecutive_correct: number
          content_id: string
          content_type: string
          created_at: string
          id: string
          interval_days: number
          last_reviewed_at: string | null
          next_review_date: string
          user_id: string
        }
        Insert: {
          consecutive_correct?: number
          content_id: string
          content_type: string
          created_at?: string
          id?: string
          interval_days?: number
          last_reviewed_at?: string | null
          next_review_date: string
          user_id: string
        }
        Update: {
          consecutive_correct?: number
          content_id?: string
          content_type?: string
          created_at?: string
          id?: string
          interval_days?: number
          last_reviewed_at?: string | null
          next_review_date?: string
          user_id?: string
        }
        Relationships: []
      }
      faculdades: {
        Row: {
          created_at: string | null
          descricao: string | null
          id: string
          logo_url: string | null
          nome: string
          sigla: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          created_at?: string | null
          descricao?: string | null
          id?: string
          logo_url?: string | null
          nome: string
          sigla: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string | null
          descricao?: string | null
          id?: string
          logo_url?: string | null
          nome?: string
          sigla?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      flash_cards: {
        Row: {
          area: string | null
          created_at: string
          id: number
          pergunta: string | null
          resposta: string | null
          tema: string | null
        }
        Insert: {
          area?: string | null
          created_at?: string
          id?: number
          pergunta?: string | null
          resposta?: string | null
          tema?: string | null
        }
        Update: {
          area?: string | null
          created_at?: string
          id?: number
          pergunta?: string | null
          resposta?: string | null
          tema?: string | null
        }
        Relationships: []
      }
      flash_cards_improved: {
        Row: {
          area: string
          created_at: string | null
          dificuldade: string | null
          explicacao: string | null
          id: string
          imagem_url: string | null
          pergunta: string
          resposta: string
          status: string | null
          tags: string[] | null
          tema: string
          updated_at: string | null
        }
        Insert: {
          area: string
          created_at?: string | null
          dificuldade?: string | null
          explicacao?: string | null
          id?: string
          imagem_url?: string | null
          pergunta: string
          resposta: string
          status?: string | null
          tags?: string[] | null
          tema: string
          updated_at?: string | null
        }
        Update: {
          area?: string
          created_at?: string | null
          dificuldade?: string | null
          explicacao?: string | null
          id?: string
          imagem_url?: string | null
          pergunta?: string
          resposta?: string
          status?: string | null
          tags?: string[] | null
          tema?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      folder_links: {
        Row: {
          created_at: string | null
          document_links: string[] | null
          id: number
          image_links: string[] | null
          video_links: string[] | null
        }
        Insert: {
          created_at?: string | null
          document_links?: string[] | null
          id?: never
          image_links?: string[] | null
          video_links?: string[] | null
        }
        Update: {
          created_at?: string | null
          document_links?: string[] | null
          id?: never
          image_links?: string[] | null
          video_links?: string[] | null
        }
        Relationships: []
      }
      gamificacao: {
        Row: {
          conquistas: string[] | null
          created_at: string | null
          id: string
          nivel: number | null
          pontos: number | null
          streak_dias: number | null
          ultima_atividade: string | null
          user_id: string | null
        }
        Insert: {
          conquistas?: string[] | null
          created_at?: string | null
          id?: string
          nivel?: number | null
          pontos?: number | null
          streak_dias?: number | null
          ultima_atividade?: string | null
          user_id?: string | null
        }
        Update: {
          conquistas?: string[] | null
          created_at?: string | null
          id?: string
          nivel?: number | null
          pontos?: number | null
          streak_dias?: number | null
          ultima_atividade?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      grade_curricular: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          descricao: string | null
          duracao_semestres: number
          faculdade_id: string
          id: string
          nome: string
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          descricao?: string | null
          duracao_semestres: number
          faculdade_id: string
          id?: string
          nome: string
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          descricao?: string | null
          duracao_semestres?: number
          faculdade_id?: string
          id?: string
          nome?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grade_curricular_faculdade_id_fkey"
            columns: ["faculdade_id"]
            isOneToOne: false
            referencedRelation: "faculdades"
            referencedColumns: ["id"]
          },
        ]
      }
      jogos_alfabeto: {
        Row: {
          area_direito: string
          created_at: string | null
          descricao: string
          id: string
          letras: Json
          nivel_dificuldade: string | null
          palavras: Json
          titulo: string
          updated_at: string | null
        }
        Insert: {
          area_direito: string
          created_at?: string | null
          descricao: string
          id?: string
          letras: Json
          nivel_dificuldade?: string | null
          palavras: Json
          titulo: string
          updated_at?: string | null
        }
        Update: {
          area_direito?: string
          created_at?: string | null
          descricao?: string
          id?: string
          letras?: Json
          nivel_dificuldade?: string | null
          palavras?: Json
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      jogos_caca_palavras: {
        Row: {
          area_direito: string
          created_at: string | null
          descricao: string
          dicas: Json | null
          grade: Json
          id: string
          nivel_dificuldade: string | null
          palavras: Json
          titulo: string
          updated_at: string | null
        }
        Insert: {
          area_direito: string
          created_at?: string | null
          descricao: string
          dicas?: Json | null
          grade: Json
          id?: string
          nivel_dificuldade?: string | null
          palavras: Json
          titulo: string
          updated_at?: string | null
        }
        Update: {
          area_direito?: string
          created_at?: string | null
          descricao?: string
          dicas?: Json | null
          grade?: Json
          id?: string
          nivel_dificuldade?: string | null
          palavras?: Json
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      jogos_cartas_artigos: {
        Row: {
          artigo: string
          baralho_id: string
          created_at: string | null
          id: string
          lei: string
          pontos: number
          texto: string
        }
        Insert: {
          artigo: string
          baralho_id: string
          created_at?: string | null
          id?: string
          lei: string
          pontos?: number
          texto: string
        }
        Update: {
          artigo?: string
          baralho_id?: string
          created_at?: string | null
          id?: string
          lei?: string
          pontos?: number
          texto?: string
        }
        Relationships: [
          {
            foreignKeyName: "jogos_cartas_artigos_baralho_id_fkey"
            columns: ["baralho_id"]
            isOneToOne: false
            referencedRelation: "jogos_cartas_baralhos"
            referencedColumns: ["id"]
          },
        ]
      }
      jogos_cartas_baralhos: {
        Row: {
          area_direito: string
          created_at: string | null
          descricao: string
          id: string
          nivel_dificuldade: string | null
          nome: string
        }
        Insert: {
          area_direito: string
          created_at?: string | null
          descricao: string
          id?: string
          nivel_dificuldade?: string | null
          nome: string
        }
        Update: {
          area_direito?: string
          created_at?: string | null
          descricao?: string
          id?: string
          nivel_dificuldade?: string | null
          nome?: string
        }
        Relationships: []
      }
      jogos_cartas_partidas: {
        Row: {
          baralho_id: string
          completada: boolean
          created_at: string | null
          id: string
          jogo_id: string
          pontuacao: number
          user_id: string
        }
        Insert: {
          baralho_id: string
          completada?: boolean
          created_at?: string | null
          id?: string
          jogo_id: string
          pontuacao?: number
          user_id: string
        }
        Update: {
          baralho_id?: string
          completada?: boolean
          created_at?: string | null
          id?: string
          jogo_id?: string
          pontuacao?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jogos_cartas_partidas_baralho_id_fkey"
            columns: ["baralho_id"]
            isOneToOne: false
            referencedRelation: "jogos_cartas_baralhos"
            referencedColumns: ["id"]
          },
        ]
      }
      jogos_categorias: {
        Row: {
          ativo: boolean | null
          background_variant: string | null
          created_at: string
          descricao: string | null
          icone: string | null
          id: string
          nivel_dificuldade: string | null
          nome: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean | null
          background_variant?: string | null
          created_at?: string
          descricao?: string | null
          icone?: string | null
          id?: string
          nivel_dificuldade?: string | null
          nome: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean | null
          background_variant?: string | null
          created_at?: string
          descricao?: string | null
          icone?: string | null
          id?: string
          nivel_dificuldade?: string | null
          nome?: string
          updated_at?: string
        }
        Relationships: []
      }
      jogos_desembaralhar: {
        Row: {
          area_direito: string
          created_at: string | null
          descricao: string
          dicas: Json | null
          id: string
          nivel_dificuldade: string | null
          palavras: Json
          titulo: string
          updated_at: string | null
        }
        Insert: {
          area_direito: string
          created_at?: string | null
          descricao: string
          dicas?: Json | null
          id?: string
          nivel_dificuldade?: string | null
          palavras: Json
          titulo: string
          updated_at?: string | null
        }
        Update: {
          area_direito?: string
          created_at?: string | null
          descricao?: string
          dicas?: Json | null
          id?: string
          nivel_dificuldade?: string | null
          palavras?: Json
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      jogos_enigmas: {
        Row: {
          area_direito: string
          created_at: string | null
          descricao: string
          dicas: Json | null
          id: string
          nivel_dificuldade: string | null
          pergunta: string
          resposta: string
          titulo: string
          updated_at: string | null
        }
        Insert: {
          area_direito: string
          created_at?: string | null
          descricao: string
          dicas?: Json | null
          id?: string
          nivel_dificuldade?: string | null
          pergunta: string
          resposta: string
          titulo: string
          updated_at?: string | null
        }
        Update: {
          area_direito?: string
          created_at?: string | null
          descricao?: string
          dicas?: Json | null
          id?: string
          nivel_dificuldade?: string | null
          pergunta?: string
          resposta?: string
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      jogos_escritorio_casos: {
        Row: {
          cliente: string
          created_at: string | null
          descricao: string
          documentos: Json | null
          id: string
          nivel_dificuldade: string | null
          problema: string
          titulo: string
        }
        Insert: {
          cliente: string
          created_at?: string | null
          descricao: string
          documentos?: Json | null
          id?: string
          nivel_dificuldade?: string | null
          problema: string
          titulo: string
        }
        Update: {
          cliente?: string
          created_at?: string | null
          descricao?: string
          documentos?: Json | null
          id?: string
          nivel_dificuldade?: string | null
          problema?: string
          titulo?: string
        }
        Relationships: []
      }
      jogos_escritorio_solucoes: {
        Row: {
          caso_id: string
          created_at: string | null
          feedback: string | null
          id: string
          pontuacao: number | null
          solucao: string
          status: string | null
          user_id: string
        }
        Insert: {
          caso_id: string
          created_at?: string | null
          feedback?: string | null
          id?: string
          pontuacao?: number | null
          solucao: string
          status?: string | null
          user_id: string
        }
        Update: {
          caso_id?: string
          created_at?: string | null
          feedback?: string | null
          id?: string
          pontuacao?: number | null
          solucao?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jogos_escritorio_solucoes_caso_id_fkey"
            columns: ["caso_id"]
            isOneToOne: false
            referencedRelation: "jogos_escritorio_casos"
            referencedColumns: ["id"]
          },
        ]
      }
      jogos_forca: {
        Row: {
          area_direito: string
          created_at: string | null
          descricao: string
          dicas: Json
          id: string
          max_tentativas: number | null
          nivel_dificuldade: string | null
          palavras: Json
          titulo: string
          updated_at: string | null
        }
        Insert: {
          area_direito: string
          created_at?: string | null
          descricao: string
          dicas: Json
          id?: string
          max_tentativas?: number | null
          nivel_dificuldade?: string | null
          palavras: Json
          titulo: string
          updated_at?: string | null
        }
        Update: {
          area_direito?: string
          created_at?: string | null
          descricao?: string
          dicas?: Json
          id?: string
          max_tentativas?: number | null
          nivel_dificuldade?: string | null
          palavras?: Json
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      jogos_leaderboards: {
        Row: {
          data_registro: string
          id: string
          jogo_id: string
          pontuacao: number
          user_id: string
        }
        Insert: {
          data_registro?: string
          id?: string
          jogo_id: string
          pontuacao: number
          user_id: string
        }
        Update: {
          data_registro?: string
          id?: string
          jogo_id?: string
          pontuacao?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jogos_leaderboards_jogo_id_fkey"
            columns: ["jogo_id"]
            isOneToOne: false
            referencedRelation: "jogos_categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      jogos_memoria: {
        Row: {
          area_direito: string
          created_at: string | null
          descricao: string
          id: string
          nivel_dificuldade: string | null
          pares: Json
          tema: string
          titulo: string
          updated_at: string | null
        }
        Insert: {
          area_direito: string
          created_at?: string | null
          descricao: string
          id?: string
          nivel_dificuldade?: string | null
          pares: Json
          tema: string
          titulo: string
          updated_at?: string | null
        }
        Update: {
          area_direito?: string
          created_at?: string | null
          descricao?: string
          id?: string
          nivel_dificuldade?: string | null
          pares?: Json
          tema?: string
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      jogos_palavras_cruzadas: {
        Row: {
          area_direito: string
          created_at: string | null
          descricao: string
          dicas: Json
          grade_tamanho: Json
          id: string
          nivel_dificuldade: string | null
          palavras: Json
          titulo: string
          updated_at: string | null
        }
        Insert: {
          area_direito: string
          created_at?: string | null
          descricao: string
          dicas: Json
          grade_tamanho: Json
          id?: string
          nivel_dificuldade?: string | null
          palavras: Json
          titulo: string
          updated_at?: string | null
        }
        Update: {
          area_direito?: string
          created_at?: string | null
          descricao?: string
          dicas?: Json
          grade_tamanho?: Json
          id?: string
          nivel_dificuldade?: string | null
          palavras?: Json
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      jogos_pares: {
        Row: {
          area_direito: string
          created_at: string | null
          descricao: string
          id: string
          nivel_dificuldade: string | null
          pares: Json
          titulo: string
          updated_at: string | null
        }
        Insert: {
          area_direito: string
          created_at?: string | null
          descricao: string
          id?: string
          nivel_dificuldade?: string | null
          pares: Json
          titulo: string
          updated_at?: string | null
        }
        Update: {
          area_direito?: string
          created_at?: string | null
          descricao?: string
          id?: string
          nivel_dificuldade?: string | null
          pares?: Json
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      jogos_preencher_espacos: {
        Row: {
          area_direito: string
          created_at: string | null
          descricao: string
          id: string
          nivel_dificuldade: string | null
          respostas: Json
          texto: string
          titulo: string
          updated_at: string | null
        }
        Insert: {
          area_direito: string
          created_at?: string | null
          descricao: string
          id?: string
          nivel_dificuldade?: string | null
          respostas: Json
          texto: string
          titulo: string
          updated_at?: string | null
        }
        Update: {
          area_direito?: string
          created_at?: string | null
          descricao?: string
          id?: string
          nivel_dificuldade?: string | null
          respostas?: Json
          texto?: string
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      jogos_quiz_perguntas: {
        Row: {
          area: string
          categoria: string
          created_at: string
          explicacao: string | null
          id: string
          nivel_dificuldade: string | null
          opcao_a: string
          opcao_b: string
          opcao_c: string
          opcao_d: string
          pergunta: string
          resposta_correta: string
        }
        Insert: {
          area: string
          categoria: string
          created_at?: string
          explicacao?: string | null
          id?: string
          nivel_dificuldade?: string | null
          opcao_a: string
          opcao_b: string
          opcao_c: string
          opcao_d: string
          pergunta: string
          resposta_correta: string
        }
        Update: {
          area?: string
          categoria?: string
          created_at?: string
          explicacao?: string | null
          id?: string
          nivel_dificuldade?: string | null
          opcao_a?: string
          opcao_b?: string
          opcao_c?: string
          opcao_d?: string
          pergunta?: string
          resposta_correta?: string
        }
        Relationships: []
      }
      jogos_quiz_respostas: {
        Row: {
          acertou: boolean
          created_at: string
          id: string
          pergunta_id: string
          resposta_selecionada: string
          tempo_resposta: number | null
          user_id: string
        }
        Insert: {
          acertou: boolean
          created_at?: string
          id?: string
          pergunta_id: string
          resposta_selecionada: string
          tempo_resposta?: number | null
          user_id: string
        }
        Update: {
          acertou?: boolean
          created_at?: string
          id?: string
          pergunta_id?: string
          resposta_selecionada?: string
          tempo_resposta?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jogos_quiz_respostas_pergunta_id_fkey"
            columns: ["pergunta_id"]
            isOneToOne: false
            referencedRelation: "jogos_quiz_perguntas"
            referencedColumns: ["id"]
          },
        ]
      }
      jogos_simulacoes_casos: {
        Row: {
          area_direito: string
          created_at: string
          descricao: string
          fatos: string
          id: string
          nivel_dificuldade: string | null
          provas: string | null
          titulo: string
        }
        Insert: {
          area_direito: string
          created_at?: string
          descricao: string
          fatos: string
          id?: string
          nivel_dificuldade?: string | null
          provas?: string | null
          titulo: string
        }
        Update: {
          area_direito?: string
          created_at?: string
          descricao?: string
          fatos?: string
          id?: string
          nivel_dificuldade?: string | null
          provas?: string | null
          titulo?: string
        }
        Relationships: []
      }
      jogos_simulacoes_submissoes: {
        Row: {
          argumentacao: string
          caso_id: string
          created_at: string
          feedback: string | null
          id: string
          papel: string
          pontuacao: number | null
          user_id: string
        }
        Insert: {
          argumentacao: string
          caso_id: string
          created_at?: string
          feedback?: string | null
          id?: string
          papel: string
          pontuacao?: number | null
          user_id: string
        }
        Update: {
          argumentacao?: string
          caso_id?: string
          created_at?: string
          feedback?: string | null
          id?: string
          papel?: string
          pontuacao?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jogos_simulacoes_submissoes_caso_id_fkey"
            columns: ["caso_id"]
            isOneToOne: false
            referencedRelation: "jogos_simulacoes_casos"
            referencedColumns: ["id"]
          },
        ]
      }
      jogos_user_badges: {
        Row: {
          badge_descricao: string | null
          badge_icone: string | null
          badge_nome: string
          conquistado_em: string
          id: string
          jogo_id: string
          user_id: string
        }
        Insert: {
          badge_descricao?: string | null
          badge_icone?: string | null
          badge_nome: string
          conquistado_em?: string
          id?: string
          jogo_id: string
          user_id: string
        }
        Update: {
          badge_descricao?: string | null
          badge_icone?: string | null
          badge_nome?: string
          conquistado_em?: string
          id?: string
          jogo_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jogos_user_badges_jogo_id_fkey"
            columns: ["jogo_id"]
            isOneToOne: false
            referencedRelation: "jogos_categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      jogos_user_stats: {
        Row: {
          created_at: string
          id: string
          jogo_id: string
          melhor_resultado: number | null
          partidas_jogadas: number | null
          partidas_vencidas: number | null
          pontuacao: number | null
          ultimo_acesso: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          jogo_id: string
          melhor_resultado?: number | null
          partidas_jogadas?: number | null
          partidas_vencidas?: number | null
          pontuacao?: number | null
          ultimo_acesso?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          jogo_id?: string
          melhor_resultado?: number | null
          partidas_jogadas?: number | null
          partidas_vencidas?: number | null
          pontuacao?: number | null
          ultimo_acesso?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jogos_user_stats_jogo_id_fkey"
            columns: ["jogo_id"]
            isOneToOne: false
            referencedRelation: "jogos_categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      juriflix: {
        Row: {
          ano: string | null
          beneficios: string | null
          capa: string | null
          id: number
          link: string | null
          nome: string | null
          nota: string | null
          plataforma: string | null
          sinopse: string | null
          tipo: string | null
          trailer: string | null
        }
        Insert: {
          ano?: string | null
          beneficios?: string | null
          capa?: string | null
          id?: number
          link?: string | null
          nome?: string | null
          nota?: string | null
          plataforma?: string | null
          sinopse?: string | null
          tipo?: string | null
          trailer?: string | null
        }
        Update: {
          ano?: string | null
          beneficios?: string | null
          capa?: string | null
          id?: number
          link?: string | null
          nome?: string | null
          nota?: string | null
          plataforma?: string | null
          sinopse?: string | null
          tipo?: string | null
          trailer?: string | null
        }
        Relationships: []
      }
      JURIFY: {
        Row: {
          area: string | null
          descricao: string | null
          id: number
          imagem_miniatura: string | null
          sequencia: string | null
          tag: string | null
          tema: string | null
          titulo: string | null
          url_audio: string | null
        }
        Insert: {
          area?: string | null
          descricao?: string | null
          id?: number
          imagem_miniatura?: string | null
          sequencia?: string | null
          tag?: string | null
          tema?: string | null
          titulo?: string | null
          url_audio?: string | null
        }
        Update: {
          area?: string | null
          descricao?: string | null
          id?: number
          imagem_miniatura?: string | null
          sequencia?: string | null
          tag?: string | null
          tema?: string | null
          titulo?: string | null
          url_audio?: string | null
        }
        Relationships: []
      }
      Jurisflix: {
        Row: {
          ano: string | null
          beneficios: string | null
          capa: string | null
          id: number
          link: string | null
          nome: string | null
          nota: string | null
          plataforma: string | null
          sinopse: string | null
          tipo: string | null
          trailer: string | null
        }
        Insert: {
          ano?: string | null
          beneficios?: string | null
          capa?: string | null
          id?: number
          link?: string | null
          nome?: string | null
          nota?: string | null
          plataforma?: string | null
          sinopse?: string | null
          tipo?: string | null
          trailer?: string | null
        }
        Update: {
          ano?: string | null
          beneficios?: string | null
          capa?: string | null
          id?: number
          link?: string | null
          nome?: string | null
          nota?: string | null
          plataforma?: string | null
          sinopse?: string | null
          tipo?: string | null
          trailer?: string | null
        }
        Relationships: []
      }
      jurisprudencia: {
        Row: {
          area_direito: string | null
          created_at: string | null
          data_julgamento: string | null
          ementa: string
          id: string
          numero_processo: string | null
          relator: string | null
          titulo: string
          tribunal: string
        }
        Insert: {
          area_direito?: string | null
          created_at?: string | null
          data_julgamento?: string | null
          ementa: string
          id?: string
          numero_processo?: string | null
          relator?: string | null
          titulo: string
          tribunal: string
        }
        Update: {
          area_direito?: string | null
          created_at?: string | null
          data_julgamento?: string | null
          ementa?: string
          id?: string
          numero_processo?: string | null
          relator?: string | null
          titulo?: string
          tribunal?: string
        }
        Relationships: []
      }
      livro9: {
        Row: {
          area: string
          created_at: string | null
          description: string | null
          id: string
          original_path: string | null
          pdf_name: string
          pdf_url: string
          total_pages: number | null
        }
        Insert: {
          area: string
          created_at?: string | null
          description?: string | null
          id?: string
          original_path?: string | null
          pdf_name: string
          pdf_url: string
          total_pages?: number | null
        }
        Update: {
          area?: string
          created_at?: string | null
          description?: string | null
          id?: string
          original_path?: string | null
          pdf_name?: string
          pdf_url?: string
          total_pages?: number | null
        }
        Relationships: []
      }
      livros: {
        Row: {
          autor: string | null
          capa_url: string | null
          created_at: string | null
          descricao: string | null
          id: string
          link_pdf: string
          materia: string
          titulo: string
          updated_at: string | null
        }
        Insert: {
          autor?: string | null
          capa_url?: string | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          link_pdf: string
          materia: string
          titulo: string
          updated_at?: string | null
        }
        Update: {
          autor?: string | null
          capa_url?: string | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          link_pdf?: string
          materia?: string
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      livros_historico_visualizacao: {
        Row: {
          id: string
          livro_id: string
          timestamp: string
          user_id: string
        }
        Insert: {
          id?: string
          livro_id: string
          timestamp?: string
          user_id: string
        }
        Update: {
          id?: string
          livro_id?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      livros_supa: {
        Row: {
          area: string | null
          capa: string | null
          created_at: string
          id: number
          pdf_name: string | null
          pdf_url: string | null
          sinopse: string | null
        }
        Insert: {
          area?: string | null
          capa?: string | null
          created_at?: string
          id?: number
          pdf_name?: string | null
          pdf_url?: string | null
          sinopse?: string | null
        }
        Update: {
          area?: string | null
          capa?: string | null
          created_at?: string
          id?: number
          pdf_name?: string | null
          pdf_url?: string | null
          sinopse?: string | null
        }
        Relationships: []
      }
      livrospro: {
        Row: {
          capa_url: string | null
          categoria: string
          created_at: string
          descricao: string | null
          id: string
          nome: string
          pdf: string
          total_paginas: number | null
          updated_at: string
        }
        Insert: {
          capa_url?: string | null
          categoria: string
          created_at?: string
          descricao?: string | null
          id?: string
          nome: string
          pdf: string
          total_paginas?: number | null
          updated_at?: string
        }
        Update: {
          capa_url?: string | null
          categoria?: string
          created_at?: string
          descricao?: string | null
          id?: string
          nome?: string
          pdf?: string
          total_paginas?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      livrospro_anotacoes: {
        Row: {
          cor: string | null
          created_at: string
          id: string
          livro_id: string
          pagina: number
          posicao: Json | null
          texto: string
          user_id: string
        }
        Insert: {
          cor?: string | null
          created_at?: string
          id?: string
          livro_id: string
          pagina: number
          posicao?: Json | null
          texto: string
          user_id: string
        }
        Update: {
          cor?: string | null
          created_at?: string
          id?: string
          livro_id?: string
          pagina?: number
          posicao?: Json | null
          texto?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "livrospro_anotacoes_livro_id_fkey"
            columns: ["livro_id"]
            isOneToOne: false
            referencedRelation: "livrospro"
            referencedColumns: ["id"]
          },
        ]
      }
      livrospro_marcadores: {
        Row: {
          created_at: string
          id: string
          livro_id: string
          pagina: number
          titulo: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          livro_id: string
          pagina: number
          titulo?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          livro_id?: string
          pagina?: number
          titulo?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "livrospro_marcadores_livro_id_fkey"
            columns: ["livro_id"]
            isOneToOne: false
            referencedRelation: "livrospro"
            referencedColumns: ["id"]
          },
        ]
      }
      livrospro_progresso: {
        Row: {
          id: string
          livro_id: string
          pagina_atual: number
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          livro_id: string
          pagina_atual?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          livro_id?: string
          pagina_atual?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "livrospro_progresso_livro_id_fkey"
            columns: ["livro_id"]
            isOneToOne: false
            referencedRelation: "livrospro"
            referencedColumns: ["id"]
          },
        ]
      }
      mapas_mentais: {
        Row: {
          area: string | null
          created_at: string
          id: number
          link: string | null
          mapa: string | null
        }
        Insert: {
          area?: string | null
          created_at?: string
          id?: number
          link?: string | null
          mapa?: string | null
        }
        Update: {
          area?: string | null
          created_at?: string
          id?: number
          link?: string | null
          mapa?: string | null
        }
        Relationships: []
      }
      modelos_peticoes: {
        Row: {
          area: string | null
          created_at: string
          id: number
          link: string | null
          total: string | null
        }
        Insert: {
          area?: string | null
          created_at?: string
          id?: number
          link?: string | null
          total?: string | null
        }
        Update: {
          area?: string | null
          created_at?: string
          id?: number
          link?: string | null
          total?: string | null
        }
        Relationships: []
      }
      noticias: {
        Row: {
          area_direito: string | null
          conteudo: string
          created_at: string | null
          data_publicacao: string | null
          fonte: string | null
          id: string
          thumbnail_url: string | null
          titulo: string
        }
        Insert: {
          area_direito?: string | null
          conteudo: string
          created_at?: string | null
          data_publicacao?: string | null
          fonte?: string | null
          id?: string
          thumbnail_url?: string | null
          titulo: string
        }
        Update: {
          area_direito?: string | null
          conteudo?: string
          created_at?: string | null
          data_publicacao?: string | null
          fonte?: string | null
          id?: string
          thumbnail_url?: string | null
          titulo?: string
        }
        Relationships: []
      }
      peticoes: {
        Row: {
          area: string | null
          created_at: string
          icon_color: string | null
          id: number
          last_updated: string | null
          link: string | null
          total: number | null
        }
        Insert: {
          area?: string | null
          created_at?: string
          icon_color?: string | null
          id?: number
          last_updated?: string | null
          link?: string | null
          total?: number | null
        }
        Update: {
          area?: string | null
          created_at?: string
          icon_color?: string | null
          id?: number
          last_updated?: string | null
          link?: string | null
          total?: number | null
        }
        Relationships: []
      }
      peticoes_acessos: {
        Row: {
          accessed_at: string | null
          id: string
          peticao_id: number | null
          user_id: string | null
        }
        Insert: {
          accessed_at?: string | null
          id?: string
          peticao_id?: number | null
          user_id?: string | null
        }
        Update: {
          accessed_at?: string | null
          id?: string
          peticao_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "peticoes_acessos_peticao_id_fkey"
            columns: ["peticao_id"]
            isOneToOne: false
            referencedRelation: "peticoes"
            referencedColumns: ["id"]
          },
        ]
      }
      plano_estudos: {
        Row: {
          area_interesse: string[]
          concluido: boolean
          created_at: string | null
          horas_estudo_semana: number
          id: string
          nivel_atual: string
          objetivo: string
          progress: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          area_interesse?: string[]
          concluido?: boolean
          created_at?: string | null
          horas_estudo_semana?: number
          id?: string
          nivel_atual: string
          objetivo: string
          progress?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          area_interesse?: string[]
          concluido?: boolean
          created_at?: string | null
          horas_estudo_semana?: number
          id?: string
          nivel_atual?: string
          objetivo?: string
          progress?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      playlist_direito: {
        Row: {
          Area: string | null
          Categoria: string | null
          id: number
          Playlist: string | null
        }
        Insert: {
          Area?: string | null
          Categoria?: string | null
          id?: number
          Playlist?: string | null
        }
        Update: {
          Area?: string | null
          Categoria?: string | null
          id?: number
          Playlist?: string | null
        }
        Relationships: []
      }
      podcast_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      podcast_category_links: {
        Row: {
          category_id: string | null
          id: string
          podcast_id: string | null
        }
        Insert: {
          category_id?: string | null
          id?: string
          podcast_id?: string | null
        }
        Update: {
          category_id?: string | null
          id?: string
          podcast_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "podcast_category_links_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "podcast_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "podcast_category_links_podcast_id_fkey"
            columns: ["podcast_id"]
            isOneToOne: false
            referencedRelation: "podcasts"
            referencedColumns: ["id"]
          },
        ]
      }
      podcast_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          podcast_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          podcast_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          podcast_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      podcast_favorites: {
        Row: {
          created_at: string
          episode_id: number
          id: string
          user_ip: string
        }
        Insert: {
          created_at?: string
          episode_id: number
          id?: string
          user_ip: string
        }
        Update: {
          created_at?: string
          episode_id?: number
          id?: string
          user_ip?: string
        }
        Relationships: []
      }
      podcast_history: {
        Row: {
          created_at: string
          current_position: number | null
          episode_id: number
          id: string
          progress_percent: number | null
          updated_at: string
          user_ip: string
        }
        Insert: {
          created_at?: string
          current_position?: number | null
          episode_id: number
          id?: string
          progress_percent?: number | null
          updated_at?: string
          user_ip: string
        }
        Update: {
          created_at?: string
          current_position?: number | null
          episode_id?: number
          id?: string
          progress_percent?: number | null
          updated_at?: string
          user_ip?: string
        }
        Relationships: []
      }
      podcast_likes: {
        Row: {
          created_at: string | null
          id: string
          podcast_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          podcast_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          podcast_id?: string
          user_id?: string
        }
        Relationships: []
      }
      podcast_tabela: {
        Row: {
          area: string | null
          created_at: string
          descricao: string | null
          id: number
          imagem_miniatuta: string | null
          tag: string | null
          titulo: string | null
          url_audio: string | null
        }
        Insert: {
          area?: string | null
          created_at?: string
          descricao?: string | null
          id?: number
          imagem_miniatuta?: string | null
          tag?: string | null
          titulo?: string | null
          url_audio?: string | null
        }
        Update: {
          area?: string | null
          created_at?: string
          descricao?: string | null
          id?: number
          imagem_miniatuta?: string | null
          tag?: string | null
          titulo?: string | null
          url_audio?: string | null
        }
        Relationships: []
      }
      podcasts: {
        Row: {
          audio_url: string
          created_at: string | null
          description: string
          duration: number | null
          id: string
          published_at: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          audio_url: string
          created_at?: string | null
          description: string
          duration?: number | null
          id?: string
          published_at?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          audio_url?: string
          created_at?: string | null
          description?: string
          duration?: number | null
          id?: string
          published_at?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          email: string
          id: string
          onboarding_completed: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email: string
          id: string
          onboarding_completed?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string
          id?: string
          onboarding_completed?: boolean | null
        }
        Relationships: []
      }
      questao_estatisticas: {
        Row: {
          created_at: string | null
          id: string
          questao_id: number
          total_acertos: number | null
          total_tentativas: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          questao_id: number
          total_acertos?: number | null
          total_tentativas?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          questao_id?: number
          total_acertos?: number | null
          total_tentativas?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questao_estatisticas_questao_id_fkey"
            columns: ["questao_id"]
            isOneToOne: false
            referencedRelation: "questoes"
            referencedColumns: ["id"]
          },
        ]
      }
      questoes: {
        Row: {
          AnswerA: string | null
          AnswerB: string | null
          AnswerC: string | null
          AnswerD: string | null
          Area: string | null
          CorrectAnswerInfo: string | null
          CorrectAnswers: string | null
          id: number
          QuestionText: string | null
          Tema: string | null
        }
        Insert: {
          AnswerA?: string | null
          AnswerB?: string | null
          AnswerC?: string | null
          AnswerD?: string | null
          Area?: string | null
          CorrectAnswerInfo?: string | null
          CorrectAnswers?: string | null
          id?: number
          QuestionText?: string | null
          Tema?: string | null
        }
        Update: {
          AnswerA?: string | null
          AnswerB?: string | null
          AnswerC?: string | null
          AnswerD?: string | null
          Area?: string | null
          CorrectAnswerInfo?: string | null
          CorrectAnswers?: string | null
          id?: number
          QuestionText?: string | null
          Tema?: string | null
        }
        Relationships: []
      }
      redacao_artigos: {
        Row: {
          categoria: string
          conteudo: string
          created_at: string | null
          id: string
          tags: string[] | null
          titulo: string
          updated_at: string | null
        }
        Insert: {
          categoria: string
          conteudo: string
          created_at?: string | null
          id?: string
          tags?: string[] | null
          titulo: string
          updated_at?: string | null
        }
        Update: {
          categoria?: string
          conteudo?: string
          created_at?: string | null
          id?: string
          tags?: string[] | null
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      redacao_comentarios: {
        Row: {
          comentario: string
          created_at: string | null
          id: string
          submissao_id: string | null
          user_id: string
        }
        Insert: {
          comentario: string
          created_at?: string | null
          id?: string
          submissao_id?: string | null
          user_id: string
        }
        Update: {
          comentario?: string
          created_at?: string | null
          id?: string
          submissao_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "redacao_comentarios_submissao_id_fkey"
            columns: ["submissao_id"]
            isOneToOne: false
            referencedRelation: "redacao_submissoes"
            referencedColumns: ["id"]
          },
        ]
      }
      redacao_conquistas: {
        Row: {
          badge_descricao: string
          badge_nome: string
          data_conquista: string | null
          id: string
          user_id: string
        }
        Insert: {
          badge_descricao: string
          badge_nome: string
          data_conquista?: string | null
          id?: string
          user_id: string
        }
        Update: {
          badge_descricao?: string
          badge_nome?: string
          data_conquista?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      redacao_exercicios: {
        Row: {
          created_at: string | null
          descricao: string
          dificuldade: string | null
          id: string
          tipo: string
          titulo: string
        }
        Insert: {
          created_at?: string | null
          descricao: string
          dificuldade?: string | null
          id?: string
          tipo: string
          titulo: string
        }
        Update: {
          created_at?: string | null
          descricao?: string
          dificuldade?: string | null
          id?: string
          tipo?: string
          titulo?: string
        }
        Relationships: []
      }
      redacao_modelos: {
        Row: {
          conteudo: string
          created_at: string | null
          descricao: string | null
          id: string
          nome: string
          tipo: string
          updated_at: string | null
        }
        Insert: {
          conteudo: string
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome: string
          tipo: string
          updated_at?: string | null
        }
        Update: {
          conteudo?: string
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          tipo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      redacao_progresso: {
        Row: {
          exercicios_concluidos: number | null
          id: string
          nivel: string | null
          pecas_criadas: number | null
          pontos_totais: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          exercicios_concluidos?: number | null
          id?: string
          nivel?: string | null
          pecas_criadas?: number | null
          pontos_totais?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          exercicios_concluidos?: number | null
          id?: string
          nivel?: string | null
          pecas_criadas?: number | null
          pontos_totais?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      redacao_submissoes: {
        Row: {
          conteudo: string
          created_at: string | null
          exercicio_id: string | null
          feedback: string | null
          id: string
          pontuacao: number | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          conteudo: string
          created_at?: string | null
          exercicio_id?: string | null
          feedback?: string | null
          id?: string
          pontuacao?: number | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          conteudo?: string
          created_at?: string | null
          exercicio_id?: string | null
          feedback?: string | null
          id?: string
          pontuacao?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "redacao_submissoes_exercicio_id_fkey"
            columns: ["exercicio_id"]
            isOneToOne: false
            referencedRelation: "redacao_exercicios"
            referencedColumns: ["id"]
          },
        ]
      }
      resumos: {
        Row: {
          area: string
          id: string
          resumo: string | null
          tema: string
          topico: string
        }
        Insert: {
          area: string
          id?: string
          resumo?: string | null
          tema: string
          topico: string
        }
        Update: {
          area?: string
          id?: string
          resumo?: string | null
          tema?: string
          topico?: string
        }
        Relationships: []
      }
      simulado_edicoes: {
        Row: {
          ano: number
          categoria: string
          created_at: string
          data_prova: string | null
          descricao: string | null
          id: string
          nome: string
          numero: number
          total_questoes: number
          updated_at: string
        }
        Insert: {
          ano: number
          categoria: string
          created_at?: string
          data_prova?: string | null
          descricao?: string | null
          id?: string
          nome: string
          numero: number
          total_questoes: number
          updated_at?: string
        }
        Update: {
          ano?: number
          categoria?: string
          created_at?: string
          data_prova?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          numero?: number
          total_questoes?: number
          updated_at?: string
        }
        Relationships: []
      }
      simulado_estatisticas: {
        Row: {
          area: string | null
          categoria: string
          id: string
          percentual: number | null
          total_acertos: number | null
          total_respondidas: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          area?: string | null
          categoria: string
          id?: string
          percentual?: number | null
          total_acertos?: number | null
          total_respondidas?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          area?: string | null
          categoria?: string
          id?: string
          percentual?: number | null
          total_acertos?: number | null
          total_respondidas?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      simulado_respostas: {
        Row: {
          acertou: boolean | null
          created_at: string | null
          id: string
          questao_id: string
          resposta_selecionada: string | null
          sessao_id: string
          tempo_resposta: number | null
        }
        Insert: {
          acertou?: boolean | null
          created_at?: string | null
          id?: string
          questao_id: string
          resposta_selecionada?: string | null
          sessao_id: string
          tempo_resposta?: number | null
        }
        Update: {
          acertou?: boolean | null
          created_at?: string | null
          id?: string
          questao_id?: string
          resposta_selecionada?: string | null
          sessao_id?: string
          tempo_resposta?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "simulado_respostas_sessao_id_fkey"
            columns: ["sessao_id"]
            isOneToOne: false
            referencedRelation: "simulado_sessoes"
            referencedColumns: ["id"]
          },
        ]
      }
      simulado_sessoes: {
        Row: {
          acertos: number | null
          categoria: string
          completo: boolean | null
          created_at: string | null
          data_fim: string | null
          data_inicio: string | null
          edicao_id: string | null
          id: string
          pontuacao: number | null
          tempo_total: number | null
          total_questoes: number
          user_id: string
        }
        Insert: {
          acertos?: number | null
          categoria: string
          completo?: boolean | null
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          edicao_id?: string | null
          id?: string
          pontuacao?: number | null
          tempo_total?: number | null
          total_questoes: number
          user_id: string
        }
        Update: {
          acertos?: number | null
          categoria?: string
          completo?: boolean | null
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          edicao_id?: string | null
          id?: string
          pontuacao?: number | null
          tempo_total?: number | null
          total_questoes?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "simulado_sessoes_edicao_id_fkey"
            columns: ["edicao_id"]
            isOneToOne: false
            referencedRelation: "simulado_edicoes"
            referencedColumns: ["id"]
          },
        ]
      }
      simulado_usuario_progresso: {
        Row: {
          categoria: string
          created_at: string
          id: string
          percentual_acertos: number
          pontuacao_media: number
          tempo_medio_questao: number
          total_acertos: number
          total_questoes: number
          total_simulados: number
          ultima_sessao: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          categoria: string
          created_at?: string
          id?: string
          percentual_acertos?: number
          pontuacao_media?: number
          tempo_medio_questao?: number
          total_acertos?: number
          total_questoes?: number
          total_simulados?: number
          ultima_sessao?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          categoria?: string
          created_at?: string
          id?: string
          percentual_acertos?: number
          pontuacao_media?: number
          tempo_medio_questao?: number
          total_acertos?: number
          total_questoes?: number
          total_simulados?: number
          ultima_sessao?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      simulados_delegado: {
        Row: {
          alternativa_a: string
          alternativa_b: string
          alternativa_c: string
          alternativa_correta: string
          alternativa_d: string
          ano: number
          area: string | null
          banca: string
          created_at: string | null
          edicao_id: string | null
          explicacao: string | null
          id: string
          imagem_url: string | null
          numero_questao: number
          questao: string
          updated_at: string | null
        }
        Insert: {
          alternativa_a: string
          alternativa_b: string
          alternativa_c: string
          alternativa_correta: string
          alternativa_d: string
          ano: number
          area?: string | null
          banca: string
          created_at?: string | null
          edicao_id?: string | null
          explicacao?: string | null
          id?: string
          imagem_url?: string | null
          numero_questao: number
          questao: string
          updated_at?: string | null
        }
        Update: {
          alternativa_a?: string
          alternativa_b?: string
          alternativa_c?: string
          alternativa_correta?: string
          alternativa_d?: string
          ano?: number
          area?: string | null
          banca?: string
          created_at?: string | null
          edicao_id?: string | null
          explicacao?: string | null
          id?: string
          imagem_url?: string | null
          numero_questao?: number
          questao?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "simulados_delegado_edicao_id_fkey"
            columns: ["edicao_id"]
            isOneToOne: false
            referencedRelation: "simulado_edicoes"
            referencedColumns: ["id"]
          },
        ]
      }
      simulados_juiz: {
        Row: {
          alternativa_a: string | null
          alternativa_b: string | null
          alternativa_c: string | null
          alternativa_correta: string | null
          alternativa_d: string | null
          ano: string
          area: string
          banca: string
          edicao: string
          edicao_id: string | null
          id: string
          numero_questao: string
          questao: string | null
        }
        Insert: {
          alternativa_a?: string | null
          alternativa_b?: string | null
          alternativa_c?: string | null
          alternativa_correta?: string | null
          alternativa_d?: string | null
          ano: string
          area: string
          banca: string
          edicao: string
          edicao_id?: string | null
          id?: string
          numero_questao: string
          questao?: string | null
        }
        Update: {
          alternativa_a?: string | null
          alternativa_b?: string | null
          alternativa_c?: string | null
          alternativa_correta?: string | null
          alternativa_d?: string | null
          ano?: string
          area?: string
          banca?: string
          edicao?: string
          edicao_id?: string | null
          id?: string
          numero_questao?: string
          questao?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "simulados_juiz_federal_edicao_id_fkey"
            columns: ["edicao_id"]
            isOneToOne: false
            referencedRelation: "simulado_edicoes"
            referencedColumns: ["id"]
          },
        ]
      }
      simulados_oab: {
        Row: {
          alternativa_a: string | null
          alternativa_b: string | null
          alternativa_c: string | null
          alternativa_correta: string | null
          alternativa_d: string | null
          ano: string
          area: string
          banca: string
          edicao: string
          edicao_id: string | null
          id: string
          numero_questao: string
          questao: string | null
        }
        Insert: {
          alternativa_a?: string | null
          alternativa_b?: string | null
          alternativa_c?: string | null
          alternativa_correta?: string | null
          alternativa_d?: string | null
          ano: string
          area: string
          banca: string
          edicao: string
          edicao_id?: string | null
          id?: string
          numero_questao: string
          questao?: string | null
        }
        Update: {
          alternativa_a?: string | null
          alternativa_b?: string | null
          alternativa_c?: string | null
          alternativa_correta?: string | null
          alternativa_d?: string | null
          ano?: string
          area?: string
          banca?: string
          edicao?: string
          edicao_id?: string | null
          id?: string
          numero_questao?: string
          questao?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "simulados_oab_edicao_id_fkey"
            columns: ["edicao_id"]
            isOneToOne: false
            referencedRelation: "simulado_edicoes"
            referencedColumns: ["id"]
          },
        ]
      }
      simulados_pf: {
        Row: {
          alternativa_a: string
          alternativa_b: string
          alternativa_c: string
          alternativa_correta: string
          alternativa_d: string
          ano: number
          area: string | null
          banca: string
          created_at: string | null
          edicao_id: string | null
          explicacao: string | null
          id: string
          imagem_url: string | null
          numero_questao: number
          questao: string
          updated_at: string | null
        }
        Insert: {
          alternativa_a: string
          alternativa_b: string
          alternativa_c: string
          alternativa_correta: string
          alternativa_d: string
          ano: number
          area?: string | null
          banca: string
          created_at?: string | null
          edicao_id?: string | null
          explicacao?: string | null
          id?: string
          imagem_url?: string | null
          numero_questao: number
          questao: string
          updated_at?: string | null
        }
        Update: {
          alternativa_a?: string
          alternativa_b?: string
          alternativa_c?: string
          alternativa_correta?: string
          alternativa_d?: string
          ano?: number
          area?: string | null
          banca?: string
          created_at?: string | null
          edicao_id?: string | null
          explicacao?: string | null
          id?: string
          imagem_url?: string | null
          numero_questao?: number
          questao?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "simulados_pf_edicao_id_fkey"
            columns: ["edicao_id"]
            isOneToOne: false
            referencedRelation: "simulado_edicoes"
            referencedColumns: ["id"]
          },
        ]
      }
      simulados_prf: {
        Row: {
          alternativa_a: string
          alternativa_b: string
          alternativa_c: string
          alternativa_correta: string
          alternativa_d: string
          ano: number
          area: string | null
          banca: string
          created_at: string | null
          edicao_id: string | null
          explicacao: string | null
          id: string
          imagem_url: string | null
          numero_questao: number
          questao: string
          updated_at: string | null
        }
        Insert: {
          alternativa_a: string
          alternativa_b: string
          alternativa_c: string
          alternativa_correta: string
          alternativa_d: string
          ano: number
          area?: string | null
          banca: string
          created_at?: string | null
          edicao_id?: string | null
          explicacao?: string | null
          id?: string
          imagem_url?: string | null
          numero_questao: number
          questao: string
          updated_at?: string | null
        }
        Update: {
          alternativa_a?: string
          alternativa_b?: string
          alternativa_c?: string
          alternativa_correta?: string
          alternativa_d?: string
          ano?: number
          area?: string | null
          banca?: string
          created_at?: string | null
          edicao_id?: string | null
          explicacao?: string | null
          id?: string
          imagem_url?: string | null
          numero_questao?: number
          questao?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "simulados_prf_edicao_id_fkey"
            columns: ["edicao_id"]
            isOneToOne: false
            referencedRelation: "simulado_edicoes"
            referencedColumns: ["id"]
          },
        ]
      }
      simulados_promotor: {
        Row: {
          alternativa_a: string
          alternativa_b: string
          alternativa_c: string
          alternativa_correta: string
          alternativa_d: string
          ano: number
          area: string | null
          banca: string
          created_at: string | null
          edicao_id: string | null
          explicacao: string | null
          id: string
          imagem_url: string | null
          numero_questao: number
          questao: string
          updated_at: string | null
        }
        Insert: {
          alternativa_a: string
          alternativa_b: string
          alternativa_c: string
          alternativa_correta: string
          alternativa_d: string
          ano: number
          area?: string | null
          banca: string
          created_at?: string | null
          edicao_id?: string | null
          explicacao?: string | null
          id?: string
          imagem_url?: string | null
          numero_questao: number
          questao: string
          updated_at?: string | null
        }
        Update: {
          alternativa_a?: string
          alternativa_b?: string
          alternativa_c?: string
          alternativa_correta?: string
          alternativa_d?: string
          ano?: number
          area?: string | null
          banca?: string
          created_at?: string | null
          edicao_id?: string | null
          explicacao?: string | null
          id?: string
          imagem_url?: string | null
          numero_questao?: number
          questao?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "simulados_promotor_edicao_id_fkey"
            columns: ["edicao_id"]
            isOneToOne: false
            referencedRelation: "simulado_edicoes"
            referencedColumns: ["id"]
          },
        ]
      }
      simulados_tjsp: {
        Row: {
          alternativa_a: string
          alternativa_b: string
          alternativa_c: string
          alternativa_correta: string
          alternativa_d: string
          ano: number
          area: string | null
          banca: string
          created_at: string | null
          edicao_id: string | null
          explicacao: string | null
          id: string
          imagem_url: string | null
          numero_questao: number
          questao: string
          updated_at: string | null
        }
        Insert: {
          alternativa_a: string
          alternativa_b: string
          alternativa_c: string
          alternativa_correta: string
          alternativa_d: string
          ano: number
          area?: string | null
          banca: string
          created_at?: string | null
          edicao_id?: string | null
          explicacao?: string | null
          id?: string
          imagem_url?: string | null
          numero_questao: number
          questao: string
          updated_at?: string | null
        }
        Update: {
          alternativa_a?: string
          alternativa_b?: string
          alternativa_c?: string
          alternativa_correta?: string
          alternativa_d?: string
          ano?: number
          area?: string | null
          banca?: string
          created_at?: string | null
          edicao_id?: string | null
          explicacao?: string | null
          id?: string
          imagem_url?: string | null
          numero_questao?: number
          questao?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "simulados_tjsp_edicao_id_fkey"
            columns: ["edicao_id"]
            isOneToOne: false
            referencedRelation: "simulado_edicoes"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          achieved: boolean
          achieved_at: string | null
          badge_name: string
          created_at: string | null
          id: string
          progress: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          achieved?: boolean
          achieved_at?: string | null
          badge_name: string
          created_at?: string | null
          id?: string
          progress?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          achieved?: boolean
          achieved_at?: string | null
          badge_name?: string
          created_at?: string | null
          id?: string
          progress?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_biblioteca: {
        Row: {
          anotacoes: string | null
          comentarios: string | null
          created_at: string | null
          favorito: boolean | null
          id: string
          lido: boolean | null
          livro_id: string | null
          progresso_leitura: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          anotacoes?: string | null
          comentarios?: string | null
          created_at?: string | null
          favorito?: boolean | null
          id?: string
          lido?: boolean | null
          livro_id?: string | null
          progresso_leitura?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          anotacoes?: string | null
          comentarios?: string | null
          created_at?: string | null
          favorito?: boolean | null
          id?: string
          lido?: boolean | null
          livro_id?: string | null
          progresso_leitura?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_biblioteca_livro_id_fkey"
            columns: ["livro_id"]
            isOneToOne: false
            referencedRelation: "biblioteca_juridica_improved"
            referencedColumns: ["id"]
          },
        ]
      }
      user_flashcards: {
        Row: {
          conhecimento: number | null
          created_at: string | null
          flashcard_id: string | null
          id: string
          proxima_revisao: string | null
          revisoes: number | null
          ultima_revisao: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          conhecimento?: number | null
          created_at?: string | null
          flashcard_id?: string | null
          id?: string
          proxima_revisao?: string | null
          revisoes?: number | null
          ultima_revisao?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          conhecimento?: number | null
          created_at?: string | null
          flashcard_id?: string | null
          id?: string
          proxima_revisao?: string | null
          revisoes?: number | null
          ultima_revisao?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_flashcards_flashcard_id_fkey"
            columns: ["flashcard_id"]
            isOneToOne: false
            referencedRelation: "flash_cards_improved"
            referencedColumns: ["id"]
          },
        ]
      }
      user_podcast_favorites: {
        Row: {
          created_at: string | null
          id: string
          podcast_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          podcast_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          podcast_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_podcast_favorites_podcast_id_fkey"
            columns: ["podcast_id"]
            isOneToOne: false
            referencedRelation: "podcasts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_podcast_progress: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: string
          last_played_at: string | null
          podcast_id: string | null
          progress_seconds: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          last_played_at?: string | null
          podcast_id?: string | null
          progress_seconds?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          last_played_at?: string | null
          podcast_id?: string | null
          progress_seconds?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_podcast_progress_podcast_id_fkey"
            columns: ["podcast_id"]
            isOneToOne: false
            referencedRelation: "podcasts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progresso_disciplinas: {
        Row: {
          anotacoes: string | null
          created_at: string | null
          data_conclusao: string | null
          disciplina_id: string
          favorito: boolean | null
          id: string
          nota: number | null
          progresso_percentual: number | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          anotacoes?: string | null
          created_at?: string | null
          data_conclusao?: string | null
          disciplina_id: string
          favorito?: boolean | null
          id?: string
          nota?: number | null
          progresso_percentual?: number | null
          status: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          anotacoes?: string | null
          created_at?: string | null
          data_conclusao?: string | null
          disciplina_id?: string
          favorito?: boolean | null
          id?: string
          nota?: number | null
          progresso_percentual?: number | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progresso_disciplinas_disciplina_id_fkey"
            columns: ["disciplina_id"]
            isOneToOne: false
            referencedRelation: "disciplinas"
            referencedColumns: ["id"]
          },
        ]
      }
      user_question_responses: {
        Row: {
          answer: string
          created_at: string | null
          id: string
          is_correct: boolean
          question_id: string
          user_id: string
        }
        Insert: {
          answer: string
          created_at?: string | null
          id?: string
          is_correct: boolean
          question_id: string
          user_id: string
        }
        Update: {
          answer?: string
          created_at?: string | null
          id?: string
          is_correct?: boolean
          question_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_question_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "video_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_questoes: {
        Row: {
          acertou: boolean
          created_at: string | null
          id: string
          questao_id: number | null
          resposta_selecionada: string
          user_id: string | null
        }
        Insert: {
          acertou: boolean
          created_at?: string | null
          id?: string
          questao_id?: number | null
          resposta_selecionada: string
          user_id?: string | null
        }
        Update: {
          acertou?: boolean
          created_at?: string | null
          id?: string
          questao_id?: number | null
          resposta_selecionada?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_questoes_questao_id_fkey"
            columns: ["questao_id"]
            isOneToOne: false
            referencedRelation: "questoes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_statistics: {
        Row: {
          created_at: string | null
          flashcards_estudados: number | null
          id: string
          livros_lidos: number | null
          tempo_total_estudo: number | null
          updated_at: string | null
          user_id: string
          videos_assistidos: number | null
        }
        Insert: {
          created_at?: string | null
          flashcards_estudados?: number | null
          id?: string
          livros_lidos?: number | null
          tempo_total_estudo?: number | null
          updated_at?: string | null
          user_id: string
          videos_assistidos?: number | null
        }
        Update: {
          created_at?: string | null
          flashcards_estudados?: number | null
          id?: string
          livros_lidos?: number | null
          tempo_total_estudo?: number | null
          updated_at?: string | null
          user_id?: string
          videos_assistidos?: number | null
        }
        Relationships: []
      }
      user_vademecum_preferences: {
        Row: {
          created_at: string | null
          font_size: number
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          font_size?: number
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          font_size?: number
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_video_progress: {
        Row: {
          completed: boolean | null
          id: string
          last_watched_at: string | null
          user_id: string
          video_id: string
          watched_seconds: number | null
        }
        Insert: {
          completed?: boolean | null
          id?: string
          last_watched_at?: string | null
          user_id: string
          video_id: string
          watched_seconds?: number | null
        }
        Update: {
          completed?: boolean | null
          id?: string
          last_watched_at?: string | null
          user_id?: string
          video_id?: string
          watched_seconds?: number | null
        }
        Relationships: []
      }
      vademecum_favorites: {
        Row: {
          article_id: string
          article_number: string | null
          article_text: string
          created_at: string | null
          id: string
          law_name: string
          user_id: string
        }
        Insert: {
          article_id: string
          article_number?: string | null
          article_text: string
          created_at?: string | null
          id?: string
          law_name: string
          user_id: string
        }
        Update: {
          article_id?: string
          article_number?: string | null
          article_text?: string
          created_at?: string | null
          id?: string
          law_name?: string
          user_id?: string
        }
        Relationships: []
      }
      vademecum_history: {
        Row: {
          article_id: string
          article_number: string | null
          article_text: string
          id: string
          law_name: string
          user_id: string
          viewed_at: string | null
        }
        Insert: {
          article_id: string
          article_number?: string | null
          article_text: string
          id?: string
          law_name: string
          user_id: string
          viewed_at?: string | null
        }
        Update: {
          article_id?: string
          article_number?: string | null
          article_text?: string
          id?: string
          law_name?: string
          user_id?: string
          viewed_at?: string | null
        }
        Relationships: []
      }
      video_aulas: {
        Row: {
          area: string
          created_at: string | null
          description: string | null
          duration: string | null
          id: string
          professor: string | null
          thumbnail_url: string | null
          title: string
          url: string
          views: number | null
        }
        Insert: {
          area: string
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          professor?: string | null
          thumbnail_url?: string | null
          title: string
          url: string
          views?: number | null
        }
        Update: {
          area?: string
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          professor?: string | null
          thumbnail_url?: string | null
          title?: string
          url?: string
          views?: number | null
        }
        Relationships: []
      }
      video_playlists_juridicas: {
        Row: {
          area: string
          channel_title: string
          created_at: string | null
          id: string
          playlist_id: string
          playlist_title: string
          thumbnail_url: string | null
          updated_at: string | null
          video_count: number
        }
        Insert: {
          area: string
          channel_title: string
          created_at?: string | null
          id?: string
          playlist_id: string
          playlist_title: string
          thumbnail_url?: string | null
          updated_at?: string | null
          video_count?: number
        }
        Update: {
          area?: string
          channel_title?: string
          created_at?: string | null
          id?: string
          playlist_id?: string
          playlist_title?: string
          thumbnail_url?: string | null
          updated_at?: string | null
          video_count?: number
        }
        Relationships: []
      }
      video_questions: {
        Row: {
          ai_generated: boolean | null
          correct_answer: string
          created_at: string | null
          explanation: string | null
          id: string
          options: Json | null
          question: string
          timestamp: number
          video_id: string
        }
        Insert: {
          ai_generated?: boolean | null
          correct_answer: string
          created_at?: string | null
          explanation?: string | null
          id?: string
          options?: Json | null
          question: string
          timestamp: number
          video_id: string
        }
        Update: {
          ai_generated?: boolean | null
          correct_answer?: string
          created_at?: string | null
          explanation?: string | null
          id?: string
          options?: Json | null
          question?: string
          timestamp?: number
          video_id?: string
        }
        Relationships: []
      }
      video_transcripts: {
        Row: {
          created_at: string | null
          id: string
          transcript: string
          video_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          transcript: string
          video_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          transcript?: string
          video_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      simulado_areas_dificeis: {
        Row: {
          area: string | null
          categoria: string | null
          media_percentual: number | null
          total_questoes: number | null
          total_usuarios: number | null
        }
        Relationships: []
      }
      temas_trending: {
        Row: {
          Area: string | null
          percentual_acertos: number | null
          Tema: string | null
          total_tentativas: number | null
          total_usuarios: number | null
        }
        Relationships: []
      }
      user_questoes_stats: {
        Row: {
          acertos_area: number | null
          area: string | null
          percentual_acertos: number | null
          percentual_area: number | null
          questoes_area: number | null
          total_acertos: number | null
          total_respondidas: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_user_progress: {
        Args: { user_uuid: string }
        Returns: number
      }
      delete_user_account: {
        Args: { user_id: string }
        Returns: undefined
      }
      generate_redacao_content: {
        Args: { topic: string; type: string }
        Returns: string
      }
      get_content_details: {
        Args: { p_content_type: string; p_content_ids: string[] }
        Returns: Json
      }
      get_simulado_leaderboard: {
        Args: { _categoria: string; _limit?: number }
        Returns: {
          user_id: string
          total_respondidas: number
          total_acertos: number
          percentual: number
          rank: number
        }[]
      }
      get_view_history: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          livro_id: string
          timestamp: string
          user_id: string
        }[]
      }
      increment_user_statistic: {
        Args: { p_user_id: string; p_field: string; p_amount?: number }
        Returns: undefined
      }
      list_bucket_files: {
        Args: { bucket_name: string }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
      list_tables: {
        Args: { prefix: string }
        Returns: {
          table_name: string
        }[]
      }
      migrate_biblioteca_data: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      migrate_flashcards_data: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      populate_biblioteca_from_bucket: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      track_book_view: {
        Args: { p_livro_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
