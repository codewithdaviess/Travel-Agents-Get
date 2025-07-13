import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldUser, UserCircle, CheckCircle2 } from "lucide-react";

export default function SelectAccountType() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selected) return;
    if (selected === "agent") {
      navigate("/signup-agent");
    } else {
      navigate("/signup-tourist");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-10 text-center">
        Join as a tourist or agent
      </h2>

      {/* Card Container */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mb-8 w-full px-4">
        {/* Agent Card */}
        <div
          onClick={() => setSelected("agent")}
          className={`cursor-pointer w-full max-w-sm p-5 flex flex-col justify-start items-start rounded-lg shadow-md border transition
            ${
              selected === "agent"
                ? "bg-green-100 border-green-400"
                : "bg-white border-gray-300"
            }
          `}
        >
          <div className="flex items-center justify-between w-full mb-3">
            <ShieldUser className="w-8 h-8 text-green-600" />
            {selected === "agent" && (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Agent</h3>
          <p className="text-md text-gray-600 mt-2">
            I’m a tour guide or travel agent offering my services.
          </p>
        </div>

        {/* Tourist Card */}
        <div
          onClick={() => setSelected("tourist")}
          className={`cursor-pointer w-full max-w-sm p-5 flex flex-col justify-start items-start rounded-lg shadow-md border transition
            ${
              selected === "tourist"
                ? "bg-green-100 border-green-400"
                : "bg-white border-gray-300"
            }
          `}
        >
          <div className="flex items-center justify-between w-full mb-3">
            <UserCircle className="w-8 h-8 text-green-600" />
            {selected === "tourist" && (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Tourist</h3>
          <p className="text-md text-gray-600 mt-2">
            I’m a tourist, looking for tour guides and travel help.
          </p>
        </div>
      </div>

      {/* Button and Log In */}
      <div className="w-full max-w-sm flex flex-col items-center px-4">
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`w-full max-w-md lg:max-w-xs px-6 py-3 rounded transition font-medium ${
            selected
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {selected === "agent" && "Apply as Agent"}
          {selected === "tourist" && "Join as Tourist"}
          {!selected && "Create Account"}
        </button>

        <p className="mt-4 text-md text-gray-700 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
