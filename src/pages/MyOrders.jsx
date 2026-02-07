import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { API_URL } from "../config";
import { Package, MapPin, Phone, User, Calendar, Truck, CheckCircle, Clock } from "lucide-react";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders/myorders`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        setOrders(data);
      } catch {
        alert("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Processing":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle size={16} />;
      case "Shipped":
        return <Truck size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-2xl shadow-lg p-12 max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User size={40} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to view your orders</p>
          <button className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-orange-600 transition-all shadow-md">
            Login Now
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-orange-600 mb-4"></div>
          <p className="text-gray-600 font-medium text-lg">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My Orders
          </h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* NO ORDERS */}
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
            <button className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-orange-600 transition-all shadow-md">
              Start Shopping
            </button>
          </div>
        ) : (
          /* ORDERS LIST */
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200"
              >
                {/* ORDER HEADER */}
                <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-100 p-3 rounded-xl">
                        <Package className="text-orange-600" size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <Calendar size={14} />
                          <span>
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-semibold text-sm ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                  </div>
                </div>

                {/* ORDER CONTENT */}
                <div className="p-6">
                  
                  {/* SHIPPING ADDRESS */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <MapPin size={18} className="text-orange-600" />
                      Delivery Address
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-start gap-2">
                        <User size={16} className="text-gray-400 mt-0.5" />
                        <span className="text-gray-700">{order.user?.name || user.name}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone size={16} className="text-gray-400 mt-0.5" />
                        <span className="text-gray-700">{order.shippingAddress.mobile}</span>
                      </div>
                      <div className="sm:col-span-2 flex items-start gap-2">
                        <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">
                          {order.shippingAddress.village}
                          {order.shippingAddress.landmark && `, ${order.shippingAddress.landmark}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ORDER ITEMS */}
                  <div className="space-y-4 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                    {order.orderItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 items-start border border-gray-200 p-4 rounded-xl hover:border-orange-300 transition-colors"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border border-gray-200"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2">
                            {item.name}
                          </h4>

                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                            <span className="font-medium">Qty: {item.quantity}</span>
                            <span>×</span>
                            <span className="font-medium">₹{item.price}</span>
                          </div>

                          {/* DELIVERY TYPE BADGE */}
                          {item.deliveryType === "quick" ? (
                            <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold border border-green-200">
                              <span>⚡</span>
                              Quick delivery (1–2 hours)
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200">
                              <Package size={12} />
                              Scheduled (2–3 days)
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-gray-900 text-lg">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ORDER TOTAL */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Order Total</span>
                      <span className="font-bold text-2xl text-gray-900">₹{order.totalPrice}</span>
                    </div>
                  </div>

                  {/* DELIVERED INFO */}
                  {order.status === "Delivered" && order.deliveredAt && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle size={20} />
                        <span className="font-semibold">
                          Delivered on {new Date(order.deliveredAt).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* ORDER TRACKING */}
                  <div className="relative">
                    <div className="flex justify-between items-center">
                      {/* Processing */}
                      <div className="flex flex-col items-center flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          order.status !== "Processing" 
                            ? "bg-green-500 border-green-500" 
                            : "bg-orange-500 border-orange-500"
                        }`}>
                          <Clock size={20} className="text-white" />
                        </div>
                        <p className={`text-xs font-semibold mt-2 ${
                          order.status !== "Processing" ? "text-green-600" : "text-orange-600"
                        }`}>
                          Processing
                        </p>
                      </div>

                      {/* Connector Line 1 */}
                      <div className={`flex-1 h-1 -mt-10 ${
                        order.status === "Shipped" || order.status === "Delivered"
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}></div>

                      {/* Shipped */}
                      <div className="flex flex-col items-center flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          order.status === "Shipped" || order.status === "Delivered"
                            ? "bg-green-500 border-green-500"
                            : "bg-gray-300 border-gray-300"
                        }`}>
                          <Truck size={20} className="text-white" />
                        </div>
                        <p className={`text-xs font-semibold mt-2 ${
                          order.status === "Shipped" || order.status === "Delivered"
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}>
                          Shipped
                        </p>
                      </div>

                      {/* Connector Line 2 */}
                      <div className={`flex-1 h-1 -mt-10 ${
                        order.status === "Delivered"
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}></div>

                      {/* Delivered */}
                      <div className="flex flex-col items-center flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          order.status === "Delivered"
                            ? "bg-green-500 border-green-500"
                            : "bg-gray-300 border-gray-300"
                        }`}>
                          <CheckCircle size={20} className="text-white" />
                        </div>
                        <p className={`text-xs font-semibold mt-2 ${
                          order.status === "Delivered"
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}>
                          Delivered
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;