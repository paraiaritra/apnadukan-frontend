import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';

const Home = ({ onCartClick, onLoginClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    { 
      name: 'Grocery & Staples', 
      emoji: '🛒',
      color: 'from-emerald-50 to-emerald-100',
      iconBg: 'bg-emerald-500'
    },
    { 
      name: 'Fresh Vegetables', 
      emoji: '🥬',
      color: 'from-green-50 to-green-100',
      iconBg: 'bg-green-500'
    },
    { 
      name: 'Fashion & Apparel', 
      emoji: '👔',
      color: 'from-purple-50 to-purple-100',
      iconBg: 'bg-purple-500'
    },
    { 
      name: 'Toys & Games', 
      emoji: '🎮',
      color: 'from-pink-50 to-pink-100',
      iconBg: 'bg-pink-500'
    },
    { 
      name: 'Home & Kitchen', 
      emoji: '🏠',
      color: 'from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500'
    },
    { 
      name: 'Personal Care', 
      emoji: '💄',
      color: 'from-rose-50 to-rose-100',
      iconBg: 'bg-rose-500'
    },
    { 
      name: 'Electronics', 
      emoji: '📱',
      color: 'from-indigo-50 to-indigo-100',
      iconBg: 'bg-indigo-500'
    },
    { 
      name: 'Baby Products', 
      emoji: '🍼',
      color: 'from-yellow-50 to-yellow-100',
      iconBg: 'bg-yellow-500'
    },
  ];

  const offers = [
    { title: 'Up to 50% OFF', subtitle: 'On Fresh Vegetables', bg: 'bg-gradient-to-r from-green-500 to-emerald-600' },
    { title: 'Buy 1 Get 1 FREE', subtitle: 'On Selected Items', bg: 'bg-gradient-to-r from-orange-500 to-red-600' },
    { title: 'Flat ₹100 OFF', subtitle: 'On Orders Above ₹999', bg: 'bg-gradient-to-r from-blue-500 to-indigo-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR - Will be added separately */}

      {/* HERO BANNER SECTION */}
      <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-red-500 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                🎉 Welcome to ApnaDukan
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Your Trusted
                <span className="block text-yellow-300">Local Store Online</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-lg">
                Fresh groceries, vegetables, fashion & more delivered to your doorstep in 1-2 hours
              </p>
              
              {/* Feature badges */}
              <div className="flex flex-wrap gap-3">
                <div className="bg-white text-orange-600 px-5 py-2.5 rounded-lg font-semibold text-sm shadow-lg flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  Fast Delivery
                </div>
                <div className="bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2">
                  <span className="text-lg">💰</span>
                  Cash on Delivery
                </div>
                <div className="bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  Best Prices
                </div>
              </div>
            </div>

            {/* Hero Image placeholder - you can add an actual image */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="w-full h-80 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <span className="text-8xl">🛒</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFERS STRIP */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {offers.map((offer, idx) => (
              <div 
                key={idx} 
                className={`${offer.bg} rounded-xl p-6 text-white shadow-md hover:shadow-lg transition-shadow cursor-pointer`}
              >
                <h3 className="text-2xl font-bold mb-1">{offer.title}</h3>
                <p className="text-sm opacity-90">{offer.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors text-sm md:text-base">
              View All →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className={`bg-gradient-to-br ${cat.color} rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100`}
              >
                <div className={`${cat.iconBg} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-md`}>
                  <span className="text-3xl">{cat.emoji}</span>
                </div>
                <p className="font-semibold text-gray-800 text-center text-sm">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                Popular Products
              </h2>
              <p className="text-gray-600 text-sm">Trending items in your area</p>
            </div>
            <button className="hidden md:block text-orange-600 font-semibold hover:text-orange-700 transition-colors">
              View All Products →
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-orange-600"></div>
              <p className="mt-4 text-gray-500 font-medium">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-300">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-gray-600 font-medium text-lg">No products available</p>
              <p className="text-gray-400 text-sm mt-2">Check back later for new items</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER INFO STRIP */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🚚</div>
              <h4 className="font-semibold text-gray-900 mb-1">Fast Delivery</h4>
              <p className="text-sm text-gray-600">Within 1-2 hours</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💯</div>
              <h4 className="font-semibold text-gray-900 mb-1">Quality Products</h4>
              <p className="text-sm text-gray-600">100% authentic</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-semibold text-gray-900 mb-1">Secure Payment</h4>
              <p className="text-sm text-gray-600">Safe & encrypted</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎁</div>
              <h4 className="font-semibold text-gray-900 mb-1">Best Offers</h4>
              <p className="text-sm text-gray-600">Great deals daily</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;