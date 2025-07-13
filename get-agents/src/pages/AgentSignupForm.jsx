import { useState, useRef, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import countries from "world-countries";
import Flag from "react-world-flags";
import { Link } from "react-router-dom";

// Country dropdown component
function CountrySelect({ value, onChange }) {
  const countryList = countries
    .map((c) => ({
      name: c.name.common,
      cca2: c.cca2,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCountry = countryList.find((c) => c.name === value);

  return (
    <div className="flex flex-col gap-1 w-full" ref={dropdownRef}>
      <label className="text-sm text-gray-700 font-medium">Country</label>
      <div className="relative">
        <div
          className={`w-full px-3 py-2 border rounded-md text-sm flex items-center justify-between text-gray-700 ${
            isOpen
              ? "ring-2 ring-green-500"
              : "focus-within:ring-2 focus-within:ring-green-500"
          }`}
          onClick={() => setIsOpen((open) => !open)}
        >
          <div className="flex items-center gap-2">
            {selectedCountry ? (
              <Flag
                code={selectedCountry.cca2}
                className="w-5 h-4 object-cover border"
                alt={selectedCountry.name}
              />
            ) : (
              <span className="text-gray-400 text-sm">Select Country</span>
            )}
            <span className="text-sm">
              {selectedCountry ? selectedCountry.name : ""}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>

        {isOpen && (
          <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
            {countryList.map((c) => (
              <li
                key={c.cca2}
                onClick={() => {
                  onChange(c.name);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-green-100 text-sm"
              >
                <Flag
                  code={c.cca2}
                  className="w-5 h-4 object-cover border"
                  alt={c.name}
                />
                <span>{c.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Main form component
export default function AgentSignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    sendTips: false,
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showVerifyScreen, setShowVerifyScreen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCountryChange = (country) => {
    setFormData((prev) => ({ ...prev, country }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setShowVerifyScreen(true);
    }, 2000);
  };

  // After submit
  if (showVerifyScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center bg-white">
        <div className="max-w-md p-6 rounded-lg shadow-md border">
          <h2 className="text-2xl font-bold text-green-600 mb-2">Verify Your Email</h2>
          <p className="text-gray-700 mb-4">
            We've sent a confirmation link to <span className="font-medium">{formData.email}</span>.<br />
            Please check your inbox to complete your signup.
          </p>
          <button
            onClick={() => setShowVerifyScreen(false)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
          >
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 py-10">
      <div className="max-w-md w-full text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Sign up as an Agent</h2>
      </div>

      <div className="w-full max-w-lg p-6 space-y-6">
        <button className="w-full border border-gray-300 rounded-lg flex items-center justify-center gap-2 py-2 hover:bg-gray-50 transition">
          <FcGoogle className="text-xl" />
          <span className="text-sm font-medium text-gray-700">Sign up with Google</span>
        </button>

        <div className="flex items-center gap-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First & Last Name */}
          <div className="flex gap-4">
            <div className="w-1/2 flex flex-col gap-1">
              <label htmlFor="firstName" className="text-sm text-gray-700 font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-1">
              <label htmlFor="lastName" className="text-sm text-gray-700 font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-gray-700 font-medium">
              Work Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="text-sm text-gray-700 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password (8 or more characters)"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 pr-10 border rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Country */}
          <CountrySelect value={formData.country} onChange={handleCountryChange} />

          {/* Checkboxes */}
          <div className="flex flex-col gap-4 mt-2 text-sm text-gray-700">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="sendTips"
                checked={formData.sendTips}
                onChange={handleChange}
                className="rounded w-auto h-3 border-gray-300 text-green-600 focus:ring-green-500"
                style={{ transform: "scale(1.5)" }}
              />
              <span className="ml-2 leading-tight">
                Send me emails with tips on how to find talent that fits my needs.
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="rounded w-auto h-3 border-gray-300 text-green-600 focus:ring-green-500"
                style={{ transform: "scale(1.5)" }}
              />
              <span className="ml-2 leading-tight">
                I agree to the{" "}
                <a href="#" className="text-green-600 underline">Terms of Service</a>, including the{" "}
                <a href="#" className="text-green-600 underline">User Agreement</a> and{" "}
                <a href="#" className="text-green-600 underline">Privacy Policy</a>.
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-md text-sm font-medium transition bg-green-500 text-white hover:bg-green-600 disabled:opacity-60"
            disabled={isVerifying}
          >
            {isVerifying ? "Creating account..." : "Create my account"}
          </button>

          <p className="mt-4 text-md text-gray-700 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 underline">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
