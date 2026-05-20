import { NextResponse } from "next/server";
import { checkAdmin } from "@/utils/supabase/checkAdmin";

export async function PUT(request: Request) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const { supabase } = auth;

  try {
    const body = await request.json();
    const { mainTitle, arabicSubtitle, tagline, status, heroImageUrl, signatureTitle, signatureDescription, menuTitle, menuDescription } = body;

    // Validation
    if (!mainTitle || typeof mainTitle !== "string") return NextResponse.json({ error: "Invalid mainTitle" }, { status: 400 });
    if (!arabicSubtitle || typeof arabicSubtitle !== "string") return NextResponse.json({ error: "Invalid arabicSubtitle" }, { status: 400 });
    if (!tagline || typeof tagline !== "string") return NextResponse.json({ error: "Invalid tagline" }, { status: 400 });
    if (status !== "open" && status !== "soon") return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    // We allow empty strings for the signature/menu fields to hide them, so we just check if they are strings (or undefined, but let's cast them to strings if they are missing or let the DB default handle it, actually let's ensure they are strings or empty)
    if (signatureTitle !== undefined && typeof signatureTitle !== "string") return NextResponse.json({ error: "Invalid signatureTitle" }, { status: 400 });
    if (signatureDescription !== undefined && typeof signatureDescription !== "string") return NextResponse.json({ error: "Invalid signatureDescription" }, { status: 400 });
    if (menuTitle !== undefined && typeof menuTitle !== "string") return NextResponse.json({ error: "Invalid menuTitle" }, { status: 400 });
    if (menuDescription !== undefined && typeof menuDescription !== "string") return NextResponse.json({ error: "Invalid menuDescription" }, { status: 400 });
    if (heroImageUrl !== undefined && typeof heroImageUrl !== "string") return NextResponse.json({ error: "Invalid heroImageUrl" }, { status: 400 });

    const { data: row } = await supabase.from("site_config").select("id").limit(1).single();

    if (!row?.id) {
       const { error } = await supabase.from("site_config").insert([{
           main_title: mainTitle,
           arabic_subtitle: arabicSubtitle,
           tagline: tagline,
           status: status,
           hero_image_url: heroImageUrl || "",
           signature_title: signatureTitle || "",
           signature_description: signatureDescription || "",
           menu_title: menuTitle || "",
           menu_description: menuDescription || "",
       }]);
       if (error) throw error;
       return NextResponse.json({ success: true });
    }

    const { error } = await supabase
      .from("site_config")
      .update({
        main_title: mainTitle,
        arabic_subtitle: arabicSubtitle,
        tagline: tagline,
        status: status,
        hero_image_url: heroImageUrl || "",
        signature_title: signatureTitle || "",
        signature_description: signatureDescription || "",
        menu_title: menuTitle || "",
        menu_description: menuDescription || "",
        updated_at: new Date().toISOString(),
      })
      .eq("id", row.id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
