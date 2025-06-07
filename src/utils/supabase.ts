import { supabase } from "@/src/lib/supabase";

export async function syncUserWithSupabase(clerkUser: any) {
  if (!clerkUser) return;

  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select()
    .eq("clerk_id", clerkUser.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Error fetching user:", fetchError);
    return;
  }

  if (!existingUser) {
    // Create new user in Supabase
    const { error: createError } = await supabase.from("users").insert({
      clerk_id: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress,
      first_name: clerkUser.firstName,
      last_name: clerkUser.lastName,
      avatar_url: clerkUser.imageUrl,
    });

    if (createError) {
      console.error("Error creating user:", createError);
    }
  } else {
    // Update existing user in Supabase
    const { error: updateError } = await supabase
      .from("users")
      .update({
        email: clerkUser.emailAddresses[0]?.emailAddress,
        first_name: clerkUser.firstName,
        last_name: clerkUser.lastName,
        avatar_url: clerkUser.imageUrl,
      })
      .eq("clerk_id", clerkUser.id);

    if (updateError) {
      console.error("Error updating user:", updateError);
    }
  }
}
