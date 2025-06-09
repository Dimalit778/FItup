-- Create enum types for profile fields
CREATE TYPE gender_type AS ENUM ('male', 'female');
CREATE TYPE body_type AS ENUM ('muscle', 'standard', 'slim', 'plus');
CREATE TYPE workout_frequency AS ENUM ('never', 'rarely', '1-2_times', '3-4_times', '5+_times');

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    gender gender_type NOT NULL,
    height NUMERIC(4,1) NOT NULL, -- in cm, allowing decimals
    weight NUMERIC(4,1) NOT NULL, -- in kg, allowing decimals
    body_form body_type NOT NULL,
    workout_experience workout_frequency NOT NULL,
    setup_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Create updated_at trigger
CREATE TRIGGER profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

