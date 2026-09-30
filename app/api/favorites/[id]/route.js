import { favorites } from "@/lib/db";

// ========================================
// PATCH
// ========================================

export async function PATCH(request, { params }) {
  const { id } = await params;

  const body = await request.json();

  const index = favorites.findIndex(
    (favorite) => String(favorite.id) === String(id)
  );

  if (index === -1) {
    return Response.json(
      { error: "Data tidak ditemukan" },
      { status: 404 }
    );
  }

  favorites[index] = {
    ...favorites[index],
    ...body,
  };

  return Response.json(favorites[index]);
} 

// ========================================
// DELETE
// ========================================

export async function DELETE(request, { params }) {
  const { id } = await params;

  const index = favorites.findIndex(
    (favorite) => favorite.id === Number(id)
  );

  if (index === -1) {
    return Response.json(
      { error: "Data tidak ditemukan" },
      { status: 404 }
    );
  }

  const deleted = favorites.splice(index, 1);

  return Response.json(deleted[0]);
} 