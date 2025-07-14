import { useState } from "react";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import CheckboxField from "./CheckboxField";
import GoogleButton from "../common/GoogleButton";
import Divider from "../common/Divider";
import CountrySelect from "../common/CountrySelect";
import VerifyScreen from "../common/VerifyScreen";
import FormTitle from "../form/FormTitle";

export default function SignupForm({
  accountType,         // "agent" or "tourist"
  fields,              // array of { label, name, type, placeholder, ... }
  termsText,           // JSX or string for terms & policy links
  onProfileContinue,   // callback when verification passes and profile step starts
}) {
  // Initialize formData with keys from fields
  const initialData = fields.reduce((acc, field) => {
    if (field.type === "checkbox") acc[field.name] = false;
    else acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialData);
  const [step, setStep] = useState("form");
  const [isVerifying, setIsVerifying] = useState(false);

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
      setStep("verify");
    }, 2000);
  };

  if (step === "verify") {
    return (
      <VerifyScreen
        email={formData.email}
        onVerify={() => {
          setStep("profile");
          if (onProfileContinue) onProfileContinue(formData);
        }}
        onBack={() => setStep("form")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 py-10">
      <FormTitle title={`Sign up as a ${accountType.charAt(0).toUpperCase() + accountType.slice(1)}`} />

      <div className="w-full max-w-lg p-6 space-y-6">
        <GoogleButton text="Continue with Google" />
        <Divider />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Inputs - Responsive */}
          <div className="flex flex-col lg:flex-row gap-2 w-full">
            {fields
              .filter((field) => field.group === "name")
              .map(({ label, name }) => (
                <TextInput
                  key={name}
                  label={label}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full lg:w-1/2"
                />
              ))}
          </div>

          {/* Other inputs */}
          {fields
            .filter((field) => field.group !== "name" && field.type !== "checkbox" && field.type !== "country")
            .map(({ label, name, type, placeholder }) =>
              type === "password" ? (
                <PasswordInput
                  key={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                />
              ) : (
                <TextInput
                  key={name}
                  label={label}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                />
              )
            )}

          {/* Country Select */}
          {fields.some((f) => f.type === "country") && (
            <CountrySelect value={formData.country} onChange={handleCountryChange} />
          )}

          {/* Checkboxes */}
          <div className="flex flex-col gap-4 mt-2 text-sm text-gray-700">
            {fields
              .filter((field) => field.type === "checkbox")
              .map(({ label, name }) => (
                <CheckboxField
                  key={name}
                  name={name}
                  checked={formData[name]}
                  onChange={handleChange}
                  label={label}
                />
              ))}
          </div>

          {/* Terms */}
          <div className="text-xs text-gray-700 mt-2">{termsText}</div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-2 rounded-md text-sm font-medium transition bg-green-500 text-white hover:bg-green-600 disabled:opacity-60"
          >
            {isVerifying ? "Creating account ..." : "Create my account"}
          </button>

          <p className="mt-4 text-md text-gray-700 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 underline">
              Log In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
