import { createClient } from "./server";

export async function checkAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, error: "Unauthorized", status: 401 };
  }

  const { data: adminUser, error } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .single();

  if (error || !adminUser) {
    return { supabase, error: "Forbidden", status: 403 };
  }

  return { supabase, user };
}
