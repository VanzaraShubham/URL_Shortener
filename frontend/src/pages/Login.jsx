import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      alert("Login failed. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white font-sans p-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Welcome Back</h2>

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
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold transition-colors shadow-lg"
          >
            Log In
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          New here?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;