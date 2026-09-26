"use client";

import { useState, useEffect } from "react";
import UserCard from "@/components/UserCard";

export default function UserDirectory() {
  // 1. Inisialisasi State
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State untuk kotak pencarian
  const [search, setSearch] = useState("");

  // 2. Fetch API Data Users
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 3. Tampilan Loading State
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading users...</p>
      </main>
    );
  }

  // 4. Tampilan Error State
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <h2 className="font-semibold text-red-700">Something went wrong</h2>
          <p className="mt-2 text-sm text-red-600">{error}</p>
        </div>
      </main>
    );
  }

  // 5. Buat Hasil Filter (Workflow Search Box)
  // Menghitung filteredUsers berdasarkan input search
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // 6. Tampilan Utama dengan Input Search shadcn/ui & Hasil Filter
  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">User Directory</h1>

        {/* Buat input search */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full rounded-lg border bg-white px-4 py-2"
        />

        {/* Tampilkan data yang sudah difilter atau pesan Tidak Ditemukan */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full">
              User tidak ditemukan.
            </p>
          )}
        </div>
      </div>
    </main>
  );
} 