import React from "react";
import { ShoppingBag, User, Search, MapPin, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = ({ onCartClick, onLoginClick }) => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BAR - Logo, Search, Actions */}
        <div className="flex items-center justify-between py-4 gap-4">
          
          {/* LOGO */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-orange-600 to-red-500 w-10 h-10 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">A</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold leading-none">
                  Apna<span className="text-orange-600">Dukan</span>
                </h1>
                <p className="text-xs text-gray-500 leading-none mt-0.5">Your Local Store</p>
              </div>
            </div>
          </Link>

          {/* SEARCH BAR - Hidden on mobile, shown on md+ */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for products, categories..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-sm"
              />
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* LOCATION - Hidden on small screens */}
            <button className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <MapPin size={18} className="text-orange-600" />
              <div className="text-left">
                <p className="text-xs text-gray-500">Deliver to</p>
                <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                  Your Location <ChevronDown size={14} />
                </p>
              </div>
            </button>

            {/* USER SECTION */}
            {user ? (
              <div className="flex items-center gap-2">
                {/* Admin/Orders Link */}
                {user.role === "admin" ? (
                  <Link
                    to="/admin"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors font-semibold text-sm"
                  >
                    <User size={18} />
                    <span>Admin Panel</span>
                  </Link>
                ) : (
                  <Link
                    to="/my-orders"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors font-medium text-sm text-gray-700"
                  >
                    <User size={18} />
                    <span>My Orders</span>
                  </Link>
                )}

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              /* LOGIN BUTTON */
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg hover:from-orange-700 hover:to-orange-600 transition-all shadow-md hover:shadow-lg font-semibold text-sm"
              >
                <User size={18} />
                <span className="hidden sm:inline">Login</span>
              </button>
            )}

            {/* CART BUTTON */}
            <button
              onClick={onCartClick}
              className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white p-3 rounded-lg hover:from-orange-700 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* MOBILE SEARCH BAR - Only visible on small screens */}
        <div className="md:hidden pb-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-sm"
            />
          </div>
        </div>

        {/* MOBILE USER LINKS - Only show admin/orders on mobile when logged in */}
        {user && (
          <div className="sm:hidden pb-3 flex gap-2">
            {user.role === "admin" ? (
              <Link
                to="/admin"
                className="flex-1 text-center px-4 py-2 bg-orange-50 text-orange-600 rounded-lg font-semibold text-sm"
              >
                Admin Panel
              </Link>
            ) : (
              <Link
                to="/my-orders"
                className="flex-1 text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm"
              >
                My Orders
              </Link>
            )}
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;