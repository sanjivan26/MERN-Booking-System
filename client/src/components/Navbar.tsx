import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-purple-500 hover:text-purple-400"
          >
            MERN Booking
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6">
            {user ? (
              <>
                <span className="text-gray-300">Hello, {user}</span>
                <Link
                  to="/properties"
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  Properties
                </Link>
                <Link
                  to="/bookings"
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  My Bookings
                </Link>
                <button
                  onClick={logout}
                  className="bg-purple-500 hover:bg-purple-600 px-4 py-1 rounded transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  Register
                </Link>
                <Link
                  to="/add-property"
                  className="bg-purple-500 hover:bg-purple-600 px-4 py-1 rounded transition-colors"
                >
                  Add Property
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
