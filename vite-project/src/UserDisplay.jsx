import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDisplay() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [dog, setDog] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/user"),
      axios.get("https://dog.ceo/api/breeds/image/random"),
    ])
      .then(([u, d]) => {
        setUser(u.data);
        setDog(d.data.message);
      })
      .catch(() => setError("Failed to fetch data."));
  }, []);

  const getAge = (dob) => {
    const today = new Date();
    const birth = new Date(dob);
    let years = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) years--;
    return years;
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }
  if (!user || !dog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
        <p className="text-gray-600 dark:text-gray-400">Loading…</p>
      </div>
    );
  }

  const age = getAge(user.dob);
  const displayDob = new Date(user.dob).toLocaleDateString("en-GB").replace(/\//g, "-");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 py-8">
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden max-w-lg w-full transform hover:scale-105 transition duration-300">
        {/* Image Header */}
        <div className="relative h-60 overflow-hidden">
          <img src={dog} alt="Profile" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="p-6 text-center space-y-4">
          {/* Avatar */}
          <img
            src={dog}
            alt="Avatar"
            className="mx-auto -mt-16 w-32 h-32 object-cover rounded-full border-4 border-white dark:border-gray-800"
          />
          {/* Name */}
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {user.firstName} {user.lastName}
          </h2>
          <div className="text-gray-600 dark:text-gray-300 space-y-1">
            <p><span className="font-medium">DOB:</span> {displayDob}</p>
            <p><span className="font-medium">Age:</span> {age} years</p>
          </div>
          <button
            onClick={() => nav("/")}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 active:scale-95 focus:ring-2 focus:ring-blue-400 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
