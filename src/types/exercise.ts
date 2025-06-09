export interface Exercise {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface ExerciseFilters extends PaginationParams {
  bodyPart?: string;
  equipment?: string;
  target?: string;
  name?: string;
} 