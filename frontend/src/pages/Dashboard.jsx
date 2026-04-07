import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // 🔹 Create URL
  const handleShorten = async () => {
    if (!url) return alert("Please enter a URL");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (res.ok) {
        setShortUrl(data.shortURL);
        setUrl("");
        fetchUrls();
      } else {
        alert(data.error || "Failed to shorten URL");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Get user URLs
  const fetchUrls = async () => {
    try {
      const res = await fetch("http://localhost:3000/url/myurls", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUrls(data);
      }
    } catch (err) {
      console.error("Failed to fetch URLs", err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <Navbar />

      <main className="p-6 max-w-2xl mx-auto">
        <section className="bg-gray-800 p-6 rounded-2xl shadow-xl mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Shorten a new URL</h2>
          <div className="flex gap-2">
            <input
              placeholder="https://example.com/very-long-url"
              className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none focus:border-blue-500 transition-colors"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleShorten()}
            />
            <button
              onClick={handleShorten}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
            >
              {loading ? "..." : "Shorten"}
            </button>
          </div>

          {shortUrl && (
            <div className="mt-4 p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg flex items-center justify-between">
              <span className="text-blue-300 font-mono overflow-hidden text-ellipsis mr-2">
                {shortUrl}
              </span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(shortUrl);
                  alert("Copied!");
                }}
                className="text-xs bg-blue-600 px-2 py-1 rounded"
              >
                Copy
              </button>
            </div>
          )}
        </section>

        {/* User URLs */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">My Recent Links</h2>
            <span className="bg-gray-800 px-3 py-1 rounded-full text-xs text-gray-400">
              {urls.length} Total
            </span>
          </div>

          <div className="space-y-3">
            {urls.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No URLs shortened yet.</p>
            ) : (
              urls.map((item) => (
                <div key={item._id} className="bg-gray-800 p-4 rounded-xl shadow border border-gray-700 hover:border-gray-600 transition-colors group">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-400 truncate mb-1">{item.redirectURL}</p>
                      <a 
                        href={`http://localhost:3000/${item.shortId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 font-medium hover:underline"
                      >
                        {`http://localhost:3000/${item.shortId}`}
                      </a>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-lg font-bold text-gray-200">{item.visitHistory.length}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider">Clicks</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;