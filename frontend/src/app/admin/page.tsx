"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getProducts, Product, mockProducts } from "@/lib/api";

interface Order {
  id: string;
  email: string;
  total: number;
  status: "Pending" | "Shipped" | "Cancelled";
  date: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<"products" | "orders" | "coupons">("products");

  // New product form states
  const [newName, setNewName] = useState("");
  const [newInspired, setNewInspired] = useState("");
  const [newPrice, setNewPrice] = useState(29);
  const [newFamily, setNewFamily] = useState("Warm Amber Floral");
  const [newTopNotes, setNewTopNotes] = useState("");
  const [newMiddleNotes, setNewMiddleNotes] = useState("");
  const [newBaseNotes, setNewBaseNotes] = useState("");

  useEffect(() => {
    // Initial products load
    const load = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    load();

    // Seeding mock orders
    setOrders([
      { id: "ASC-874291", email: "client1@example.com", total: 63.99, status: "Pending", date: "June 4, 2026" },
      { id: "ASC-194829", email: "client2@example.com", total: 29.00, status: "Shipped", date: "June 2, 2026" },
    ]);
  }, []);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newInspired) return;

    const newProd: Product = {
      id: String(products.length + 1),
      name: newName,
      inspiredBy: newInspired,
      price: newPrice,
      size: "50ml",
      family: newFamily,
      notes: {
        top: newTopNotes.split(",").map((n) => n.trim()),
        middle: newMiddleNotes.split(",").map((n) => n.trim()),
        base: newBaseNotes.split(",").map((n) => n.trim()),
      },
      image: "",
      stock: 100,
      rating: 5.0,
      reviewsCount: 0,
      description: `Inspired by ${newInspired}. A high-fidelity fragrance recreation.`,
    };

    setProducts([newProd, ...products]);
    
    // Reset form
    setNewName("");
    setNewInspired("");
    setNewPrice(29);
    setNewTopNotes("");
    setNewMiddleNotes("");
    setNewBaseNotes("");
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleToggleFulfillment = (orderId: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId ? { ...o, status: o.status === "Pending" ? "Shipped" : "Pending" } : o
      )
    );
  };

  return (
    <div className="min-h-screen bg-ivory font-sans text-noir">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-ivory/80 backdrop-blur-md border-b border-light/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-3xl font-bold tracking-wider">AURASCENT</span>
            <span className="h-2 w-2 rounded-full bg-gold"></span>
          </Link>
          <span className="text-xs font-semibold uppercase tracking-widest text-slate">Administrator Panel</span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start text-left">
          
          {/* Sidebar Menu */}
          <div className="flex flex-wrap gap-2 lg:flex-col lg:w-64 shrink-0">
            <span className="font-bold text-xs uppercase tracking-wider text-slate mb-2 hidden lg:block">Admin Management</span>
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2.5 rounded text-xs font-semibold text-left transition-colors ${
                activeTab === "products" ? "bg-noir text-white" : "bg-white border border-light text-slate"
              }`}
            >
              Manage Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2.5 rounded text-xs font-semibold text-left transition-colors ${
                activeTab === "orders" ? "bg-noir text-white" : "bg-white border border-light text-slate"
              }`}
            >
              Fulfill Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("coupons")}
              className={`px-4 py-2.5 rounded text-xs font-semibold text-left transition-colors ${
                activeTab === "coupons" ? "bg-noir text-white" : "bg-white border border-light text-slate"
              }`}
            >
              Discount Coupons
            </button>
            <div className="border-t border-light/60 mt-4 pt-4 hidden lg:block">
              <Link href="/products" className="text-xs font-bold text-gold hover:underline">
                ← Go to Catalogue
              </Link>
            </div>
          </div>

          {/* Core Content Area */}
          <div className="flex-1 w-full">
            
            {/* Products Tab */}
            {activeTab === "products" && (
              <div className="space-y-12">
                
                {/* Create Product Form */}
                <div className="bg-white rounded-lg border border-light/60 p-6">
                  <h3 className="font-serif text-xl font-bold text-noir mb-6">Add New Fragrance SKU</h3>
                  
                  <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate mb-1">Fragrance Name</label>
                      <input
                        type="text"
                        required
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full px-3 py-2 border border-light rounded text-sm focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate mb-1">Inspired-By Brand / Scent</label>
                      <input
                        type="text"
                        required
                        value={newInspired}
                        onChange={(e) => setNewInspired(e.target.value)}
                        className="w-full px-3 py-2 border border-light rounded text-sm focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate mb-1">Price ($)</label>
                      <input
                        type="number"
                        required
                        value={newPrice}
                        onChange={(e) => setNewPrice(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-light rounded text-sm focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate mb-1">Scent Family</label>
                      <select
                        value={newFamily}
                        onChange={(e) => setNewFamily(e.target.value)}
                        className="w-full px-3 py-2 border border-light rounded text-sm focus:outline-none focus:border-gold"
                      >
                        <option value="Warm Amber Floral">Warm Amber Floral</option>
                        <option value="Woody Oriental">Woody Oriental</option>
                        <option value="Woody Spicy">Woody Spicy</option>
                        <option value="Citrus Fresh">Citrus Fresh</option>
                        <option value="Floral Sweet">Floral Sweet</option>
                        <option value="Amber Gourmand">Amber Gourmand</option>
                      </select>
                    </div>

                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate mb-1">Top Notes (comma-separated)</label>
                        <input
                          type="text"
                          placeholder="Lemon, Pink Pepper"
                          value={newTopNotes}
                          onChange={(e) => setNewTopNotes(e.target.value)}
                          className="w-full px-3 py-2 border border-light rounded text-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate mb-1">Heart Notes (comma-separated)</label>
                        <input
                          type="text"
                          placeholder="Rose, Jasmine"
                          value={newMiddleNotes}
                          onChange={(e) => setNewMiddleNotes(e.target.value)}
                          className="w-full px-3 py-2 border border-light rounded text-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate mb-1">Base Notes (comma-separated)</label>
                        <input
                          type="text"
                          placeholder="Sandalwood, Vanilla"
                          value={newBaseNotes}
                          onChange={(e) => setNewBaseNotes(e.target.value)}
                          className="w-full px-3 py-2 border border-light rounded text-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-noir text-white text-xs font-semibold tracking-wide uppercase rounded hover:bg-gold hover:text-noir transition-colors"
                      >
                        Add Product
                      </button>
                    </div>
                  </form>
                </div>

                {/* Product List */}
                <div className="bg-white rounded-lg border border-light/60 p-6 overflow-hidden">
                  <h3 className="font-serif text-xl font-bold text-noir mb-6">Catalogue SKUs</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm text-left">
                      <thead>
                        <tr className="border-b border-light/60 text-slate font-semibold text-xs">
                          <th className="py-3 px-4">Name</th>
                          <th className="py-3 px-4">Inspired By</th>
                          <th className="py-3 px-4">Family</th>
                          <th className="py-3 px-4">Price</th>
                          <th className="py-3 px-4">Stock</th>
                          <th className="py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-light/40">
                        {products.map((p) => (
                          <tr key={p.id}>
                            <td className="py-4 px-4 font-bold text-noir">{p.name}</td>
                            <td className="py-4 px-4 text-slate text-xs">{p.inspiredBy}</td>
                            <td className="py-4 px-4 text-slate text-xs">{p.family}</td>
                            <td className="py-4 px-4 font-serif font-bold text-noir">${p.price}</td>
                            <td className="py-4 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                p.stock && p.stock < 80 ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                              }`}>
                                {p.stock || 100} units
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="text-xs text-red-600 hover:text-red-800 font-semibold"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-lg border border-light/60 p-6">
                <h3 className="font-serif text-xl font-bold text-noir mb-6">Customer Purchases</h3>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm text-left">
                    <thead>
                      <tr className="border-b border-light/60 text-slate font-semibold text-xs">
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Fulfillment</th>
                        <th className="py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-light/40">
                      {orders.map((o) => (
                        <tr key={o.id}>
                          <td className="py-4 px-4 font-bold text-noir">{o.id}</td>
                          <td className="py-4 px-4 text-slate text-xs">{o.email}</td>
                          <td className="py-4 px-4 text-slate text-xs">{o.date}</td>
                          <td className="py-4 px-4 font-serif font-bold text-noir">${o.total}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              o.status === "Pending" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                            }`}>
                              {o.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <button
                              onClick={() => handleToggleFulfillment(o.id)}
                              className="px-3 py-1 bg-noir hover:bg-gold text-white hover:text-noir text-xs font-semibold rounded transition-colors"
                            >
                              Mark as {o.status === "Pending" ? "Shipped" : "Pending"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Coupons Tab */}
            {activeTab === "coupons" && (
              <div className="bg-white rounded-lg border border-light/60 p-6">
                <h3 className="font-serif text-xl font-bold text-noir mb-6">Active Coupon Campaigns</h3>
                <div className="divide-y divide-light/40">
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <span className="font-mono text-sm font-bold text-noir">WELCOME15</span>
                      <span className="text-xs text-slate block">15% off total order value for first-time newsletter subscribers</span>
                    </div>
                    <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded text-[10px] font-bold uppercase tracking-wider">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <span className="font-mono text-sm font-bold text-noir">SPRING20</span>
                      <span className="text-xs text-slate block">20% off spring collections (expired)</span>
                    </div>
                    <span className="px-2.5 py-1 bg-slate/15 text-slate rounded text-[10px] font-bold uppercase tracking-wider">
                      Disabled
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  );
}
