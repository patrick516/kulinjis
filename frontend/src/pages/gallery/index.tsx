import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { useAuth } from "@/state/AuthContext";
import {
  Images,
  Plus,
  Tag,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  X,
  FolderOpen,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

interface Category {
  _id: string;
  key: string;
  name: string;
  description?: string;
  isActive: boolean;
}

interface GalleryItem {
  _id: string;
  title?: string;
  caption?: string;
  alt?: string;
  imageUrl: string;
  isPublished: boolean;
  category: Category | string;
}

export function GalleryPage() {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"items" | "categories">("items");
  const [filterCat, setFilterCat] = useState<string>("all");
  const [preview, setPreview] = useState<string | null>(null);

  // Category form
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryKey, setNewCategoryKey] = useState("");

  // Item form
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemFile, setNewItemFile] = useState<File | null>(null);
  const [newItemCaption, setNewItemCaption] = useState("");
  const [newItemCategoryId, setNewItemCategoryId] = useState("");
  const [showAddItem, setShowAddItem] = useState(false);

  const activeCategories = useMemo(
    () => categories.filter((c) => c.isActive),
    [categories],
  );

  const filteredItems = useMemo(() => {
    if (filterCat === "all") return items;
    return items.filter((item) => {
      const cat =
        typeof item.category === "string" ? item.category : item.category._id;
      return cat === filterCat;
    });
  }, [items, filterCat]);

  const flash = (msg: string, type: "success" | "error") => {
    if (type === "success") {
      setSuccess(msg);
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(msg);
      setTimeout(() => setError(null), 4000);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [catRes, itemRes] = await Promise.all([
        fetch(`${API_BASE}/api/gallery/categories`),
        fetch(`${API_BASE}/api/gallery/items?limit=200`),
      ]);
      const catJson = await catRes.json();
      const itemJson = await itemRes.json();
      if (!catJson.success)
        throw new Error(catJson.message ?? "Failed to load categories");
      if (!itemJson.success)
        throw new Error(itemJson.message ?? "Failed to load items");
      setCategories(catJson.data);
      setItems(itemJson.data);
    } catch (err) {
      flash(
        err instanceof Error ? err.message : "Failed to load data",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const handleCreateCategory = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/gallery/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: newCategoryKey || newCategoryName,
          name: newCategoryName,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setCategories((prev) => [...prev, json.data]);
      setNewCategoryName("");
      setNewCategoryKey("");
      flash("Category created", "success");
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed", "error");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!token || !confirm("Delete this category?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/gallery/categories/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setCategories((prev) => prev.filter((c) => c._id !== id));
      flash("Category deleted", "success");
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed", "error");
    }
  };

  const handleCreateItem = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !newItemFile) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", newItemFile);
      const uploadRes = await fetch(`${API_BASE}/api/gallery/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const uploadJson = await uploadRes.json();
      if (!uploadJson.success || !uploadJson.url)
        throw new Error(uploadJson.message ?? "Upload failed");

      const res = await fetch(`${API_BASE}/api/gallery/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          categoryId: newItemCategoryId,
          title: newItemTitle,
          caption: newItemCaption,
          imageUrl: uploadJson.url,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setItems((prev) => [json.data, ...prev]);
      setNewItemTitle("");
      setNewItemCaption("");
      setNewItemFile(null);
      setPreview(null);
      setShowAddItem(false);
      flash("Image uploaded and published to website", "success");
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleTogglePublish = async (item: GalleryItem) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/gallery/items/${item._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPublished: !item.isPublished }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setItems((prev) =>
        prev.map((i) =>
          i._id === item._id ? { ...i, isPublished: !i.isPublished } : i,
        ),
      );
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed", "error");
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!token || !confirm("Delete this image?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/gallery/items/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setItems((prev) => prev.filter((i) => i._id !== id));
      flash("Image deleted", "success");
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed", "error");
    }
  };

  const getCat = (item: GalleryItem) =>
    typeof item.category === "string"
      ? categories.find((c) => c._id === item.category)
      : item.category;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Images className="w-5 h-5 text-emerald-600" /> Gallery
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Images uploaded here appear live on the clan website by category.
          </p>
        </div>
        <button
          onClick={() => setShowAddItem(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Upload Image
        </button>
      </div>

      {/* Flash messages */}
      {success && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {success}
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {(["items", "categories"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab === "items"
              ? `Images (${items.length})`
              : `Categories (${categories.length})`}
          </button>
        ))}
      </div>

      {/* ITEMS TAB */}
      {activeTab === "items" && (
        <div className="space-y-4">
          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterCat("all")}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                filterCat === "all"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300"
              }`}
            >
              All ({items.length})
            </button>
            {activeCategories.map((cat) => {
              const count = items.filter((i) => {
                const c =
                  typeof i.category === "string" ? i.category : i.category._id;
                return c === cat._id;
              }).length;
              return (
                <button
                  key={cat._id}
                  onClick={() => setFilterCat(cat._id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                    filterCat === cat._id
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-slate-100 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <FolderOpen className="w-12 h-12 mb-3 opacity-40" />
              <p className="text-sm font-medium">No images yet</p>
              <p className="text-xs mt-1">
                Upload your first image using the button above
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => {
                const cat = getCat(item);
                return (
                  <div
                    key={item._id}
                    className="group relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="aspect-square overflow-hidden bg-slate-100">
                      <img
                        src={item.imageUrl}
                        alt={item.alt ?? item.title ?? ""}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Overlay actions */}
                    <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => handleTogglePublish(item)}
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow hover:bg-slate-50 transition"
                        title={item.isPublished ? "Unpublish" : "Publish"}
                      >
                        {item.isPublished ? (
                          <Eye className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item._id)}
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow hover:bg-red-50 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    </div>

                    {/* Info bar */}
                    <div className="p-2 border-t border-slate-100">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-medium text-slate-700 truncate">
                          {item.title || item.caption || "Untitled"}
                        </p>
                        {!item.isPublished && (
                          <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full flex-shrink-0">
                            Hidden
                          </span>
                        )}
                      </div>
                      {cat && (
                        <span className="text-[10px] text-emerald-600 font-medium">
                          {cat.name}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* CATEGORIES TAB */}
      {activeTab === "categories" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Existing categories */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-600" /> Existing Categories
            </h3>
            {categories.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                No categories yet
              </p>
            ) : (
              <div className="space-y-2">
                {categories.map((cat) => {
                  const count = items.filter((i) => {
                    const c =
                      typeof i.category === "string"
                        ? i.category
                        : i.category._id;
                    return c === cat._id;
                  }).length;
                  return (
                    <div
                      key={cat._id}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-slate-100 bg-slate-50 group"
                    >
                      <div>
                        <div className="text-sm font-medium text-slate-800">
                          {cat.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {cat.key} · {count} image{count !== 1 ? "s" : ""}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!cat.isActive && (
                          <span className="text-[10px] bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full">
                            Inactive
                          </span>
                        )}
                        <button
                          onClick={() => handleDeleteCategory(cat._id)}
                          className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition"
                        >
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Add category form */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-600" /> New Category
            </h3>
            <form onSubmit={handleCreateCategory} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Category name *
                </label>
                <input
                  type="text"
                  required
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Family Portraits"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Slug key{" "}
                  <span className="text-slate-400">
                    (auto-generated if empty)
                  </span>
                </label>
                <input
                  type="text"
                  value={newCategoryKey}
                  onChange={(e) => setNewCategoryKey(e.target.value)}
                  placeholder="e.g. family-portraits"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition"
              >
                Create Category
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showAddItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <Upload className="w-4 h-4 text-emerald-600" /> Upload Image
              </h2>
              <button
                onClick={() => {
                  setShowAddItem(false);
                  setPreview(null);
                }}
              >
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="p-5 space-y-4">
              {/* File drop area */}
              <div
                className="relative border-2 border-dashed border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:border-emerald-400 transition"
                onClick={() => document.getElementById("file-input")?.click()}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="h-48 flex flex-col items-center justify-center text-slate-400">
                    <Upload className="w-8 h-8 mb-2 opacity-40" />
                    <p className="text-sm">Click to select image</p>
                    <p className="text-xs mt-1">JPG, PNG, WEBP up to 10MB</p>
                  </div>
                )}
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  required
                  className="hidden"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0] ?? null;
                    setNewItemFile(file);
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Category *
                </label>
                <select
                  required
                  value={newItemCategoryId}
                  onChange={(e) => setNewItemCategoryId(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <option value="">Select a category…</option>
                  {activeCategories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  placeholder="e.g. The Kulinji Family, 1990"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Caption
                </label>
                <input
                  type="text"
                  value={newItemCaption}
                  onChange={(e) => setNewItemCaption(e.target.value)}
                  placeholder="Short description shown on the website"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddItem(false);
                    setPreview(null);
                  }}
                  className="flex-1 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !newItemFile}
                  className="flex-1 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-60 transition flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading…
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" /> Upload
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
