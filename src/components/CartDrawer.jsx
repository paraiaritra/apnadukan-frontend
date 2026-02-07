import React from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Package } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* BACKDROP */}
      <div 
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* DRAWER */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col animate-slideInRight">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 px-6 py-5 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 p-2 rounded-lg">
                <ShoppingBag className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                <p className="text-xs text-gray-600">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="bg-white hover:bg-gray-100 rounded-full p-2 transition-colors shadow-sm"
              aria-label="Close cart"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* CART ITEMS */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag size={48} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6 text-sm">Add some items to get started!</p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-orange-600 transition-all shadow-md"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-orange-300 transition-colors"
                >
                  <div className="flex gap-4">
                    {/* PRODUCT IMAGE */}
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                      />
                    )}

                    {/* PRODUCT INFO */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">
                        {item.name}
                      </h3>
                      
                      {/* DELIVERY TYPE BADGE */}
                      {item.deliveryType && (
                        <div className="mb-2">
                          {item.deliveryType === 'quick' ? (
                            <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold border border-green-200">
                              ⚡ Quick
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold border border-blue-200">
                              📦 Scheduled
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        {/* PRICE */}
                        <div>
                          <p className="text-lg font-bold text-gray-900">₹{item.price}</p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-gray-600">
                              Total: ₹{item.price * item.quantity}
                            </p>
                          )}
                        </div>

                        {/* QUANTITY CONTROLS */}
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item._id, -1)}
                            className="bg-white hover:bg-orange-500 hover:text-white text-gray-700 rounded-md p-1.5 transition-colors shadow-sm"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} strokeWidth={2.5} />
                          </button>
                          <span className="font-bold text-gray-900 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id, 1)}
                            className="bg-white hover:bg-orange-500 hover:text-white text-gray-700 rounded-md p-1.5 transition-colors shadow-sm"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* REMOVE BUTTON */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="mt-3 w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 py-2 rounded-lg font-semibold text-sm transition-colors"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER - CHECKOUT SECTION */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 bg-white px-6 py-5">
            
            {/* BILL DETAILS */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-semibold text-gray-900">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Charges</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Total Amount</span>
                  <span className="text-2xl font-bold text-gray-900">₹{totalPrice}</span>
                </div>
              </div>
            </div>

            {/* CHECKOUT BUTTON */}
            <button
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl font-bold text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={20} strokeWidth={2.5} />
            </button>

            {/* COD INFO */}
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
                <span>💵</span>
                Cash on Delivery Available
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default CartDrawer;