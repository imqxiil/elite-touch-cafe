import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Redirect unauthenticated users to login
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="bg-background text-on-background font-body-md h-screen flex overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col md:ml-64 h-full overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto px-margin-mobile md:px-margin-desktop py-xl">
          <div className="max-w-[1280px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
