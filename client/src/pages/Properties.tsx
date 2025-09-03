import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

export default function Properties() {
  const { token } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState<{
    [key: string]: { start: string; end: string };
  }>({});

  useEffect(() => {
    axiosInstance
      .get("/properties")
      .then((res) => setProperties(res.data))
      .catch(() => setProperties([]))
      .finally(() => setLoading(false));
  }, []);

  const handleBooking = async (propertyId: string) => {
    if (!token) {
      alert("Please log in to book.");
      return;
    }

    const startDate = dates[propertyId]?.start;
    const endDate = dates[propertyId]?.end;

    if (!startDate || !endDate) {
      alert("Please select start and end dates.");
      return;
    }

    try {
      await axiosInstance.post(
        "/bookings",
        { propertyId, startDate, endDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Booking successful!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Booking failed.");
    }
  };

  if (loading) return <p>Loading properties...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Properties</h2>

      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="border p-4 rounded bg-gray-900 text-white"
            >
              <h3 className="text-lg font-bold">{property.name}</h3>
              <p>{property.location}</p>
              <p>${property.pricePerNight} / night</p>
              <p className="text-sm">{property.description}</p>

              {/* Date pickers */}
              <div className="mt-4 flex flex-col gap-2">
                <label className="text-gray-200 text-sm">Start Date</label>
                <input
                  type="date"
                  value={dates[property._id]?.start || ""}
                  onChange={(e) =>
                    setDates((prev) => ({
                      ...prev,
                      [property._id]: {
                        ...prev[property._id],
                        start: e.target.value,
                      },
                    }))
                  }
                  className="p-2 rounded bg-gray-800 text-gray-200 border border-gray-600"
                />

                <label className="text-gray-200 text-sm">End Date</label>
                <input
                  type="date"
                  value={dates[property._id]?.end || ""}
                  onChange={(e) =>
                    setDates((prev) => ({
                      ...prev,
                      [property._id]: {
                        ...prev[property._id],
                        end: e.target.value,
                      },
                    }))
                  }
                  className="p-2 rounded bg-gray-800 text-gray-200 border border-gray-600"
                />
              </div>

              {/* Book button */}
              <button
                onClick={() => handleBooking(property._id)}
                className="mt-3 bg-purple-600 px-4 py-2 rounded text-white"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
