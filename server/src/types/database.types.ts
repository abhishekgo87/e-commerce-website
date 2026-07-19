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
      cart_items: {
        Row: {
          id: number
          user_id: string
          product_id: number
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          product_id: number
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          product_id?: number
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
