import { NextResponse } from "next/server";
import { checkAdmin } from "@/utils/supabase/checkAdmin";

export async function POST(request: Request) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const { supabase } = auth;

  try {
    const body = await request.json();
    const { name, description, price, image, category } = body;

    // Validation
    if (!name || typeof name !== "string") return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    if (!description || typeof description !== "string") return NextResponse.json({ error: "Invalid description" }, { status: 400 });
    if (typeof price !== "number" || price < 0) return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    if (!image || typeof image !== "string") return NextResponse.json({ error: "Invalid image" }, { status: 400 });
    if (category !== "HOT DRINKS" && category !== "COLD DRINKS") return NextResponse.json({ error: "Invalid category" }, { status: 400 });

    const { data, error } = await supabase.from("menu_items").insert([{ name, description, price, image, category }]).select().single();

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const { supabase } = auth;

  try {
    const body = await request.json();
    const { id, name, description, price, image, category } = body;

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    
    // Partial updates allowed, sanitize what's provided
    const updates: any = {};
    if (name !== undefined) updates.name = String(name);
    if (description !== undefined) updates.description = String(description);
    if (price !== undefined) updates.price = Number(price);
    if (image !== undefined) updates.image = String(image);
    if (category !== undefined) {
      if (category !== "HOT DRINKS" && category !== "COLD DRINKS") return NextResponse.json({ error: "Invalid category" }, { status: 400 });
      updates.category = category;
    }

    const { data, error } = await supabase.from("menu_items").update(updates).eq("id", id).select().single();

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

    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
