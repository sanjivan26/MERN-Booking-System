/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AdminView = () => {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [usersRes, propertiesRes, bookingsRes] = await Promise.all([
        axiosInstance.get("/admin/users"),
        axiosInstance.get("/admin/properties"),
        axiosInstance.get("/admin/bookings"),
      ]);
      setUsers(usersRes.data);
      setProperties(propertiesRes.data);
      setBookings(bookingsRes.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Admin View</h2>

      <section className="mt-4">
        <h3 className="font-semibold">Users</h3>
        <ul>
          {users.map((u: any) => (
            <li key={u._id}>
              {u.name} - {u.email}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h3 className="font-semibold">Properties</h3>
        <ul>
          {properties.map((p: any) => (
            <li key={p._id}>{p.title}</li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h3 className="font-semibold">Bookings</h3>
        <ul>
          {bookings.map((b: any) => (
            <li key={b._id}>
              {b.user?.name} booked {b.property?.title}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminView;
