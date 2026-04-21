"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Package,
  TrendingUp,
  AlertTriangle,
  Star,
  Upload,
  X,
  Loader2,
  LogOut,
} from "lucide-react";
import { Product, slugify, formatINR, formatEUR } from "@/lib/supabase";
import Image from "next/image";

const ADMIN_PW = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

const OCCASIONS = [
  "bridal",
  "wedding",
  "reception",
  "sangeet",
  "festival",
  "casual",
  "puja",
  "party",
];

const FABRICS = [
  "Katan Silk",
  "Organza",
  "Chanderi",
  "Patola Silk",
  "Velvet",
  "Georgette",
  "Chiffon",
  "Crepe",
  "Tussar Silk",
  "Banarasi Silk",
  "Raw Silk",
  "Net",
  "Other",
];

const emptyForm = {
  name: "",
  slug: "",
  category: "saree" as "saree" | "lehenga",
  fabric: "Katan Silk",
  occasion: [] as string[],
  price_inr: 0,
  price_eur: 0,
  images: [] as string[],
  reel_url: "",
  description: "",
  short_desc: "",
  colors: "",
  stock: 1,
  featured: false,
  new_arrival: false,
  published: true,
  tags: "",
  care: "Dry clean only.",
  weight: "",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<"all" | "saree" | "lehenga">("all");
  const [toast, setToast] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("/api/products", {
      headers: { "x-admin-key": ADMIN_PW },
    });
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    if (authed) fetchProducts();
  }, [authed]);

  const handleLogin = () => {
    if (pw === ADMIN_PW) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      slug: p.slug,
      category: p.category,
      fabric: p.fabric,
      occasion: p.occasion,
      price_inr: p.price_inr,
      price_eur: p.price_eur,
      images: p.images,
      reel_url: p.reel_url || "",
      description: p.description,
      short_desc: p.short_desc,
      colors: p.colors.join(", "),
      stock: p.stock,
      featured: p.featured,
      new_arrival: p.new_arrival,
      published: p.published,
      tags: p.tags.join(", "),
      care: p.care,
      weight: p.weight || "",
    });
    setShowForm(true);
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const urls: string[] = [];

    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        headers: { "x-admin-key": ADMIN_PW },
        body: fd,
      });

      const data = await res.json();
      if (data.url) urls.push(data.url);
    }

    set("images", [...form.images, ...urls]);
    setUploading(false);
    showToast(`${urls.length} image(s) uploaded`);
  };

  const removeImage = (idx: number) => {
    set(
      "images",
      form.images.filter((_, i) => i !== idx)
    );
  };

  const handleSave = async () => {
    if (!form.name || !form.description || form.price_inr < 1) {
      showToast("Name, description and price are required");
      return;
    }

    setSaving(true);

    const payload = {
      ...form,
      slug: form.slug || slugify(form.name),
      colors: form.colors
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      tags: form.tags
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      ...(editing ? { id: editing.id } : {}),
    };

    const res = await fetch("/api/products", {
      method: editing ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": ADMIN_PW,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.error) {
      showToast("Error: " + data.error);
      setSaving(false);
      return;
    }

    await fetchProducts();
    setShowForm(false);
    setSaving(false);
    showToast(editing ? "Product updated!" : "Product published to website!");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;

    await fetch("/api/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": ADMIN_PW,
      },
      body: JSON.stringify({ id }),
    });

    await fetchProducts();
    showToast("Product deleted");
  };

  const togglePublished = async (p: Product) => {
    await fetch("/api/products", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": ADMIN_PW,
      },
      body: JSON.stringify({ id: p.id, published: !p.published }),
    });

    await fetchProducts();
    showToast(
      p.published
        ? "Product hidden from website"
        : "Product now live on website"
    );
  };

  const filtered = products.filter(
    (p) => filter === "all" || p.category === filter
  );
  const totalValue = products.reduce((s, p) => s + p.price_inr * p.stock, 0);
  const lowStock = products.filter((p) => p.stock <= 2).length;

  if (!authed) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--burg-900, #3d0310)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 380,
            padding: "2.5rem",
            border: "1px solid rgba(200,146,26,0.2)",
            background: "rgba(82,5,21,0.6)",
          }}
        >
          <div className="text-center mb-8">
            <p
              style={{
                fontFamily: "var(--font-accent, 'Cinzel')",
                color: "#c8921a",
                letterSpacing: "0.3em",
                fontSize: "0.65rem",
                marginBottom: "0.5rem",
              }}
            >
              INVENTORY MANAGEMENT
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display, 'Cormorant Garamond')",
                color: "#f9edca",
                fontSize: "2rem",
                fontWeight: 300,
              }}
            >
              Admin Panel
            </h1>
            <p
              style={{
                color: "#9a6e0a",
                fontSize: "0.85rem",
                marginTop: "0.5rem",
                fontStyle: "italic",
              }}
            >
              Jindal Vastrakala · Chandni Chowk
            </p>
          </div>

          <input
            type="password"
            placeholder="Enter admin password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              setPwError(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            style={{
              marginBottom: "0.75rem",
              borderColor: pwError ? "#e24b4a" : undefined,
            }}
          />

          {pwError && (
            <p
              style={{
                color: "#f09595",
                fontSize: "0.8rem",
                marginBottom: "0.75rem",
              }}
            >
              Incorrect password
            </p>
          )}

          <button
            onClick={handleLogin}
            className="btn-gold w-full py-3 text-xs tracking-widest uppercase"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--burg-900, #3d0310)",
        padding: "2rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        {toast && (
          <div
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              background: "#c8921a",
              color: "#3d0310",
              padding: "0.75rem 1.5rem",
              fontFamily: "var(--font-accent)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              zIndex: 100,
            }}
          >
            {toast}
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-accent, 'Cinzel')",
                color: "#c8921a",
                letterSpacing: "0.3em",
                fontSize: "0.6rem",
                marginBottom: "0.25rem",
              }}
            >
              JINDAL VASTRAKALA
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display, 'Cormorant Garamond')",
                color: "#f9edca",
                fontSize: "2.2rem",
                fontWeight: 300,
              }}
            >
              Inventory Manager
            </h1>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <a
              href="/"
              target="_blank"
              style={{
                color: "#c8921a",
                fontSize: "0.75rem",
                fontFamily: "var(--font-accent)",
                letterSpacing: "0.1em",
              }}
            >
              VIEW SITE ↗
            </a>

            <button
              onClick={openNew}
              className="btn-gold px-6 py-3 text-xs tracking-widest uppercase flex items-center gap-2"
            >
              <Plus size={13} /> Add Product
            </button>

            <button
              onClick={() => setAuthed(false)}
              title="Logout"
              style={{ color: "#9a6e0a", padding: "0.5rem" }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          {[
            { icon: Package, label: "Total Products", value: products.length },
            {
              icon: TrendingUp,
              label: "Inventory Value",
              value: `₹${(totalValue / 100000).toFixed(1)}L`,
            },
            { icon: AlertTriangle, label: "Low Stock (≤2)", value: lowStock },
            {
              icon: Star,
              label: "Featured",
              value: products.filter((p) => p.featured).length,
            },
            {
              icon: Eye,
              label: "Live on Site",
              value: products.filter((p) => p.published).length,
            },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              style={{
                background: "rgba(82,5,21,0.5)",
                border: "1px solid rgba(200,146,26,0.15)",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "0.5rem",
                }}
              >
                <Icon size={13} style={{ color: "#c8921a" }} />
                <span
                  style={{
                    color: "#9a6e0a",
                    fontSize: "0.65rem",
                    fontFamily: "var(--font-accent)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#f9edca",
                  fontSize: "1.5rem",
                  fontWeight: 300,
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {lowStock > 0 && (
          <div
            style={{
              background: "rgba(155,20,40,0.15)",
              border: "1px solid rgba(200,80,80,0.3)",
              padding: "0.75rem 1rem",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <AlertTriangle size={15} style={{ color: "#f09595", flexShrink: 0 }} />
            <p style={{ color: "#f09595", fontSize: "0.8rem" }}>
              <strong>Low stock:</strong>{" "}
              {products
                .filter((p) => p.stock <= 2)
                .map((p) => `${p.name} (${p.stock} left)`)
                .join(" · ")}
            </p>
          </div>
        )}

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
          {(["all", "saree", "lehenga"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                padding: "0.4rem 1rem",
                textTransform: "uppercase",
                border: "1px solid",
                borderColor: filter === f ? "#c8921a" : "rgba(200,146,26,0.2)",
                color: filter === f ? "#f9edca" : "#9a6e0a",
                background:
                  filter === f ? "rgba(200,146,26,0.15)" : "transparent",
                transition: "all 0.2s",
              }}
            >
              {f === "all"
                ? `All (${products.length})`
                : f === "saree"
                ? `Sarees (${products.filter((p) => p.category === "saree").length})`
                : `Lehengas (${products.filter((p) => p.category === "lehenga").length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#9a6e0a" }}>
            <Loader2
              size={24}
              style={{ animation: "spin 1s linear infinite", margin: "0 auto" }}
            />
          </div>
        ) : (
          <div
            style={{
              overflowX: "auto",
              border: "1px solid rgba(200,146,26,0.15)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid rgba(200,146,26,0.15)",
                    background: "rgba(61,3,16,0.5)",
                  }}
                >
                  {["Product", "Category", "Price", "Stock", "Status", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          padding: "0.75rem 1rem",
                          textAlign: "left",
                          fontFamily: "var(--font-accent)",
                          fontSize: "0.6rem",
                          letterSpacing: "0.15em",
                          color: "#9a6e0a",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {filtered.map((p, i) => (
                  <tr
                    key={p.id}
                    style={{
                      borderBottom: "1px solid rgba(200,146,26,0.08)",
                      background:
                        i % 2 === 0 ? "transparent" : "rgba(61,3,16,0.2)",
                      transition: "background 0.15s",
                    }}
                  >
                    <td style={{ padding: "0.75rem 1rem" }}>
                      <div
                        style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
                      >
                        {p.images[0] && (
                          <div
                            style={{
                              width: 40,
                              height: 50,
                              position: "relative",
                              flexShrink: 0,
                              overflow: "hidden",
                            }}
                          >
                            <Image
                              src={p.images[0]}
                              alt={p.name}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        )}

                        <div>
                          <p
                            style={{
                              fontFamily: "var(--font-display)",
                              color: "#f9edca",
                              fontSize: "1rem",
                            }}
                          >
                            {p.name}
                          </p>
                          <p style={{ color: "#9a6e0a", fontSize: "0.7rem" }}>
                            {p.fabric}
                          </p>
                          {p.featured && (
                            <span
                              style={{
                                background: "rgba(200,146,26,0.15)",
                                color: "#c8921a",
                                fontSize: "0.6rem",
                                padding: "1px 6px",
                                fontFamily: "var(--font-accent)",
                                letterSpacing: "0.1em",
                              }}
                            >
                              FEATURED
                            </span>
                          )}
                          {p.new_arrival && (
                            <span
                              style={{
                                background: "rgba(29,158,117,0.15)",
                                color: "#5dcaa5",
                                fontSize: "0.6rem",
                                padding: "1px 6px",
                                fontFamily: "var(--font-accent)",
                                letterSpacing: "0.1em",
                                marginLeft: 4,
                              }}
                            >
                              NEW
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        color: "#9a6e0a",
                        fontSize: "0.8rem",
                        textTransform: "capitalize",
                        fontFamily: "var(--font-accent)",
                      }}
                    >
                      {p.category}
                    </td>

                    <td style={{ padding: "0.75rem 1rem" }}>
                      <p
                        style={{
                          color: "#c8921a",
                          fontFamily: "var(--font-display)",
                          fontSize: "1rem",
                        }}
                      >
                        {formatINR(p.price_inr)}
                      </p>
                      <p style={{ color: "#9a6e0a", fontSize: "0.75rem" }}>
                        {formatEUR(p.price_eur)}
                      </p>
                    </td>

                    <td style={{ padding: "0.75rem 1rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-accent)",
                          fontSize: "0.75rem",
                          padding: "2px 8px",
                          background:
                            p.stock <= 2
                              ? "rgba(155,20,40,0.2)"
                              : "rgba(29,158,117,0.1)",
                          color: p.stock <= 2 ? "#f09595" : "#5dcaa5",
                          border: `1px solid ${
                            p.stock <= 2
                              ? "rgba(200,80,80,0.3)"
                              : "rgba(29,158,117,0.3)"
                          }`,
                        }}
                      >
                        {p.stock} left
                      </span>
                    </td>

                    <td style={{ padding: "0.75rem 1rem" }}>
                      <button
                        onClick={() => togglePublished(p)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          color: p.published ? "#5dcaa5" : "#9a6e0a",
                          fontSize: "0.7rem",
                          fontFamily: "var(--font-accent)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {p.published ? <Eye size={13} /> : <EyeOff size={13} />}
                        {p.published ? "LIVE" : "HIDDEN"}
                      </button>
                    </td>

                    <td style={{ padding: "0.75rem 1rem" }}>
                      <div style={{ display: "flex", gap: "0.75rem" }}>
                        <button
                          onClick={() => openEdit(p)}
                          title="Edit"
                          style={{
                            color: "#c8921a",
                            transition: "opacity 0.2s",
                            cursor: "pointer",
                          }}
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          onClick={() => handleDelete(p.id)}
                          title="Delete"
                          style={{
                            color: "#9a6e0a",
                            transition: "opacity 0.2s",
                            cursor: "pointer",
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        padding: "3rem",
                        textAlign: "center",
                        color: "#9a6e0a",
                        fontStyle: "italic",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      No products yet. Click "Add Product" to publish your first
                      piece.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {showForm && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(61,3,16,0.9)",
              backdropFilter: "blur(4px)",
              zIndex: 50,
              overflowY: "auto",
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                maxWidth: "48rem",
                margin: "0 auto",
                background: "#520515",
                border: "1px solid rgba(200,146,26,0.25)",
                padding: "2.5rem",
                position: "relative",
              }}
            >
              <button
                onClick={() => setShowForm(false)}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  color: "#9a6e0a",
                }}
              >
                <X size={18} />
              </button>

              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#f9edca",
                  fontSize: "1.75rem",
                  fontWeight: 300,
                  marginBottom: "0.25rem",
                }}
              >
                {editing ? "Edit Product" : "Add New Product"}
              </h2>

              <p
                style={{
                  color: "#9a6e0a",
                  fontSize: "0.8rem",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                {editing
                  ? "Changes go live instantly after saving."
                  : "This product will appear on your website as soon as you publish."}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div style={{ gridColumn: "1/-1" }}>
                  <label
                    style={{
                      display: "block",
                      color: "#c8921a",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-accent)",
                      letterSpacing: "0.15em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    CATEGORY — Where should this appear on your website?
                  </label>

                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    {(["saree", "lehenga"] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => set("category", cat)}
                        style={{
                          flex: 1,
                          padding: "1rem",
                          border: "1px solid",
                          borderColor:
                            form.category === cat
                              ? "#c8921a"
                              : "rgba(200,146,26,0.2)",
                          background:
                            form.category === cat
                              ? "rgba(200,146,26,0.15)"
                              : "transparent",
                          color: form.category === cat ? "#f9edca" : "#9a6e0a",
                          fontFamily: "var(--font-accent)",
                          fontSize: "0.8rem",
                          letterSpacing: "0.15em",
                          textTransform: "capitalize",
                          transition: "all 0.2s",
                        }}
                      >
                        {cat === "saree" ? "🥻 Saree" : "👗 Lehenga"}
                        <br />
                        <span style={{ fontSize: "0.65rem", opacity: 0.7 }}>
                          {cat === "saree" ? "→ Sarees page" : "→ Lehengas page"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ gridColumn: "1/-1" }}>
                  <label
                    style={{
                      display: "block",
                      color: "#c8921a",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-accent)",
                      letterSpacing: "0.15em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    PRODUCT NAME *
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => {
                      set("name", e.target.value);
                      if (!editing) set("slug", slugify(e.target.value));
                    }}
                    placeholder="e.g. Katan Silk Banarasi Saree with Zari Border"
                  />
                </div>

                <div style={{ gridColumn: "1/-1" }}>
                  <label
                    style={{
                      display: "block",
                      color: "#c8921a",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-accent)",
                      letterSpacing: "0.15em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    ONE-LINE CAPTION (shown on product card)
                  </label>
                  <input
                    value={form.short_desc}
                    onChange={(e) => set("short_desc", e.target.value)}
                    placeholder="e.g. Pure Katan silk, handwoven Banarasi with real zari work"
                  />
                </div>

                <div style={{ gridColumn: "1/-1" }}>
                  <label
                    style={{
                      display: "block",
                      color: "#c8921a",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-accent)",
                      letterSpacing: "0.15em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    FULL DESCRIPTION / CAPTION *
                  </label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="Write the product story — fabric, craftsmanship, occasion, how it feels to wear it. This is your sales pitch."
                  />
                </div>

                <div style={{ gridColumn: "1/-1" }}>
                  <label
                    style={{
                      display: "block",
                      color: "#c8921a",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-accent)",
                      letterSpacing: "0.15em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    PRODUCT PHOTOS (upload from your phone or camera)
                  </label>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e.target.files)}
                    style={{ display: "none" }}
                  />

                  <button
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    style={{
                      width: "100%",
                      padding: "1.5rem",
                      border: "2px dashed rgba(200,146,26,0.3)",
                      color: "#9a6e0a",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.5rem",
                      cursor: uploading ? "wait" : "pointer",
                      background: "transparent",
                      transition: "opacity 0.2s",
                    }}
                  >
                    {uploading ? (
                      <Loader2
                        size={20}
                        style={{ animation: "spin 1s linear infinite" }}
                      />
                    ) : (
                      <Upload size={20} />
                    )}
                    <span
                      style={{
                        fontFamily: "var(--font-accent)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
                      }}
                    >
                      {uploading ? "UPLOADING..." : "TAP TO UPLOAD PHOTOS"}
                    </span>
                    <span style={{ fontSize: "0.7rem", fontStyle: "italic" }}>
                      Supports JPG, PNG, WEBP — multiple photos allowed
                    </span>
                  </button>

                  {form.images.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginTop: "0.75rem",
                        flexWrap: "wrap",
                      }}
                    >
                      {form.images.map((url, i) => (
                        <div
                          key={i}
                          style={{
                            position: "relative",
                            width: 72,
                            height: 90,
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={url}
                            alt={`Product ${i + 1}`}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                          <button
                            onClick={() => removeImage(i)}
                            style={{
                              position: "absolute",
                              top: 2,
                              right: 2,
                              background: "rgba(61,3,16,0.8)",
                              color: "#f09595",
                              borderRadius: "50%",
                              width: 18,
                              height: 18,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ gridColumn: "1/-1" }}>
                  <label
                    style={{
                      display: "block",
                      color: "#c8921a",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-accent)",
                      letterSpacing: "0.15em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    INSTAGRAM / TIKTOK REEL URL (optional — embeds on the product
                    page)
                  </label>
                  <input
                    value={form.reel_url}
                    onChange={(e) => set("reel_url", e.target.value)}
                    placeholder="https://www.instagram.com/reel/... or https://www.tiktok.com/@..."
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#c8921a",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-accent)",
                      letterSpacing: "0.15em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    PRICE (₹ INR) *
                  </label>
                  <input
                    type="number"
                    value={form.price_inr || ""}
                    onChange={(e) =>
                      set("price_inr", parseInt(e.target.value) || 0)
                    }
                    placeholder="18500"
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#c8921a",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-accent)",
                      letterSpacing: "0.15em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    PRICE (€ EUR)
                  </label>
                  <input
                    type="number"
                    value={form.price_eur || ""}
                    onChange={(e) =>
                      set("price_eur", parseInt(e.target.value) || 0)
                    }
                    placeholder="210"
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#c8921a",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-accent)",
                      letterSpacing: "0.15em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    UNITS AVAILABLE *
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.stock}
                    onChange={(e) => set("stock", parseInt(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#c8921a",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-accent)",
                      letterSpacing: "0.15em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    FABRIC
                  </label>
                  <select
                    value={form.fabric}
                    onChange={(e) => set("fabric", e.target.value)}
                  >
                    {FABRICS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ gridColumn: "1/-1" }}>
                  <label
                    style={{
                      display: "block",
                      color: "#c8921a",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-accent)",
                      letterSpacing: "0.15em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    AVAILABLE COLOURS (comma separated)
                  </label>
                  <input
                    value={form.colors}
                    onChange={(e) => set("colors", e.target.value)}
                    placeholder="Deep Crimson, Midnight Navy, Bottle Green"
                  />
                </div>

                <div style={{ gridColumn: "1/-1" }}>
                  <label
                    style={{
                      display: "block",
                      color: "#c8921a",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-accent)",
                      letterSpacing: "0.15em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    OCCASION
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {OCCASIONS.map((o) => (
                      <button
                        key={o}
                        onClick={() =>
                          set(
                            "occasion",
                            form.occasion.includes(o)
                              ? form.occasion.filter((x) => x !== o)
                              : [...form.occasion, o]
                          )
                        }
                        style={{
                          padding: "0.3rem 0.75rem",
                          fontSize: "0.7rem",
                          fontFamily: "var(--font-accent)",
                          letterSpacing: "0.1em",
                          textTransform: "capitalize",
                          border: "1px solid",
                          borderColor: form.occasion.includes(o)
                            ? "#c8921a"
                            : "rgba(200,146,26,0.2)",
                          color: form.occasion.includes(o) ? "#f9edca" : "#9a6e0a",
                          background: form.occasion.includes(o)
                            ? "rgba(200,146,26,0.15)"
                            : "transparent",
                          transition: "all 0.2s",
                        }}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    gridColumn: "1/-1",
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    { key: "featured", label: "⭐ Featured on homepage" },
                    { key: "new_arrival", label: "🆕 New arrival badge" },
                    { key: "published", label: "🌐 Live on website" },
                  ].map(({ key, label }) => (
                    <label
                      key={key}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={form[key as keyof typeof form] as boolean}
                        onChange={(e) => set(key, e.target.checked)}
                        style={{ width: "auto", accentColor: "#c8921a" }}
                      />
                      <span style={{ color: "#f9edca", fontSize: "0.8rem" }}>
                        {label}
                      </span>
                    </label>
                  ))}
                </div>

                <div style={{ gridColumn: "1/-1" }}>
                  <label
                    style={{
                      display: "block",
                      color: "#c8921a",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-accent)",
                      letterSpacing: "0.15em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    SEO TAGS (comma separated — helps Google find this product)
                  </label>
                  <input
                    value={form.tags}
                    onChange={(e) => set("tags", e.target.value)}
                    placeholder="banarasi saree, silk saree, bridal saree, handwoven saree online"
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#c8921a",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-accent)",
                      letterSpacing: "0.15em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    CARE INSTRUCTIONS
                  </label>
                  <input
                    value={form.care}
                    onChange={(e) => set("care", e.target.value)}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#c8921a",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-accent)",
                      letterSpacing: "0.15em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    WEIGHT (for shipping)
                  </label>
                  <input
                    value={form.weight}
                    onChange={(e) => set("weight", e.target.value)}
                    placeholder="e.g. 600g"
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  marginTop: "2rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid rgba(200,146,26,0.15)",
                }}
              >
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-gold px-10 py-4 text-xs tracking-widest uppercase flex items-center gap-2"
                >
                  {saving && (
                    <Loader2
                      size={13}
                      style={{ animation: "spin 1s linear infinite" }}
                    />
                  )}
                  {saving
                    ? "Publishing..."
                    : editing
                    ? "Save Changes"
                    : "Publish to Website"}
                </button>

                <button
                  onClick={() => setShowForm(false)}
                  className="btn-outline-gold px-8 py-4 text-xs tracking-widest uppercase"
                >
                  Cancel
                </button>
              </div>

              <p
                style={{
                  color: "#9a6e0a",
                  fontSize: "0.7rem",
                  marginTop: "1rem",
                  fontStyle: "italic",
                }}
              >
                {editing
                  ? "Product updates appear on the website immediately."
                  : "Once published, this product appears live on your website instantly — no code changes needed."}
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}