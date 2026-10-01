import { removeFavorite } from "@/lib/services/favoriteService"; 

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

  const numId = Number(id);

  const result = removeFavorite(numId);

  if (!result.success) {
    return Response.json(
      { error: result.error },
      { status: result.status }
    );
  }

  return Response.json({
    message: "Berhasil dihapus",
  });
} 