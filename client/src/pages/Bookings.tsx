import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

interface Booking {
  _id: string;
  property: {
    name: string;
    location: string;
  };
  startDate: string;
  endDate: string;
  totalPrice: number;
}

const Bookings = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) return;
      try {
        const res = await axiosInstance.get("/bookings/my-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch {
        setError("Failed to load bookings.");
      }
    };
    fetchBookings();
  }, [token]);

  if (!token) return <p className="p-4">Please log in to see your bookings.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {error && <p className="text-red-500">{error}</p>}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border p-4 rounded shadow bg-gray-900 text-gray-200"
            >
              <h3 className="font-bold text-lg">{booking.property.name}</h3>
              <p className="text-sm text-gray-400">
                {booking.property.location}
              </p>
              <p className="mt-2">
                {new Date(booking.startDate).toLocaleDateString()} →{" "}
                {new Date(booking.endDate).toLocaleDateString()}
              </p>
              <p className="mt-1 font-semibold text-purple-400">
                Total: ${booking.totalPrice}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
