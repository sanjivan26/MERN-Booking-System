/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // To check if user is logged in

interface Property {
  _id: string;
  title: string;
  location: string;
  pricePerNight: number;
  description: string;
}

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useAuth(); // Token indicates login

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axiosInstance.get("/properties");
        setProperties(res.data);
      } catch (err: any) {
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      await axiosInstance.delete(`/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties((prev) => prev.filter((prop) => prop._id !== id));
    } catch (error) {
      alert("Failed to delete property.");
    }
  };

  if (loading) return <p className="text-center">Loading properties...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {properties.map((prop) => (
        <div key={prop._id} className="border p-4 shadow rounded">
          <h2 className="font-bold text-xl">{prop.title}</h2>
          <p className="text-gray-500">{prop.location}</p>
          <p className="mt-2 text-green-600">${prop.pricePerNight} / night</p>
          <p className="text-sm mt-2">{prop.description}</p>
          <div className="mt-4 flex gap-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => navigate(`/book/${prop._id}`)}
            >
              Book Now
            </button>
            {token && (
              <>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                  onClick={() => navigate(`/edit-property/${prop._id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(prop._id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Properties;
