import React from 'react';
import { CheckCircle, X, Package, Truck, Clock } from 'lucide-react';

const CheckoutModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl transform animate-slideUp overflow-hidden">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* SUCCESS ICON SECTION */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-8 pt-12 pb-8 text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce-slow">
              <CheckCircle size={48} className="text-green-600" strokeWidth={2.5} />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              Order Placed Successfully! 🎉
            </h2>
            <p className="text-green-100 text-sm">
              Thank you for shopping with ApnaDukan
            </p>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="p-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-200">
            <p className="text-gray-700 text-center mb-4 font-medium">
              Your order has been confirmed and will be delivered soon!
            </p>

            {/* DELIVERY INFO */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Clock size={20} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600">Estimated Delivery</p>
                  <p className="font-semibold text-gray-900 text-sm">Within 1-2 hours</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Package size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600">Order Tracking</p>
                  <p className="font-semibold text-gray-900 text-sm">Check "My Orders" page</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Truck size={20} className="text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600">Payment Method</p>
                  <p className="font-semibold text-gray-900 text-sm">Cash on Delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* ORDER CONFIRMATION MESSAGE */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <div className="text-blue-600 mt-0.5">ℹ️</div>
              <div className="flex-1">
                <p className="text-sm text-blue-900 font-medium mb-1">
                  Order Confirmation Sent
                </p>
                <p className="text-xs text-blue-700">
                  You can track your order status in the "My Orders" section
                </p>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-3.5 rounded-xl font-bold text-base transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Continue Shopping
            </button>
            
            <button
              onClick={() => {
                onClose();
                window.location.href = '/my-orders';
              }}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3.5 rounded-xl font-semibold text-base border-2 border-gray-200 transition-all"
            >
              View My Orders
            </button>
          </div>
        </div>
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

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CheckoutModal;