"use client";

import Link from "next/link";

import UserCard from "@/components/UserCard";
import { useFavorite } from "@/context/FavoriteContext";

export default function FavoritesPage() {
  const { favorites } = useFavorite();

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold text-primary">
            Your Collection
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            Favorite Users
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Users you have added to your favorites.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-white p-10 text-center">
            <div className="text-4xl">
              ♡
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              No favorite users yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              You haven't added any users to your favorites.
              Go to the User Directory and add some users first.
            </p>

            <Link
              href="/users"
              className="mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Browse Users
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {favorites.length}{" "}
                {favorites.length === 1
                  ? "user"
                  : "users"}{" "}
                in your favorites
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {favorites.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
} 