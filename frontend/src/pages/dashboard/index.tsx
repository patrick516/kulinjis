import { useEffect, useState } from "react";
import { useAuth } from "@/state/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

interface SummaryData {
  categoryCount: number;
  itemCount: number;
  messageCount: number;
  newMessageCount: number;
  adminCount: number;
}

export function DashboardPage() {
  const { token } = useAuth();
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE}/api/admin/summary`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = (await res.json()) as {
          success: boolean;
          data?: SummaryData;
          message?: string;
        };
        if (!res.ok || !json.success || !json.data) {
          throw new Error(json.message ?? "Failed to load dashboard data");
        }
        setSummary(json.data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load dashboard data",
        );
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [token]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-600">
          Overview of your Kulinjis clan content and activity.
        </p>
      </div>

      {error && (
        <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Gallery categories"
          value={summary?.categoryCount ?? 0}
          loading={loading}
        />
        <DashboardCard
          title="Gallery items"
          value={summary?.itemCount ?? 0}
          loading={loading}
        />
        <DashboardCard
          title="Messages (new)"
          value={summary?.newMessageCount ?? 0}
          hint={
            summary
              ? `${summary.messageCount} total`
              : undefined
          }
          loading={loading}
        />
        <DashboardCard
          title="Admin users"
          value={summary?.adminCount ?? 0}
          loading={loading}
        />
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  hint,
  loading,
}: {
  title: string;
  value: number;
  hint?: string;
  loading: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="text-xs font-medium text-slate-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">
        {loading ? "…" : value}
      </div>
      {hint && (
        <div className="mt-1 text-[11px] text-slate-400">
          {loading ? "" : hint}
        </div>
      )}
    </div>
  );
}


