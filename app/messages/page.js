import { messages } from "@/lib/db";
import { deleteMessageAction } from "./actions";

export default function MessagesPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold">Pesan Masuk</h1>

      <div className="mt-8 space-y-4">
        {messages.length === 0 ? (
          <p className="text-muted-foreground">
            Belum ada pesan masuk.
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-lg border p-4"
            >
              <p className="font-medium">
                {msg.name} — {msg.email}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {msg.message}
              </p>

              <form
                action={deleteMessageAction}
                className="mt-4"
              >
                <input
                  type="hidden"
                  name="id"
                  value={msg.id}
                />

                <button
                  type="submit"
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Hapus
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </section>
  );
} 