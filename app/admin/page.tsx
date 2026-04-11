"use client";
import { useState } from "react";
import { products as initialProducts } from "@/lib/products";
import { Product } from "@/lib/types";
import { Plus, Pencil, Trash2, Package, TrendingUp, AlertTriangle } from "lucide-react";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "", slug: "", category: "saree" as Product["category"],
    fabric: "", priceINR: 0, priceEUR: 0, stock: 1,
    description: "", featured: false,
    images: "", colors: "", occasion: "", tags: "",
  });

  const handleLogin = () => {
    // NOTE: Replace with real auth — this is intentionally simple for MVP
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123")) {
      setAuthed(true);
    } else {
      alert("Incorrect password");
    }
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name, slug: p.slug, category: p.category,
      fabric: p.fabric, priceINR: p.priceINR, priceEUR: p.priceEUR,
      stock: p.stock, description: p.description, featured: p.featured,
      images: p.images.join("\n"), colors: p.colors.join(", "),
      occasion: p.occasion.join(", "), tags: p.tags.join(", "),
    });
    setShowForm(true);
  };

  const handleSave = () => {
    const updated: Product = {
      id: editing?.id || `p${Date.now()}`,
      name: form.name, slug: form.slug, category: form.category,
      fabric: form.fabric, priceINR: +form.priceINR, priceEUR: +form.priceEUR,
      stock: +form.stock, description: form.description, featured: form.featured,
      images: form.images.split("\n").filter(Boolean),
      colors: form.colors.split(",").map((s) => s.trim()),
      occasion: form.occasion.split(",").map((s) => s.trim()),
      tags: form.tags.split(",").map((s) => s.trim()),
      createdAt: editing?.createdAt || new Date().toISOString().split("T")[0],
    };
    if (editing) {
      setItems(items.map((p) => (p.id === editing.id ? updated : p)));
    } else {
      setItems([...items, updated]);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this product?")) setItems(items.filter((p) => p.id !== id));
  };

  const lowStock = items.filter((p) => p.stock <= 2);
  const totalValue = items.reduce((s, p) => s + p.priceINR * p.stock, 0);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm border border-gold-800/30 p-8">
          <p className="font-accent text-gold-400 tracking-widest text-xs uppercase text-center mb-6">
            Admin Access
          </p>
          <h1 className="font-display text-gold-100 text-3xl font-light text-center mb-8">
            Inventory Panel
          </h1>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="mb-4"
          />
          <button onClick={handleLogin} className="btn-gold w-full py-3 text-xs tracking-widest uppercase">
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="font-accent text-gold-500 tracking-[0.3em] text-xs uppercase mb-1">Jindal Vastrakala</p>
          <h1 className="font-display text-gold-100 text-4xl font-light">Inventory Management</h1>
        </div>
        <button
          onClick={() => { setEditing(null); setForm({ name:"",slug:"",category:"saree",fabric:"",priceINR:0,priceEUR:0,stock:1,description:"",featured:false,images:"",colors:"",occasion:"",tags:"" }); setShowForm(true); }}
          className="btn-gold px-6 py-3 text-xs tracking-widest uppercase flex items-center gap-2"
        >
          <Plus size={14} /> Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: Package, label: "Total Products", value: items.length },
          { icon: TrendingUp, label: "Inventory Value", value: `₹${(totalValue/100000).toFixed(1)}L` },
          { icon: AlertTriangle, label: "Low Stock", value: lowStock.length },
          { icon: Package, label: "Featured", value: items.filter(p => p.featured).length },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="border border-gold-800/30 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Icon size={14} className="text-gold-500" />
              <span className="font-accent text-gold-600 text-xs tracking-wider uppercase">{label}</span>
            </div>
            <p className="font-display text-gold-200 text-2xl">{value}</p>
          </div>
        ))}
      </div>

      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div className="border border-crimson-700/40 bg-crimson-900/10 p-4 mb-8 flex items-start gap-3">
          <AlertTriangle size={16} className="text-crimson-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-crimson-300 font-accent text-xs tracking-wider uppercase mb-1">Low Stock Alert</p>
            <p className="text-crimson-400 text-sm">
              {lowStock.map(p => `${p.name} (${p.stock} left)`).join(" · ")}
            </p>
          </div>
        </div>
      )}

      {/* Products table */}
      <div className="border border-gold-800/30 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold-800/30">
              {["Product", "Category", "Fabric", "Price (INR)", "Price (EUR)", "Stock", "Featured", "Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3 font-accent text-gold-600 text-xs tracking-wider uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-b border-gold-800/20 hover:bg-ink-800/50 transition-colors">
                <td className="px-4 py-3 font-display text-gold-200 text-base">{p.name}</td>
                <td className="px-4 py-3 text-gold-500 capitalize font-accent text-xs">{p.category}</td>
                <td className="px-4 py-3 text-gold-500 text-xs">{p.fabric}</td>
                <td className="px-4 py-3 text-gold-300 font-display">₹{p.priceINR.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-gold-400 font-display">€{p.priceEUR}</td>
                <td className="px-4 py-3">
                  <span className={`font-accent text-xs px-2 py-1 ${p.stock <= 2 ? "stock-low" : "text-gold-400"}`}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`w-2 h-2 rounded-full inline-block ${p.featured ? "bg-gold-400" : "bg-gold-800"}`} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button onClick={() => openEdit(p)} className="text-gold-600 hover:text-gold-300 transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-gold-700 hover:text-crimson-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-ink-900/80 z-50 flex items-center justify-center p-6 overflow-y-auto">
          <div className="bg-ink-800 border border-gold-800/30 w-full max-w-2xl p-8 my-8">
            <h2 className="font-display text-gold-100 text-2xl font-light mb-6">
              {editing ? "Edit Product" : "Add New Product"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Product name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input placeholder="Slug (e.g. katan-silk-saree)" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} />
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value as Product["category"]})}>
                <option value="saree">Saree</option>
                <option value="lehenga">Lehenga</option>
                <option value="suit">Suit</option>
              </select>
              <input placeholder="Fabric" value={form.fabric} onChange={e => setForm({...form, fabric: e.target.value})} />
              <input type="number" placeholder="Price INR" value={form.priceINR} onChange={e => setForm({...form, priceINR: +e.target.value})} />
              <input type="number" placeholder="Price EUR" value={form.priceEUR} onChange={e => setForm({...form, priceEUR: +e.target.value})} />
              <input type="number" placeholder="Stock quantity" value={form.stock} onChange={e => setForm({...form, stock: +e.target.value})} />
              <input placeholder="Colors (comma separated)" value={form.colors} onChange={e => setForm({...form, colors: e.target.value})} />
              <input placeholder="Occasions (comma separated)" value={form.occasion} onChange={e => setForm({...form, occasion: e.target.value})} />
              <input placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} />
              <div className="md:col-span-2">
                <textarea placeholder="Image URLs (one per line)" rows={3} value={form.images} onChange={e => setForm({...form, images: e.target.value})} />
              </div>
              <div className="md:col-span-2">
                <textarea placeholder="Description" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="w-auto" />
                <label htmlFor="featured" className="text-gold-400 text-sm font-accent tracking-wide">Featured product</label>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={handleSave} className="btn-gold px-8 py-3 text-xs tracking-widest uppercase">
                Save Product
              </button>
              <button onClick={() => setShowForm(false)} className="btn-outline-gold px-8 py-3 text-xs tracking-widest uppercase">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
