import { supabase } from "@/lib/supabase";

export async function GET() {
  console.log(
    "SUPABASE URL:",
    process.env.NEXT_PUBLIC_SUPABASE_URL
  );

  const { data, error } = await supabase
    .from("favorites")
    .select("*");

  if (error) {
    console.log("SUPABASE ERROR:", error);

    return Response.json(
      {
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      },
      { status: 500 }
    );
  }

  return Response.json(data);
} 