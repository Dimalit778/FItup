import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true
});

export type MealPlan = {
  meals: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
};

export const aiService = {
  async generateWorkoutPlan(profile: UserProfile): Promise<Workout[]> {
    const prompt = `Create a personalized workout plan for a ${profile.age} year old ${profile.gender}, 
    height: ${profile.height}cm, weight: ${profile.weight}kg, 
    goal: ${profile.goal}, preferred workout location: ${profile.workoutPreference}, 
    ${profile.workoutDaysPerWeek} days per week.
    Format the response as a JSON array of workout objects with properties: name, exercises (array), duration (in minutes).`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" }
    });

    const response = JSON.parse(completion.choices[0].message.content || '{"workouts": []}');
    return response.workouts;
  },

  async generateMealPlan(profile: UserProfile): Promise<MealPlan> {
    const prompt = `Create a personalized meal plan for a ${profile.age} year old ${profile.gender}, 
    height: ${profile.height}cm, weight: ${profile.weight}kg, 
    goal: ${profile.goal}, activity level: ${profile.activityLevel}.
    Dietary restrictions: ${profile.dietaryRestrictions.join(', ')}.
    Format the response as a JSON object with properties: meals (breakfast, lunch, dinner, snacks arrays), 
    calories (total), macros (protein, carbs, fats in grams).`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" }
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');
    return response;
  },

  async getMotivationalMessage(profile: UserProfile): Promise<string> {
    const prompt = `Generate a short, personalized motivational message for someone with the goal of ${profile.goal}.
    Make it engaging and specific to their fitness journey.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4-turbo-preview",
    });

    return completion.choices[0].message.content || 'Stay motivated!';
  }
}; 