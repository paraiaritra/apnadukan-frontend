import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { API_URL } from '../config';

const Home = ({ onCartClick, onLoginClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
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
      color: 'from-teal-50 to-emerald-50',
      iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-600',
      borderColor: 'border-teal-100'
    },
    { 
      name: 'Fresh Vegetables', 
      emoji: '🥬',
      color: 'from-green-50 to-lime-50',
      iconBg: 'bg-gradient-to-br from-green-500 to-lime-600',
      borderColor: 'border-green-100'
    },
    { 
      name: 'Fashion & Apparel', 
      emoji: '👔',
      color: 'from-violet-50 to-purple-50',
      iconBg: 'bg-gradient-to-br from-violet-500 to-purple-600',
      borderColor: 'border-violet-100'
    },
    { 
      name: 'Toys & Games', 
      emoji: '🎮',
      color: 'from-fuchsia-50 to-pink-50',
      iconBg: 'bg-gradient-to-br from-fuchsia-500 to-pink-600',
      borderColor: 'border-fuchsia-100'
    },
    { 
      name: 'Home & Kitchen', 
      emoji: '🏠',
      color: 'from-sky-50 to-blue-50',
      iconBg: 'bg-gradient-to-br from-sky-500 to-blue-600',
      borderColor: 'border-sky-100'
    },
    { 
      name: 'Personal Care', 
      emoji: '💄',
      color: 'from-rose-50 to-red-50',
      iconBg: 'bg-gradient-to-br from-rose-500 to-red-600',
      borderColor: 'border-rose-100'
    },
    { 
      name: 'Electronics', 
      emoji: '📱',
      color: 'from-indigo-50 to-blue-50',
      iconBg: 'bg-gradient-to-br from-indigo-500 to-blue-600',
      borderColor: 'border-indigo-100'
    },
    { 
      name: 'Baby Products', 
      emoji: '🍼',
      color: 'from-amber-50 to-yellow-50',
      iconBg: 'bg-gradient-to-br from-amber-500 to-yellow-600',
      borderColor: 'border-amber-100'
    },
  ];

  const offers = [
    { 
      title: 'Up to 50% OFF', 
      subtitle: 'On Fresh Vegetables & Fruits', 
      bg: 'bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600',
      icon: '🥗'
    },
    { 
      title: 'Buy 1 Get 1 FREE', 
      subtitle: 'On Selected Fashion Items', 
      bg: 'bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-600',
      icon: '🎁'
    },
    { 
      title: 'Flat ₹100 OFF', 
      subtitle: 'On Orders Above ₹999', 
      bg: 'bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600',
      icon: '💰'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* NAVBAR - Will be added separately */}

      {/* HERO BANNER SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-violet-900">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>🎉 Welcome to ApnaDukan</span>
              </div>
              
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  Your Trusted
                  <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mt-2">
                    Local Store Online
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-lg">
                  Fresh groceries, vegetables, fashion & more delivered to your doorstep in 1-2 hours
                </p>
              </div>
              
              {/* CTA Button */}
              <div className="pt-2">
                <button className="group bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3">
                  Start Shopping
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              {/* Feature badges */}
              <div className="flex flex-wrap gap-3 pt-4">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-xl font-medium text-sm shadow-lg flex items-center gap-2.5 hover:bg-white/20 transition-colors">
                  <span className="text-xl">⚡</span>
                  <span>Fast Delivery</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-xl font-medium text-sm shadow-lg flex items-center gap-2.5 hover:bg-white/20 transition-colors">
                  <span className="text-xl">💰</span>
                  <span>Cash on Delivery</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-xl font-medium text-sm shadow-lg flex items-center gap-2.5 hover:bg-white/20 transition-colors">
                  <span className="text-xl">✓</span>
                  <span>Best Prices</span>
                </div>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-violet-500 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12 shadow-2xl">
                  <div className="flex items-center justify-center">
                    <span className="text-9xl drop-shadow-2xl">🛒</span>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-6 -right-6 bg-gradient-to-br from-emerald-400 to-teal-500 text-white px-6 py-3 rounded-2xl shadow-xl font-bold text-sm transform rotate-3 hover:rotate-6 transition-transform">
                    Fresh Daily
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-violet-400 to-purple-500 text-white px-6 py-3 rounded-2xl shadow-xl font-bold text-sm transform -rotate-3 hover:-rotate-6 transition-transform">
                    Save Big!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* OFFERS STRIP */}
      <section className="bg-white py-8 -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer, idx) => (
              <div 
                key={idx} 
                className={`${offer.bg} rounded-2xl p-7 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden group`}
              >
                <div className="absolute top-0 right-0 text-8xl opacity-10 transform translate-x-6 -translate-y-6 group-hover:scale-110 transition-transform">
                  {offer.icon}
                </div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight">{offer.title}</h3>
                    <span className="text-4xl">{offer.icon}</span>
                  </div>
                  <p className="text-sm md:text-base text-white/90 font-medium">{offer.subtitle}</p>
                  <div className="mt-4 inline-flex items-center text-sm font-semibold group-hover:gap-2 transition-all">
                    Shop Now 
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Shop by Category
              </h2>
              <p className="text-slate-600">Explore our wide range of products</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors group">
              View All
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className={`bg-gradient-to-br ${cat.color} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 ${cat.borderColor} transform hover:-translate-y-1`}
              >
                <div className={`${cat.iconBg} w-20 h-20 rounded-2xl flex items-center justify-center mb-5 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <span className="text-4xl">{cat.emoji}</span>
                </div>
                <p className="font-semibold text-slate-800 text-center text-base leading-tight">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Popular Products
              </h2>
              <p className="text-slate-600">Trending items in your area</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors group">
              View All Products
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {loading ? (
            <div className="text-center py-24">
              <div className="inline-block relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-indigo-600"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full opacity-20 animate-ping"></div>
                </div>
              </div>
              <p className="mt-6 text-slate-600 font-medium text-lg">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-slate-300 shadow-sm">
              <div className="text-7xl mb-6 animate-bounce">📦</div>
              <p className="text-slate-700 font-semibold text-xl mb-2">No products available</p>
              <p className="text-slate-500 text-base">Check back later for new items</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-gradient-to-br from-slate-900 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Choose ApnaDukan?</h2>
            <p className="text-slate-300 text-lg">Experience the best in local online shopping</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <span className="text-4xl">🚚</span>
              </div>
              <h4 className="font-bold text-lg text-white mb-2">Fast Delivery</h4>
              <p className="text-sm text-slate-300">Within 1-2 hours to your doorstep</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <span className="text-4xl">💯</span>
              </div>
              <h4 className="font-bold text-lg text-white mb-2">Quality Products</h4>
              <p className="text-sm text-slate-300">100% authentic & fresh items</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <span className="text-4xl">🔒</span>
              </div>
              <h4 className="font-bold text-lg text-white mb-2">Secure Payment</h4>
              <p className="text-sm text-slate-300">Safe & encrypted transactions</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <span className="text-4xl">🎁</span>
              </div>
              <h4 className="font-bold text-lg text-white mb-2">Best Offers</h4>
              <p className="text-sm text-slate-300">Great deals & discounts daily</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;