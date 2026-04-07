import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4 px-6 text-white border-b border-gray-700 shadow-md">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-xl font-extrabold text-blue-500 tracking-tight">🔗 URL SHORTENER</span>
      </Link>
      <div className="flex gap-4 items-center">
        <button
          onClick={logout}
          className="bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg font-medium transition-all text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;