import { NextResponse } from "next/server";
import { checkAdmin } from "@/utils/supabase/checkAdmin";

export async function PUT(request: Request) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const { supabase } = auth;

  try {
    const body = await request.json();
    const { phone, location, tiktok, hours } = body;

    // Validation
    if (!phone || typeof phone !== "string") return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
    if (!location || typeof location !== "string") return NextResponse.json({ error: "Invalid location" }, { status: 400 });
    if (!tiktok || typeof tiktok !== "string") return NextResponse.json({ error: "Invalid tiktok" }, { status: 400 });
    if (!Array.isArray(hours) || hours.length !== 7) return NextResponse.json({ error: "Invalid hours array" }, { status: 400 });

    for (const h of hours) {
      if (typeof h.day !== "string" || typeof h.open !== "string" || typeof h.close !== "string" || typeof h.isOpen !== "boolean") {
        return NextResponse.json({ error: "Invalid hours format" }, { status: 400 });
      }
    }

    const { data: row } = await supabase.from("info_config").select("id").limit(1).single();

    if (!row?.id) {
       const { error } = await supabase.from("info_config").insert([{
           phone, location, tiktok
       }]);
       if (error) throw error;
    } else {
       const { error } = await supabase
         .from("info_config")
         .update({
           phone,
           location,
           tiktok,
           updated_at: new Date().toISOString(),
         })
         .eq("id", row.id);
       if (error) throw error;
    }

    // Update operating hours
    for (const hour of hours) {
      await supabase
        .from("operating_hours")
        .update({
          open_time: hour.open,
          close_time: hour.close,
          is_open: hour.isOpen,
        })
        .eq("day", hour.day);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
