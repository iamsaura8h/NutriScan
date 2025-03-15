import { useState } from "react";

export default function App() {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImage(URL.createObjectURL(file));
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("dishImage", file);

        try {
            const res = await fetch("http://localhost:5000/analyze", {
                method: "POST",
                body: formData
            });

            if (!res.ok) {
                throw new Error("Failed to analyze image");
            }

            const data = await res.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">NutriScan</h1>

            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg text-center">
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleUpload} 
                    className="mb-4 border p-2 rounded w-full cursor-pointer"
                />
                {image && <img src={image} alt="Dish Preview" className="w-48 mx-auto mt-4 rounded-lg shadow-md" />}

                {loading && <p className="mt-4 text-blue-500">Analyzing image...</p>}
                {error && <p className="mt-4 text-red-500">{error}</p>}

                {result && (
                    <div className="mt-6 p-4 bg-gray-50 border rounded-lg shadow text-left">
                        <h2 className="text-xl font-semibold text-gray-800 text-center">Dish: {result.dish}</h2>
                        <p className="text-gray-600"><strong>Calories (per 100g):</strong> {result.calories_per_100g}</p>
                        <p className="text-gray-600"><strong>Protein:</strong> {result.protein_per_100g}</p>
                        <p className="text-gray-600"><strong>Carbs:</strong> {result.carbs_per_100g}</p>
                        <p className="text-gray-600"><strong>Fat:</strong> {result.fat_per_100g}</p>

                        {/* Additional Nutrients */}
                        <h3 className="mt-4 font-bold">Additional Nutrients (per 100g):</h3>
                        <p className="text-gray-600"><strong>Carbohydrates:</strong> {result.carbs_per_100g}</p>
                        {/* <p className="text-gray-600"><strong>Saturated Fat:</strong> {result.saturated_fat_per_100g}</p>
                        <p className="text-gray-600"><strong>Net Carbohydrates:</strong> {result.net_carbohydrates_per_100g}</p> */}
                        <p className="text-gray-600"><strong>Sugar:</strong> {result.sugar_per_100g}</p>
                        <p className="text-gray-600"><strong>Cholesterol:</strong> {result.cholesterol_per_100g}</p>
                        <p className="text-gray-600"><strong>Sodium:</strong> {result.sodium_per_100g}</p>
                        <p className="text-gray-600"><strong>Fiber:</strong> {result.fiber_per_100g}</p>

                        {/* Vitamins */}
                        <h3 className="mt-4 font-bold">Vitamins (per 100g):</h3>
                        <p className="text-gray-600"><strong>Vitamin A:</strong> {result.vitamin_a_per_100g}</p>
                        <p className="text-gray-600"><strong>Vitamin B1:</strong> {result.vitamin_b1_per_100g}</p>
                        <p className="text-gray-600"><strong>Vitamin B2:</strong> {result.vitamin_b2_per_100g}</p>
                        <p className="text-gray-600"><strong>Vitamin B3:</strong> {result.vitamin_b3_per_100g}</p>
                        <p className="text-gray-600"><strong>Vitamin B5:</strong> {result.vitamin_b5_per_100g}</p>
                        <p className="text-gray-600"><strong>Vitamin B6:</strong> {result.vitamin_b6_per_100g}</p>
                        <p className="text-gray-600"><strong>Vitamin B12:</strong> {result.vitamin_b12_per_100g}</p>
                        <p className="text-gray-600"><strong>Vitamin C:</strong> {result.vitamin_c_per_100g}</p>
                        <p className="text-gray-600"><strong>Vitamin E:</strong> {result.vitamin_e_per_100g}</p>
                        <p className="text-gray-600"><strong>Vitamin K:</strong> {result.vitamin_k_per_100g}</p>

                        {/* Minerals */}
                        <h3 className="mt-4 font-bold">Minerals (per 100g):</h3>
                        <p className="text-gray-600"><strong>Calcium:</strong> {result.calcium_per_100g}</p>
                        <p className="text-gray-600"><strong>Iron:</strong> {result.iron_per_100g}</p>
                        <p className="text-gray-600"><strong>Magnesium:</strong> {result.magnesium_per_100g}</p>
                        <p className="text-gray-600"><strong>Phosphorus:</strong> {result.phosphorus_per_100g}</p>
                        <p className="text-gray-600"><strong>Potassium:</strong> {result.potassium_per_100g}</p>
                        <p className="text-gray-600"><strong>Selenium:</strong> {result.selenium_per_100g}</p>
                        <p className="text-gray-600"><strong>Zinc:</strong> {result.zinc_per_100g}</p>
                        <p className="text-gray-600"><strong>Copper:</strong> {result.copper_per_100g}</p>
                        <p className="text-gray-600"><strong>Manganese:</strong> {result.manganese_per_100g}</p>
                        <p className="text-gray-600"><strong>Folate:</strong> {result.folate_per_100g}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
