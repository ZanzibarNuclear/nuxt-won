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
      countries: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          archived_at: string | null
          cover_art: string | null
          created_at: string
          description: string | null
          first_lesson_id: number | null
          id: number
          name: string | null
          published_at: string | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          cover_art?: string | null
          created_at?: string
          description?: string | null
          first_lesson_id?: number | null
          id?: number
          name?: string | null
          published_at?: string | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          cover_art?: string | null
          created_at?: string
          description?: string | null
          first_lesson_id?: number | null
          id?: number
          name?: string | null
          published_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_first_lesson_id_fkey"
            columns: ["first_lesson_id"]
            isOneToOne: false
            referencedRelation: "lessonPlans"
            referencedColumns: ["id"]
          },
        ]
      }
      lessonParts: {
        Row: {
          content: string | null
          id: number
          lesson_plan_id: number | null
          sequence: number | null
        }
        Insert: {
          content?: string | null
          id?: number
          lesson_plan_id?: number | null
          sequence?: number | null
        }
        Update: {
          content?: string | null
          id?: number
          lesson_plan_id?: number | null
          sequence?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lessonParts_lesson_plan_id_fkey"
            columns: ["lesson_plan_id"]
            isOneToOne: false
            referencedRelation: "lessonPlans"
            referencedColumns: ["id"]
          },
        ]
      }
      lessonPlans: {
        Row: {
          archived_at: string | null
          cover: string | null
          created_at: string
          id: number
          objective: string | null
          published_at: string | null
          subtitle: string | null
          synopsis: string | null
          title: string | null
        }
        Insert: {
          archived_at?: string | null
          cover?: string | null
          created_at?: string
          id?: number
          objective?: string | null
          published_at?: string | null
          subtitle?: string | null
          synopsis?: string | null
          title?: string | null
        }
        Update: {
          archived_at?: string | null
          cover?: string | null
          created_at?: string
          id?: number
          objective?: string | null
          published_at?: string | null
          subtitle?: string | null
          synopsis?: string | null
          title?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          join_reason: string | null
          joined_at: string | null
          linkedin_profile_name: string | null
          nuclear_likes: string | null
          screen_name: string | null
          updated_at: string | null
          username: string | null
          website: string | null
          x_username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          join_reason?: string | null
          joined_at?: string | null
          linkedin_profile_name?: string | null
          nuclear_likes?: string | null
          screen_name?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
          x_username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          join_reason?: string | null
          joined_at?: string | null
          linkedin_profile_name?: string | null
          nuclear_likes?: string | null
          screen_name?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
          x_username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      trail_markers: {
        Row: {
          created_at: string
          from_lesson_id: number | null
          id: number
          to_lesson_id: number | null
          transition_prompt: string | null
        }
        Insert: {
          created_at?: string
          from_lesson_id?: number | null
          id?: number
          to_lesson_id?: number | null
          transition_prompt?: string | null
        }
        Update: {
          created_at?: string
          from_lesson_id?: number | null
          id?: number
          to_lesson_id?: number | null
          transition_prompt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trail_markers_from_lesson_id_fkey"
            columns: ["from_lesson_id"]
            isOneToOne: false
            referencedRelation: "lessonPlans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trail_markers_to_lesson_id_fkey"
            columns: ["to_lesson_id"]
            isOneToOne: false
            referencedRelation: "lessonPlans"
            referencedColumns: ["id"]
          },
        ]
      }
      wsy_entries: {
        Row: {
          author_id: number
          id: number
          posted_at: string
          responding_to: number | null
          statement: string
          thread_id: number
        }
        Insert: {
          author_id: number
          id?: never
          posted_at?: string
          responding_to?: number | null
          statement: string
          thread_id: number
        }
        Update: {
          author_id?: number
          id?: never
          posted_at?: string
          responding_to?: number | null
          statement?: string
          thread_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "wsy_entries_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "wsy_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wsy_entries_responding_to_fkey"
            columns: ["responding_to"]
            isOneToOne: false
            referencedRelation: "wsy_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wsy_entries_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "wsy_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      wsy_participants: {
        Row: {
          alias: string | null
          id: number
          joined_at: string
          karma: number | null
          user_id: string
        }
        Insert: {
          alias?: string | null
          id?: number
          joined_at?: string
          karma?: number | null
          user_id: string
        }
        Update: {
          alias?: string | null
          id?: number
          joined_at?: string
          karma?: number | null
          user_id?: string
        }
        Relationships: []
      }
      wsy_threads: {
        Row: {
          created_at: string
          id: number
          owner_id: number
          public_key: string
          starting_entry_id: number | null
          topic: string
        }
        Insert: {
          created_at?: string
          id?: number
          owner_id: number
          public_key: string
          starting_entry_id?: number | null
          topic: string
        }
        Update: {
          created_at?: string
          id?: number
          owner_id?: number
          public_key?: string
          starting_entry_id?: number | null
          topic?: string
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
