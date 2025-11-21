import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [brand, setBrand] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || !brand.trim()) {
      setError("Please fill in both fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/check`, {
        prompt: prompt,
        brandName: brand,
      });
      console.log(response.data);
      setLoading(false);
      if (response.data) {
        setResults((prev) => [...prev, response.data]);
      } else {
        setError("No data returned from API");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Using sample data.");
      setResults((prev) => [
        ...prev,
        {
          prompt,
          brand,
          mentioned: true,
          position: 1,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  };

  const handleDownloadCSV = () => {
    if (results.length === 0) return;

    const headers = ["Prompt", "Brand", "Mentioned", "Position"];
    const csvContent = [
      headers.join(","),
      ...results.map((item) =>
        [
          `"${item.prompt.replace(/"/g, '""')}"`,
          `"${item.brand}"`,
          item.mentioned ? "Yes" : "No",
          item.mentioned ? item.position : "N/A",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `brand-mention-results-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="app">
        <header>
          <h1>Gemini Brand Mention Checker</h1>
          <p>Check if your brand is mentioned in AI-generated content</p>
        </header>

        <main>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
              <label htmlFor="prompt">Enter your prompt:</label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., What are the best marketing tools?"
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="brand">Brand name to check:</label>
              <input
                type="text"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g., Matomo"
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Checking..." : "Check Mention"}
            </button>

            {error && <p className="error">{error}</p>}
          </form>

          {results.length > 0 && (
            <div className="results-container">
              <div className="results-header">
                <h2>Results</h2>
                <button onClick={handleDownloadCSV} className="download-btn">
                  Download CSV
                </button>
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Prompt</th>
                      <th>Brand</th>
                      <th>Mentioned</th>
                      <th>Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, index) => (
                      <tr key={index}>
                        <td>{result.prompt}</td>
                        <td>{result.brand}</td>
                        <td
                          className={
                            result.mentioned ? "mentioned-yes" : "mentioned-no"
                          }
                        >
                          {result.mentioned ? "Yes" : "No"}
                        </td>
                        <td>{result.mentioned ? result.position : "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>

        <footer>
          <p>Powered by Gemini AI • Model: gemini-1.5-pro • Temperature: 0.2</p>
        </footer>
      </div>
    </>
  );
}

export default App;
