// import { supabase } from "@/src/supabase/supabase";
// import { create } from "zustand";

// export interface Workout {
//   id: string;
//   user_id: string;
//   name: string;
//   exercises: string[];
//   duration: number;
//   created_at: string;
// }

// interface WorkoutState {
//   workouts: Workout[];
//   currentWorkout: Workout | null;
//   loading: boolean;
//   error: string | null;
//   fetchWorkouts: (userId: string) => Promise<void>;
//   addWorkout: (
//     userId: string,
//     workout: Omit<Workout, "id" | "user_id" | "created_at">
//   ) => Promise<void>;
//   setCurrentWorkout: (workout: Workout | null) => void;
//   removeWorkout: (workoutId: string) => Promise<void>;
// }

// export const useWorkoutStore = create<WorkoutState>((set, get) => ({
//   workouts: [],
//   currentWorkout: null,
//   loading: false,
//   error: null,

//   fetchWorkouts: async (userId: string) => {
//     set({ loading: true, error: null });
//     try {
//       const { data, error } = await supabase
//         .from("workouts")
//         .select("*")
//         .eq("user_id", userId)
//         .order("created_at", { ascending: false });

//       if (error) throw error;
//       set({ workouts: data || [] });
//     } catch (error) {
//       set({ error: (error as Error).message });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   addWorkout: async (userId: string, workout) => {
//     set({ loading: true, error: null });
//     try {
//       const { data, error } = await supabase
//         .from("workouts")
//         .insert([
//           {
//             user_id: userId,
//             ...workout,
//             created_at: new Date().toISOString(),
//           },
//         ])
//         .select()
//         .single();

//       if (error) throw error;
//       set((state) => ({
//         workouts: [data, ...state.workouts],
//       }));
//     } catch (error) {
//       set({ error: (error as Error).message });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   setCurrentWorkout: (workout) => set({ currentWorkout: workout }),

//   removeWorkout: async (workoutId: string) => {
//     set({ loading: true, error: null });
//     try {
//       const { error } = await supabase
//         .from("workouts")
//         .delete()
//         .eq("id", workoutId);

//       if (error) throw error;
//       set((state) => ({
//         workouts: state.workouts.filter((w) => w.id !== workoutId),
//         currentWorkout:
//           state.currentWorkout?.id === workoutId ? null : state.currentWorkout,
//       }));
//     } catch (error) {
//       set({ error: (error as Error).message });
//     } finally {
//       set({ loading: false });
//     }
//   },
// }));
