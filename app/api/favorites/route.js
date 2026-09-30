import { favorites } from "@/lib/db";

export async function GET() {
  return Response.json(favorites);
}

export async function POST(request) {
  let body;

  // Menangani request tanpa JSON / body yang benar
  try {
    body = await request.json();
  } catch (error) {
    return Response.json(
      {
        error: "Body request wajib diisi dalam format JSON",
      },
      {
        status: 400,
      }
    );
  }

  if (!body || Object.keys(body).length === 0) {
    return Response.json(
      {
        error: "Body request tidak boleh kosong",
      },
      {
        status: 400,
      }
    );
  }

  const requiredFields = ["id", "name", "email"];

  const missingFields = requiredFields.filter((field) => {
    return (
      body[field] === undefined ||
      body[field] === null ||
      body[field] === ""
    );
  });

  if (missingFields.length > 0) {
    return Response.json(
      {
        error: `Field ${missingFields.join(", ")} wajib diisi`,
      },
      {
        status: 400,
      }
    );
  }

  const alreadyExists = favorites.some(
    (favorite) => String(favorite.id) === String(body.id)
  );

  if (alreadyExists) {
    return Response.json(
      {
        error: "User ini sudah difavoritkan",
      },
      {
        status: 400,
      }
    );
  }

  // Masukkan data ke array
  favorites.push(body);

  return Response.json(body, {
    status: 201,
  });
} 