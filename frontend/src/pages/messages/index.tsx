import { useEffect, useState, FormEvent } from "react";
import { useAuth } from "@/state/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  body: string;
  status: "new" | "replied";
  replyText?: string;
  createdAt: string;
  repliedAt?: string;
}

export function MessagesPage() {
  const { token } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    if (!token) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/api/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = (await res.json()) as {
        success: boolean;
        data: Message[];
        message?: string;
      };
      if (!res.ok || !json.success) {
        throw new Error(json.message ?? "Failed to load messages");
      }
      setMessages(json.data);
      if (!selected && json.data.length > 0) {
        setSelected(json.data[0]);
        setReplyText(json.data[0].replyText ?? "");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load messages",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleSelect = (msg: Message) => {
    setSelected(msg);
    setReplyText(msg.replyText ?? "");
  };

  const handleReply = async (event: FormEvent) => {
    event.preventDefault();
    if (!token || !selected) return;
    try {
      setError(null);
      const res = await fetch(
        `${API_BASE}/api/messages/${selected._id}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ replyText }),
        },
      );
      const json = (await res.json()) as {
        success: boolean;
        data?: Message;
        message?: string;
      };
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.message ?? "Failed to send reply");
      }
      setSelected(json.data);
      setMessages((prev) =>
        prev.map((m) => (m._id === json.data!._id ? json.data! : m)),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send reply email",
      );
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Messages</h1>
        <p className="text-sm text-slate-600">
          View and reply to messages sent from the public website contact
          section.
        </p>
      </div>

      {error && (
        <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Message list */}
        <div className="lg:col-span-1 rounded-lg border border-slate-200 bg-white max-h-[480px] overflow-auto">
          <div className="border-b border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 flex items-center justify-between">
            <span>Inbox</span>
            {loading && (
              <button
                type="button"
                disabled
                className="text-[10px] text-slate-400"
              >
                Loading…
              </button>
            )}
            {!loading && (
              <button
                type="button"
                onClick={() => void fetchMessages()}
                className="text-[10px] text-emerald-600 hover:text-emerald-500"
              >
                Refresh
              </button>
            )}
          </div>
          {messages.length === 0 && !loading && (
            <p className="px-3 py-2 text-xs text-slate-500">
              No messages yet.
            </p>
          )}
          <ul className="divide-y divide-slate-100 text-sm">
            {messages.map((msg) => {
              const isActive = selected?._id === msg._id;
              return (
                <li
                  key={msg._id}
                  className={[
                    "cursor-pointer px-3 py-2",
                    isActive ? "bg-emerald-50" : "hover:bg-slate-50",
                  ].join(" ")}
                  onClick={() => handleSelect(msg)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900 truncate">
                      {msg.name}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-2">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {msg.subject || msg.body}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-400">
                    {msg.email} ·{" "}
                    {msg.status === "replied" ? "Replied" : "New message"}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Message detail + reply */}
        <div className="lg:col-span-2 rounded-lg border border-slate-200 bg-white p-4 space-y-3">
          {!selected && (
            <p className="text-sm text-slate-500">
              Select a message from the left to view and reply.
            </p>
          )}

          {selected && (
            <>
              <div className="space-y-1 text-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">
                      {selected.subject || "No subject"}
                    </div>
                    <div className="text-xs text-slate-500">
                      From {selected.name} &lt;{selected.email}&gt;
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 text-right">
                    <div>
                      Sent:{" "}
                      {new Date(selected.createdAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                    {selected.repliedAt && (
                      <div>
                        Replied:{" "}
                        {new Date(selected.repliedAt).toLocaleString(
                          undefined,
                          {
                            dateStyle: "medium",
                            timeStyle: "short",
                          },
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 whitespace-pre-wrap">
                  {selected.body}
                </div>
              </div>

              <form onSubmit={handleReply} className="space-y-2 text-sm">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Your reply (sent to {selected.email})
                </label>
                <textarea
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={5}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="Write your response here…"
                />
                <button
                  type="submit"
                  disabled={loading || !token}
                  className="rounded-md bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-60"
                >
                  Send reply email
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

