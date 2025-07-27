import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

export default function EditProperty() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axiosInstance.get(`/properties/${id}`);
        const property = res.data;
        setTitle(property.title);
        setLocation(property.location);
        setPricePerNight(property.pricePerNight);
        setDescription(property.description);
      } catch {
        alert("Failed to load property.");
      }
    };
    fetchProperty();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.put(
        `/properties/${id}`,
        { title, location, pricePerNight, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/");
    } catch {
      alert("Failed to update property.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Property</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />
        <input
          value={pricePerNight}
          onChange={(e) => setPricePerNight(e.target.value)}
          placeholder="Price per night"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Update Property
        </button>
      </form>
    </div>
  );
}
