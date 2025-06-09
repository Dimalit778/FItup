import { Exercise, ExerciseFilters } from '../types/exercise';


const BASE_URL = 'https://exercisedb.p.rapidapi.com';

if (!process.env.EXPO_PUBLIC_EXERCISE_DB_API) {
  throw new Error('EXPO_PUBLIC_EXERCISE_DB_API environment variable is not set');
}

const headers = {
  'x-rapidapi-key': process.env.EXPO_PUBLIC_EXERCISE_DB_API,
  'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
};

export class ExerciseApi {
  static async getExercises(filters: ExerciseFilters = { limit: 10, offset: 0 }): Promise<Exercise[]> {
    const params = new URLSearchParams({
      ...(filters.limit && { limit: filters.limit.toString() }),
      ...(filters.offset && { offset: filters.offset.toString() })
    });

    let url = `${BASE_URL}/exercises`;
    if (filters.bodyPart) url = `${BASE_URL}/exercises/bodyPart/${filters.bodyPart}`;
    if (filters.equipment) url = `${BASE_URL}/exercises/equipment/${filters.equipment}`;
    if (filters.target) url = `${BASE_URL}/exercises/target/${filters.target}`;
    if (filters.name) url = `${BASE_URL}/exercises/name/${filters.name}`;

    url += `?${params.toString()}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error('Failed to fetch exercises');
    return response.json();
  }

  static async getExerciseById(id: string): Promise<Exercise> {
    const response = await fetch(`${BASE_URL}/exercises/exercise/${id}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch exercise');
    return response.json();
  }

  static async getBodyPartsList(): Promise<string[]> {
    const response = await fetch(`${BASE_URL}/exercises/bodyPartList`, { headers });
    if (!response.ok) throw new Error('Failed to fetch body parts');
    return response.json();
  }

  static async getEquipmentList(): Promise<string[]> {
    const response = await fetch(`${BASE_URL}/exercises/equipmentList`, { headers });
    if (!response.ok) throw new Error('Failed to fetch equipment list');
    return response.json();
  }

  static async getTargetList(): Promise<string[]> {
    const response = await fetch(`${BASE_URL}/exercises/targetList`, { headers });
    if (!response.ok) throw new Error('Failed to fetch target list');
    return response.json();
  }
} 