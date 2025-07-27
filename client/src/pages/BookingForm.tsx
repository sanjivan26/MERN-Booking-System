/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const BookingForm = () => {
  const { id } = useParams(); // property id
  const navigate = useNavigate();
  const { token } = useAuth();

  const [property, setProperty] = useState<any>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axiosInstance.get(`/properties/${id}`);
        setProperty(res.data);
      } catch {
        setError("Failed to load property details.");
      }
    };
    fetchProperty();
  }, [id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("You must be logged in to book.");
      return;
    }
    try {
      await axiosInstance.post(
        "/bookings",
        { propertyId: id, checkIn, checkOut },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/bookings");
    } catch (err: any) {
      setError(err.response?.data?.error || "Booking failed.");
    }
  };

  if (!property) return <p className="p-4">Loading property...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">{property.title}</h2>
      <p className="text-gray-600">{property.location}</p>
      <p className="mb-4 text-green-600">${property.pricePerNight} / night</p>

      <form onSubmit={handleBooking} className="flex flex-col gap-4">
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          required
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
