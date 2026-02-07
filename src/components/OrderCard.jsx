import React from 'react';
import { User, MapPin, Package, Clock, Truck, CheckCircle, Calendar } from 'lucide-react';

const OrderCard = ({ order }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case "Delivered":
        return {
          color: "bg-green-100 text-green-700 border-green-200",
          icon: <CheckCircle size={14} />,
          textColor: "text-green-700"
        };
      case "Shipped":
        return {
          color: "bg-blue-100 text-blue-700 border-blue-200",
          icon: <Truck size={14} />,
          textColor: "text-blue-700"
        };
      case "Processing":
        return {
          color: "bg-orange-100 text-orange-700 border-orange-200",
          icon: <Clock size={14} />,
          textColor: "text-orange-700"
        };
      default:
        return {
          color: "bg-gray-100 text-gray-700 border-gray-200",
          icon: <Package size={14} />,
          textColor: "text-gray-700"
        };
    }
  };

  const statusConfig = getStatusConfig(order.status);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 group">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 px-5 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Package className="text-white" size={16} />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">
                Order #{order._id?.slice(-6).toUpperCase() || 'N/A'}
              </p>
              {order.createdAt && (
                <div className="flex items-center gap-1 text-xs text-gray-600 mt-0.5">
                  <Calendar size={12} />
                  <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'short' 
                  })}</span>
                </div>
              )}
            </div>
          </div>

          {/* STATUS BADGE */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold text-xs ${statusConfig.color}`}>
            {statusConfig.icon}
            <span>{order.status}</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-4">
        
        {/* CUSTOMER INFO */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User size={16} className="text-gray-400" />
            <span className="font-semibold text-gray-900">
              {order.user?.name || 'Customer'}
            </span>
          </div>
          
          {order.shippingAddress?.village && (
            <div className="flex items-start gap-2 text-sm">
              <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 line-clamp-1">
                {order.shippingAddress.village}
                {order.shippingAddress.landmark && `, ${order.shippingAddress.landmark}`}
              </span>
            </div>
          )}
        </div>

        {/* ITEMS LIST */}
        <div className="border-t border-gray-200 pt-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Items ({order.orderItems?.length || 0})
          </h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {order.orderItems?.map((item, i) => (
              <div key={i} className="flex items-start justify-between gap-3 text-sm">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 line-clamp-1">
                    {item.quantity} × {item.name}
                  </p>
                  {item.deliveryType && (
                    <div className="mt-1">
                      {item.deliveryType === 'quick' ? (
                        <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          <Clock size={10} />
                          Quick
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                          <Truck size={10} />
                          Scheduled
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {item.price && (
                  <span className="text-gray-600 font-semibold whitespace-nowrap">
                    ₹{item.price * item.quantity}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* TOTAL */}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Total Amount</span>
            <span className="text-xl font-bold text-orange-600">
              ₹{order.totalPrice}
            </span>
          </div>
        </div>

        {/* PAYMENT METHOD (if available) */}
        {order.paymentMethod && (
          <div className="bg-gray-50 rounded-lg px-3 py-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-semibold text-gray-900">{order.paymentMethod}</span>
            </div>
          </div>
        )}

        {/* DELIVERED DATE (if delivered) */}
        {order.status === "Delivered" && order.deliveredAt && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2 text-xs text-green-700">
              <CheckCircle size={14} />
              <span className="font-semibold">
                Delivered on {new Date(order.deliveredAt).toLocaleDateString('en-IN', { 
                  day: 'numeric', 
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;