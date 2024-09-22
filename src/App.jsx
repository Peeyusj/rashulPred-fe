import { useState } from "react";
import Spinner from "./components/Spinner";

const App = () => {
  const [formData, setFormData] = useState({
    cost_plus_revenue: "",
    per_unit_revenue: "",
    fls_contribution: "",
    bpc_contribution: "",
    others_contribution: "",
    storage_rev: "",
    handling_revenue: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null); // State to store API result

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClear = () => {
    setFormData({
      cost_plus_revenue: "",
      per_unit_revenue: "",
      fls_contribution: "",
      bpc_contribution: "",
      others_contribution: "",
      storage_rev: "",
      handling_revenue: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adjustedFormData = {
      cost_plus_revenue: formData.cost_plus_revenue / 100,
      per_unit_revenue: formData.per_unit_revenue / 100,
      fls_contribution: formData.fls_contribution / 100,
      bpc_contribution: formData.bpc_contribution / 100,
      others_contribution: formData.others_contribution / 100,
      storage_rev: formData.storage_rev / 100,
      handling_revenue: formData.handling_revenue / 100,
    };

    setIsLoading(true);

    try {
      const response = await fetch(" https://677d-27-60-137-211.ngrok-free.app/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adjustedFormData),
      });

      const data = await response.json();
      setResult((data.prediction[0] * 100).toFixed(2) + "%"); // Show as percentage
    } catch (error) {
      console.error("Error:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl"
      >
        <h1 className="text-xl font-bold text-center mb-4">Business Model</h1>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="relative">
              <label className="block text-gray-700 font-medium mb-1 capitalize">
                {key.replace(/_/g, " ")}
              </label>
              <input
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-10"
              />
              <span className="absolute top-9 right-0 pr-3 flex items-center text-gray-400">
                %
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="w-1/2 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-2 focus:outline-none hover:bg-gray-400"
            onClick={handleClear}
            disabled={isLoading}
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="w-1/2 bg-blue-500 flex items-center justify-center gap-2 text-white py-2 px-4 rounded-lg ml-2 focus:outline-none hover:bg-blue-600"
          >
            {isLoading && <Spinner fillColor="#fff" className="!text-sm" />}
            Find prediction
          </button>
        </div>

        {result && (
          <div className="mt-4 text-center text-green-600">
            <h2 className="font-bold text-lg">Prediction Result</h2>
            <p>{result?`${result} %`:"N/A"}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default App;
