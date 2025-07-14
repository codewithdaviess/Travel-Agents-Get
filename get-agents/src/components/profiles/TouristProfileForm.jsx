// TouristProfileForm.jsx
export default function TouristProfileForm() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="max-w-xl p-6 rounded-lg shadow-md border w-full">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Create Your Tourist Profile</h2>
        <p className="text-gray-700 mb-6">This is where the tourist profile form will go.</p>
        <button
          onClick={() => alert("Implement Tourist profile form here")}
          className="px-4 py-2 w-auto bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
