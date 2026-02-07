import React from 'react';
import { ShoppingBag, Clock, Truck, Star } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const isQuick = product.deliveryType === 'quick';

  // Calculate discount percentage if original price exists
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 group">
      {/* IMAGE SECTION */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* DELIVERY BADGE */}
        <div
          className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-semibold rounded-lg text-white shadow-md backdrop-blur-sm ${
            isQuick 
              ? 'bg-green-600/90 border border-green-400/20' 
              : 'bg-blue-600/90 border border-blue-400/20'
          }`}
        >
          {isQuick ? (
            <span className="flex items-center gap-1.5">
              <Clock size={14} strokeWidth={2.5} />
              <span>1-2 Hr</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Truck size={14} strokeWidth={2.5} />
              <span>2-3 Days</span>
            </span>
          )}
        </div>

        {/* DISCOUNT BADGE */}
        {discountPercentage && discountPercentage > 0 && (
          <div className="absolute top-3 right-3 bg-red-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-md">
            {discountPercentage}% OFF
          </div>
        )}

        {/* GRADIENT OVERLAY ON HOVER */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-4 flex flex-col flex-1">
        {/* PRODUCT NAME */}
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2 min-h-[2.5rem] leading-tight">
          {product.name}
        </h3>

        {/* RATING (OPTIONAL) */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
              <span>{product.rating}</span>
              <Star size={10} fill="currentColor" />
            </div>
            {product.reviewCount && (
              <span className="text-xs text-gray-500">({product.reviewCount})</span>
            )}
          </div>
        )}

        {/* PRICE SECTION */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold text-gray-900">
              ₹{product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm line-through text-gray-400">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          
          {/* SAVINGS TEXT */}
          {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-xs text-green-600 font-semibold">
              You save ₹{product.originalPrice - product.price}!
            </p>
          )}
        </div>

        {/* CATEGORY TAG (OPTIONAL) */}
        {product.category && (
          <div className="mb-3">
            <span className="inline-block text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-md font-medium border border-orange-100">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
          </div>
        )}

        {/* ADD TO CART BUTTON */}
        <button
          onClick={() => addToCart(product)}
          className="mt-auto w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <ShoppingBag size={18} strokeWidth={2.5} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;