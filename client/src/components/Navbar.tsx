import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4 text-white">
      <Link to="/" className="font-bold text-lg">
        MERN Booking
      </Link>
      <div className="flex gap-4">
        {user ? (
          <>
            <span>Hello, {user}</span>
            <Link to="/bookings">My Bookings</Link>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/add-property">Add Property</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
