// frontend/src/pages/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import { MapPin, Phone, Home, ShoppingBag, CreditCard, CheckCircle, AlertCircle } from "lucide-react";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    village: "",
    landmark: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!address.village.trim()) {
      newErrors.village = "Village/Area is required";
    }
    
    if (!address.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(address.mobile.trim())) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const placeOrder = async () => {
    if (!user) {
      alert("Please login first");
      return navigate("/");
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          orderItems: cartItems.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            image: item.image,
            price: item.price,
            product: item._id,
            deliveryType: item.deliveryType,
          })),
          shippingAddress: address,
          paymentMethod: "COD",
          totalPrice,
        }),
      });

      if (!res.ok) throw new Error("Order failed");

      clearCart();
      alert("✅ Order placed successfully!");
      navigate("/my-orders");
    } catch (err) {
      alert("❌ Server error while placing order");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-2xl shadow-lg p-12 max-w-md">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={48} className="text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to your cart to checkout</p>
          <button 
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-orange-600 transition-all shadow-md"
          >
            Continue Shopping
          </button>
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
            Checkout
          </h1>
          <p className="text-gray-600">Complete your order details</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* LEFT SECTION - Address & Payment */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* DELIVERY DETAILS */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500 p-2 rounded-lg">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Delivery Details</h2>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Village/Area Input */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Home size={16} className="text-orange-600" />
                    Village / Area *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your village or area"
                    className={`w-full border-2 ${errors.village ? 'border-red-500' : 'border-gray-200'} p-3 rounded-lg focus:border-orange-500 focus:outline-none transition-colors`}
                    value={address.village}
                    onChange={(e) => {
                      setAddress({ ...address, village: e.target.value });
                      if (errors.village) setErrors({ ...errors, village: null });
                    }}
                  />
                  {errors.village && (
                    <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                      <AlertCircle size={14} />
                      <span>{errors.village}</span>
                    </div>
                  )}
                </div>

                {/* Landmark Input */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <MapPin size={16} className="text-orange-600" />
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Near Railway Station"
                    className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    value={address.landmark}
                    onChange={(e) =>
                      setAddress({ ...address, landmark: e.target.value })
                    }
                  />
                </div>

                {/* Mobile Input */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Phone size={16} className="text-orange-600" />
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    className={`w-full border-2 ${errors.mobile ? 'border-red-500' : 'border-gray-200'} p-3 rounded-lg focus:border-orange-500 focus:outline-none transition-colors`}
                    value={address.mobile}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setAddress({ ...address, mobile: value });
                      if (errors.mobile) setErrors({ ...errors, mobile: null });
                    }}
                  />
                  {errors.mobile && (
                    <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                      <AlertCircle size={14} />
                      <span>{errors.mobile}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <CreditCard className="text-white" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="border-2 border-green-500 bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when you receive your order</p>
                    </div>
                    <div className="text-2xl">💵</div>
                  </div>
                </div>
                
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <div className="text-blue-600 mt-0.5">ℹ️</div>
                    <div className="text-sm text-blue-900">
                      <p className="font-semibold mb-1">Please keep exact change ready</p>
                      <p className="text-blue-700">Our delivery partner will collect ₹{totalPrice} in cash</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SECTION - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <ShoppingBag className="text-white" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                </div>
              </div>

              <div className="p-6">
                {/* Items List */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-3 pb-4 border-b border-gray-200 last:border-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                          {item.name}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Qty: {item.quantity}</span>
                          <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                        </div>
                        {/* Delivery Type Badge */}
                        {item.deliveryType === "quick" ? (
                          <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold mt-1">
                            ⚡ Quick
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold mt-1">
                            📦 Scheduled
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
                    <span className="font-semibold text-gray-900">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Charges</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Amount Payable</span>
                    <span className="font-bold text-2xl text-gray-900">₹{totalPrice}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={placeOrder}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Place Order (COD)
                    </>
                  )}
                </button>

                {/* Security Badge */}
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-2 text-xs text-gray-500">
                    <div className="text-green-600">🔒</div>
                    <span>Safe and secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;