import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function TestApi() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h1>Users from Backend:</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

// import { useEffect, useState } from "react";

// export default function TestApi() {
//   const [message, setMessage] = useState<string>("Loading...");

//   useEffect(() => {
//     fetch("/api/test")
//       .then((res) => res.json())
//       .then((data) => setMessage(data.message))
//       .catch((err) => setMessage("Error: " + err.message));
//   }, []);

//   return (
//     <div>
//       <h1>Backend Response:</h1>
//       <p>{message}</p>
//     </div>
//   );
// }
