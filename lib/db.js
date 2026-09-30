// "Database" sementara - array di memori server
// Data tetap dipertahankan selama server development masih berjalan

const globalForFavorites = globalThis;

// Penyimpanan favorites
if (!globalForFavorites.favorites) {
  globalForFavorites.favorites = [];
}

export const favorites = globalForFavorites.favorites;

// Penyimpanan messages/contact
if (!globalForFavorites.messages) {
  globalForFavorites.messages = [];
}

export const messages = globalForFavorites.messages; 