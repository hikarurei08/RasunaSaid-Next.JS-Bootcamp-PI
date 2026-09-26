"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useFavorite } from "@/context/FavoriteContext";

export default function UserCard({ user }) {
  const { toggleFavorite, isFavorite } = useFavorite();

  const favorite = isFavorite(user.id);

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-lg">
          {user.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-sm text-gray-600">
          ✉️ {user.email}
        </p>

        <p className="text-sm text-gray-500">
          🏢 {user.company.name}
        </p>

        <div className="flex gap-2 pt-2">
          {/* View Profile */}
          <Button
            variant="outline"
            className="flex-1"
          >
            View Profile
          </Button>

          {/* Favorite */}
          <Button
            onClick={() => toggleFavorite(user)}
            variant={favorite ? "destructive" : "default"}
            className="flex-1"
          >
            {favorite
              ? "❤️ Remove"
              : "♡ Add Favorite"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 