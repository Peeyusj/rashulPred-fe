import { useState } from "react";
import Spinner from "./components/Spinner";
import bgImg from "./assets/bgImage.jpg";

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
  const [result, setResult] = useState(null);

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
      const response = await fetch(
        "https://2a20-110-226-193-81.ngrok-free.app/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adjustedFormData),
        }
      );

      const data = await response.json();
      setResult((data.prediction[0] * 100).toFixed(2) + "%");
    } catch (error) {
      console.error("Error:", error);
    }

    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen  text-white flex flex-col items-center"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header Section */}
      <header className="w-full fixed top-0 shadow-lg flex justify-between items-center py-4 px-8 z-10 bg-gray-800">
        <div className="flex items-center space-x-4">
          <img
            src="https://holisollogistics.com/wp-content/uploads/2019/10/Holisol-logo-155px-1.png"
            alt="Company Logo"
            className="h-12 w-36 shadow-xl" // Adding shadow
            style={{ filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8))" }} // Customize the shadow intensity
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center w-full px-4 pt-20 mb-10">
        {/* Hero Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl lg:max-w-5xl mt-5 text-white border border-gray-700"
        >
          <div className="mb-12 w-full text-center">
            <h1 className="text-2xl sm:text-3xl font-bold mt-8">
              Predict Your Business Model
            </h1>
          </div>

          {/* Row 1 Heading */}
          <h2 className="text-lg font-semibold mb-4">Revenue Data</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* First Row Inputs */}
            <div className="relative col-span-3">
              <label className="block text-gray-300 font-medium mb-1">
                Cost Plus Revenue
              </label>
              <input
                type="number"
                name="cost_plus_revenue"
                value={formData.cost_plus_revenue}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400"
              />
              <span className="absolute top-9 right-0 pr-3 flex items-center text-gray-400">
                %
              </span>
            </div>

            <div className="relative col-span-3">
              <label className="block text-gray-300 font-medium mb-1">
                Per Unit Revenue
              </label>
              <input
                type="number"
                name="per_unit_revenue"
                value={formData.per_unit_revenue}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400"
              />
              <span className="absolute top-9 right-0 pr-3 flex items-center text-gray-400">
                %
              </span>
            </div>
          </div>

          {/* Row 2 Heading */}
          <h2 className="text-lg font-semibold mb-4 mt-6">Contribution Data</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Second Row Inputs */}
            <div className="relative col-span-1">
              <label className="block text-gray-300 font-medium mb-1">
                FLS Contribution
              </label>
              <input
                type="number"
                name="fls_contribution"
                value={formData.fls_contribution}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400"
              />
              <span className="absolute top-9 right-0 pr-3 flex items-center text-gray-400">
                %
              </span>
            </div>

            <div className="relative col-span-1">
              <label className="block text-gray-300 font-medium mb-1">
                BPC Contribution
              </label>
              <input
                type="number"
                name="bpc_contribution"
                value={formData.bpc_contribution}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400"
              />
              <span className="absolute top-9 right-0 pr-3 flex items-center text-gray-400">
                %
              </span>
            </div>

            <div className="relative col-span-1">
              <label className="block text-gray-300 font-medium mb-1">
                Others Contribution
              </label>
              <input
                type="number"
                name="others_contribution"
                value={formData.others_contribution}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400"
              />
              <span className="absolute top-9 right-0 pr-3 flex items-center text-gray-400">
                %
              </span>
            </div>
          </div>

          {/* Row 3 Heading */}
          <h2 className="text-lg font-semibold mb-4 mt-6">
            Additional Revenue Data
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Third Row Inputs */}
            <div className="relative col-span-3">
              <label className="block text-gray-300 font-medium mb-1">
                Storage Revenue
              </label>
              <input
                type="number"
                name="storage_rev"
                value={formData.storage_rev}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400"
              />
              <span className="absolute top-9 right-0 pr-3 flex items-center text-gray-400">
                %
              </span>
            </div>

            <div className="relative col-span-3">
              <label className="block text-gray-300 font-medium mb-1">
                Handling Revenue
              </label>
              <input
                type="number"
                name="handling_revenue"
                value={formData.handling_revenue}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400"
              />
              <span className="absolute top-9 right-0 pr-3 flex items-center text-gray-400">
                %
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between mt-6">
            <button
              type="button"
              className="w-full sm:w-1/2 bg-gray-600 text-gray-200 py-2 px-4 rounded-lg mb-2 sm:mb-0 sm:mr-2 focus:outline-none hover:bg-gray-500"
              onClick={handleClear}
              disabled={isLoading}
            >
              Clear
            </button>
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-500 flex justify-center"
              disabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" /> : "Predict"}
            </button>
          </div>

          {/* Prediction Result */}
          {result && (
            <div className="mt-6 ">
              <p className="text-xl text-center text-green-500 font-bold">
                Prediction: {result}
              </p>
            </div>
          )}
        </form>
      </main>
    </div>
  );
};

export default App;
