import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      alert("Registration failed. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white font-sans p-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Join Us</h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none focus:border-blue-500 transition-colors"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none focus:border-blue-500 transition-colors"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            onClick={handleRegister}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold transition-colors shadow-lg"
          >
            Create Account
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;