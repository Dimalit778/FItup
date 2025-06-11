// import { Profile } from '@/src/types/supabaseTypes';
// import { useAuth, useUser } from '@clerk/clerk-expo';
// import { useEffect, useState } from 'react';

// export function useProfile() {
//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch profile from Supabase
//   const fetchProfile = async () => {
//     if (!user?.id) {
//       setIsLoading(false);
//       return; 
//     }

//     try {
//       setIsLoading(true);
//       setError(null);

//       // Get Clerk token to authenticate with Supabase
//       const token = await getToken({ template: 'supabase' });
      
//       // Set the Supabase auth token
//       supabase.auth.session = () => ({
//         access_token: token,
//         token_type: 'bearer',
//         user: null,
//       });

//       const { data, error: supabaseError } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('clerk_user_id', user.id)
//         .single();

//       if (supabaseError && supabaseError.code !== 'PGRST116') {
//         throw supabaseError;
//       }

//       if (data) {
//         setProfile(data);
//       } else {
//         // Create profile if it doesn't exist
//         await createProfile();
//       }
//     } catch (err) {
//       console.error('Error fetching profile:', err);
//       setError('Failed to load profile');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Create initial profile
//   const createProfile = async () => {
//     if (!user) return;

//     try {
//       const newProfile = {
//         clerk_user_id: user.id,
//         email: user.emailAddresses[0]?.emailAddress || '',
//         first_name: user.firstName || '',
//         last_name: user.lastName || '',
//         has_completed_profile: false,
//       };

//       const { data, error: supabaseError } = await supabase
//         .from('profiles')
//         .insert([newProfile])
//         .select()
//         .single();

//       if (supabaseError) throw supabaseError;

//       setProfile(data);
//     } catch (err) {
//       console.error('Error creating profile:', err);
//       setError('Failed to create profile');
//     }
//   };

//   // Update profile with setup answers
//   const completeProfile = async () => {
//     if (!user?.id) throw new Error('User not authenticated');

//     try {
//       const { data, error: supabaseError } = await supabase
//         .from('profiles')
//         .update({
//           ...answers,
//           has_completed_profile: true,
//           updated_at: new Date().toISOString(),
//         })
//         .eq('clerk_user_id', user.id)
//         .select()
//         .single();

//       if (supabaseError) throw supabaseError;

//       setProfile(data);
//       return data;
//     } catch (err) {
//       console.error('Error completing profile:', err);
//       throw err;
//     }
//   };

//   // Update profile data
//   const updateProfile = async (updates: Partial<Profile>) => {
//     if (!user?.id) throw new Error('User not authenticated');

//     try {
//       const { data, error: supabaseError } = await supabase
//         .from('profiles')
//         .update({
//           ...updates,
//           updated_at: new Date().toISOString(),
//         })
//         .eq('clerk_user_id', user.id)
//         .select()
//         .single();

//       if (supabaseError) throw supabaseError;

//       setProfile(data);
//       return data;
//     } catch (err) {
//       console.error('Error updating profile:', err);
//       throw err;
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, [user?.id]);

//   return {
//     profile,
//     isLoading,
//     error,
//     completeProfile,
//     updateProfile,
//     refetchProfile: fetchProfile,
//   };
// }