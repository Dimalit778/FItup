
// Define the database types
export type Gender = 'male' | 'female' | 'other';
export type BodyType = 'skinny' | 'average' | 'muscular';
export type ActivityLevel = 'not active' | 'active' | 'very_active' | 'extra_active';
export type FitnessGoal = 'lose_weight' | 'keep_fit' | 'gain_weight' | 'build_muscle';

export type Profile = {
  id: string;
  clerk_user_id: string;
  name: string;
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  body_form: BodyType;
  activity_level: ActivityLevel;
  fitness_goal: FitnessGoal;
  setup_completed: boolean;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'clerk_user_id'>>;
      };
    };
    Enums: {
      gender_type: Gender;
      body_type: BodyType;
      activity_level: ActivityLevel;
      fitness_goal: FitnessGoal;
    };
  };
};