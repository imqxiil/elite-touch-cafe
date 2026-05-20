import { NextResponse } from "next/server";
import { checkAdmin } from "@/utils/supabase/checkAdmin";

export async function POST(request: Request) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const { supabase } = auth;

  try {
    const body = await request.json();
    const { src, alt } = body;

    if (!src || typeof src !== "string") return NextResponse.json({ error: "Invalid src URL" }, { status: 400 });
    if (!alt || typeof alt !== "string") return NextResponse.json({ error: "Invalid alt text" }, { status: 400 });

    const { data, error } = await supabase.from("gallery_images").insert([{ src, alt }]).select().single();

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const { supabase } = auth;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const { error } = await supabase.from("gallery_images").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
