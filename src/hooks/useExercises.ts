import { useQuery } from '@tanstack/react-query';
import { ExerciseApi } from '../api/exerciseApi';


export const QUERY_KEYS = {
  exercises: 'exercises',
  exercise: 'exercise',
  bodyParts: 'bodyParts',
  equipment: 'equipment',
  targets: 'targets',
} as const;

export function useGetAllExercises(filters?: ExerciseFilters) {
  return useQuery({
    queryKey: [QUERY_KEYS.exercises, filters],
    queryFn: () => ExerciseApi.getExercises(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useGetExercise(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.exercise, id],
    queryFn: () => ExerciseApi.getExerciseById(id),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useGetBodyParts() {
  return useQuery({
    queryKey: [QUERY_KEYS.bodyParts],
    queryFn: ExerciseApi.getBodyPartsList,
    staleTime: Infinity, // This rarely changes
  });
}

export function useGetEquipmentList() {
  return useQuery({
    queryKey: [QUERY_KEYS.equipment],
    queryFn: ExerciseApi.getEquipmentList,
    staleTime: Infinity, // This rarely changes
  });
}

export function useGetTargetList() {
  return useQuery({
    queryKey: [QUERY_KEYS.targets],
    queryFn: ExerciseApi.getTargetList,
    staleTime: Infinity, // This rarely changes
  });
} 