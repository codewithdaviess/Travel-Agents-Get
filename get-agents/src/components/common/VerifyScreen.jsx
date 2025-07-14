import { useState } from "react";
import { Mail, Loader2 } from "lucide-react"; // ⬅️ Import Loader2

export default function VerifyScreen({ email, onVerify, onBack }) {
  const [loading, setLoading] = useState(false);

  const handleVerifyClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onVerify(); // Proceed to profile creation
    }, 2000);
  };

  const openGmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center bg-white">
      <div className="max-w-md w-full p-6 rounded-lg shadow-md border">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 text-green-600 rounded-full p-3">
            <Mail className="w-6 h-6" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Verify Your Email
        </h2>

        {/* Message */}
        <p className="text-gray-700 mb-6">
          We've sent a confirmation link to <br />
          <span className="font-medium">{email}</span>.<br />
          Please check your inbox to complete your signup.
        </p>

        {/* Buttons side by side */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleVerifyClick}
            disabled={loading}
            className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "I’ve Verified My Email"
            )}
          </button>

          <button
            onClick={openGmail}
            type="button"
            className="w-full py-2 border border-gray-500 text-gray-600 rounded-md hover:bg-green-50 text-sm"
          >
            Open Gmail
          </button>
        </div>

        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            type="button"
            className="w-full mt-4 text-sm text-green-600 hover:underline"
          >
            Back to Form
          </button>
        )}
      </div>
    </div>
  );
}
