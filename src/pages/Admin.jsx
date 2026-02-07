import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { API_URL } from "../config";
import { 
  Package, ShoppingCart, Users, TrendingUp, Plus, Trash2, 
  Truck, CheckCircle, MapPin, Phone, User, Calendar, 
  Clock, Edit, AlertCircle, DollarSign, Box, Image
} from "lucide-react";

const Admin = () => {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, products, orders

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "grocery",
    deliveryType: "quick",
  });

  /* ================= FETCH ================= */

  useEffect(() => {
    if (!user || user.role !== "admin") return;

    const fetchAll = async () => {
      try {
        const pRes = await fetch(`${API_URL}/api/products`);
        const oRes = await fetch(`${API_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setProducts(await pRes.json());
        setOrders(await oRes.json());
      } catch {
        alert("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [user]);

  /* ================= PRODUCT ================= */

  const addProduct = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      setProducts((prev) => [data, ...prev]);
      setFormData({
        name: "",
        price: "",
        image: "",
        category: "grocery",
        deliveryType: "quick",
      });
      alert("✅ Product added successfully!");
    } else {
      alert("❌ Failed to add product");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });

    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("✅ Product deleted successfully!");
    } else {
      alert("❌ Failed to delete product");
    }
  };

  /* ================= ORDERS ================= */

  const dispatchOrder = async (id) => {
    const res = await fetch(`${API_URL}/api/orders/${id}/dispatch`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (res.ok) {
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status: "Shipped" } : o
        )
      );
      alert("✅ Order dispatched successfully!");
    } else {
      alert("❌ Dispatch failed");
    }
  };

  const deliverOrder = async (id) => {
    const res = await fetch(`${API_URL}/api/orders/${id}/deliver`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (res.ok) {
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id
            ? { ...o, status: "Delivered", deliveredAt: new Date() }
            : o
        )
      );
      alert("✅ Order marked as delivered!");
    } else {
      alert("❌ Failed to update order");
    }
  };

  /* ================= STATS ================= */

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    processingOrders: orders.filter(o => o.status === "Processing").length,
    deliveredOrders: orders.filter(o => o.status === "Delivered").length,
    totalRevenue: orders.reduce((sum, o) => sum + o.totalPrice, 0),
  };

  /* ================= GUARD ================= */

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-2xl shadow-lg p-12 max-w-md border-2 border-red-200">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">Admin access only. Please login with admin credentials.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-orange-600 mb-4"></div>
          <p className="text-gray-600 font-medium text-lg">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-orange-100">Manage your ApnaDukan store</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-sm opacity-90">Welcome,</p>
              <p className="font-bold">{user.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors border-b-2 ${
                activeTab === "dashboard"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <TrendingUp size={18} />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors border-b-2 ${
                activeTab === "products"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <Package size={18} />
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors border-b-2 ${
                activeTab === "orders"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <ShoppingCart size={18} />
              Orders ({orders.length})
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            
            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Package className="text-blue-600" size={24} />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{stats.totalProducts}</span>
                </div>
                <h3 className="text-gray-600 font-medium">Total Products</h3>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <ShoppingCart className="text-orange-600" size={24} />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{stats.totalOrders}</span>
                </div>
                <h3 className="text-gray-600 font-medium">Total Orders</h3>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Clock className="text-yellow-600" size={24} />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{stats.processingOrders}</span>
                </div>
                <h3 className="text-gray-600 font-medium">Processing Orders</h3>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <DollarSign className="text-green-600" size={24} />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue}</span>
                </div>
                <h3 className="text-gray-600 font-medium">Total Revenue</h3>
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="text-orange-600" size={20} />
                  Recent Orders
                </h3>
                <div className="space-y-3">
                  {orders.slice(0, 5).map(order => (
                    <div key={order._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">#{order._id.slice(-8).toUpperCase()}</p>
                        <p className="text-xs text-gray-600">{order.user?.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">₹{order.totalPrice}</p>
                        <span className={`text-xs font-semibold ${
                          order.status === "Delivered" ? "text-green-600" :
                          order.status === "Shipped" ? "text-blue-600" : "text-orange-600"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setActiveTab("products")}
                    className="w-full flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left"
                  >
                    <div className="bg-orange-600 p-2 rounded-lg">
                      <Plus className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Add New Product</p>
                      <p className="text-sm text-gray-600">Add items to your store</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="w-full flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
                  >
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <Truck className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Manage Orders</p>
                      <p className="text-sm text-gray-600">Process and track orders</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div className="space-y-8">
            
            {/* ADD PRODUCT FORM */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500 p-2 rounded-lg">
                    <Plus className="text-white" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
                </div>
              </div>

              <form onSubmit={addProduct} className="p-6">
                <div className="grid md:grid-cols-2 gap-5 mb-6">
                  {/* Product Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Box size={16} className="text-orange-600" />
                      Product Name *
                    </label>
                    <input
                      placeholder="Enter product name"
                      className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <DollarSign size={16} className="text-orange-600" />
                      Price (₹) *
                    </label>
                    <input
                      placeholder="Enter price"
                      type="number"
                      className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Image URL */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Image size={16} className="text-orange-600" />
                      Image URL *
                    </label>
                    <input
                      placeholder="https://example.com/image.jpg"
                      className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Package size={16} className="text-orange-600" />
                      Category *
                    </label>
                    <select
                      className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      <option value="grocery">🛒 Grocery</option>
                      <option value="veg">🥬 Vegetables</option>
                      <option value="fashion">👔 Fashion</option>
                      <option value="toys">🎮 Toys</option>
                    </select>
                  </div>

                  {/* Delivery Type */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Truck size={16} className="text-orange-600" />
                      Delivery Type *
                    </label>
                    <select
                      className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                      value={formData.deliveryType}
                      onChange={(e) =>
                        setFormData({ ...formData, deliveryType: e.target.value })
                      }
                    >
                      <option value="quick">⚡ Quick (1-2 hours)</option>
                      <option value="scheduled">📦 Scheduled (2-3 days)</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 rounded-lg font-bold text-lg hover:from-orange-700 hover:to-orange-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Add Product
                </button>
              </form>
            </div>

            {/* PRODUCTS LIST */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">All Products ({products.length})</h2>
              </div>

              <div className="p-6">
                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <Package size={48} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No products yet. Add your first product above.</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((p) => (
                      <div
                        key={p._id}
                        className="border-2 border-gray-200 rounded-xl p-4 hover:border-orange-300 transition-colors"
                      >
                        {p.image && (
                          <img 
                            src={p.image} 
                            alt={p.name}
                            className="w-full h-40 object-cover rounded-lg mb-3 border border-gray-200"
                          />
                        )}
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{p.name}</h3>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xl font-bold text-orange-600">₹{p.price}</span>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded font-semibold text-gray-700">
                            {p.category}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteProduct(p._id)}
                          className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg font-semibold transition-colors"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-12 text-center">
                <ShoppingCart size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600">Orders will appear here once customers start placing them</p>
              </div>
            ) : (
              orders.map((o) => (
                <div
                  key={o._id}
                  className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* ORDER HEADER */}
                  <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-orange-100 p-3 rounded-xl">
                          <ShoppingCart className="text-orange-600" size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-lg">
                            Order #{o._id.slice(-8).toUpperCase()}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <Calendar size={14} />
                            <span>{new Date(o.createdAt).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            })}</span>
                          </div>
                        </div>
                      </div>

                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-semibold text-sm ${
                        o.status === "Delivered" ? "bg-green-100 text-green-700 border-green-200" :
                        o.status === "Shipped" ? "bg-blue-100 text-blue-700 border-blue-200" :
                        "bg-orange-100 text-orange-700 border-orange-200"
                      }`}>
                        {o.status === "Delivered" ? <CheckCircle size={16} /> :
                         o.status === "Shipped" ? <Truck size={16} /> : <Clock size={16} />}
                        <span>{o.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* ORDER CONTENT */}
                  <div className="p-6">
                    
                    {/* CUSTOMER INFO */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <User size={18} className="text-orange-600" />
                        Customer Details
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-start gap-2">
                          <User size={16} className="text-gray-400 mt-0.5" />
                          <span className="text-gray-700">{o.user?.name}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone size={16} className="text-gray-400 mt-0.5" />
                          <span className="text-gray-700">{o.shippingAddress.mobile}</span>
                        </div>
                        <div className="sm:col-span-2 flex items-start gap-2">
                          <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            {o.shippingAddress.village}
                            {o.shippingAddress.landmark && `, ${o.shippingAddress.landmark}`}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <DollarSign size={16} className="text-gray-400 mt-0.5" />
                          <span className="text-gray-700 font-semibold">{o.paymentMethod}</span>
                        </div>
                      </div>
                    </div>

                    {/* ORDER ITEMS */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                      <div className="space-y-3">
                        {o.orderItems.map((i, idx) => (
                          <div
                            key={idx}
                            className="flex gap-4 items-start border border-gray-200 p-4 rounded-xl"
                          >
                            <img
                              src={i.image}
                              alt={i.name}
                              className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                            />

                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{i.name}</h4>
                              <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                                <span className="font-medium">Qty: {i.quantity}</span>
                                <span>×</span>
                                <span className="font-medium">₹{i.price}</span>
                              </div>
                              {i.deliveryType === "quick" ? (
                                <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold border border-green-200">
                                  ⚡ Quick (1-2 hrs)
                                </div>
                              ) : (
                                <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200">
                                  📦 Scheduled (2-3 days)
                                </div>
                              )}
                            </div>

                            <div className="text-right">
                              <p className="font-bold text-gray-900 text-lg">₹{i.price * i.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* TOTAL */}
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Order Total</span>
                        <span className="font-bold text-2xl text-gray-900">₹{o.totalPrice}</span>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-wrap gap-3">
                      {o.status === "Processing" && (
                        <button
                          onClick={() => dispatchOrder(o._id)}
                          className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-orange-600 transition-all shadow-md"
                        >
                          <Truck size={18} />
                          Dispatch Order
                        </button>
                      )}

                      {o.status !== "Delivered" && (
                        <button
                          onClick={() => deliverOrder(o._id)}
                          className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-md"
                        >
                          <CheckCircle size={18} />
                          Mark Delivered
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;