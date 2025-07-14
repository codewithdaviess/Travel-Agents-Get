// TouristSignup.jsx
import SignupForm from "../components/form/SignupForm";
import TouristProfileForm from "../components/profiles/TouristProfileForm";

import { useState } from "react";

export default function TouristSignup() {
  const [showProfile, setShowProfile] = useState(false);
  const [touristData, setTouristData] = useState(null);

  // Fields specific to Tourist
  const fields = [
    { group: "name", label: "First Name", name: "firstName", type: "text" },
    { group: "name", label: "Last Name", name: "lastName", type: "text" },
    { label: "Email Address", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password", placeholder: "Password (8 or more characters)" },
    { label: "Country", name: "country", type: "country" },
    { label: "Yes, send me tips about top destinations and guides.", name: "receiveTips", type: "checkbox" },
    { label: null, name: "agreeTerms", type: "checkbox" },
  ];

  const termsText = (
    <>
      I agree to the{" "}
      <a href="#" className="text-green-600 underline">Tourist Terms of Service</a>, including the{" "}
      <a href="#" className="text-green-600 underline">User Agreement</a> and{" "}
      <a href="#" className="text-green-600 underline">Privacy Policy</a>.
    </>
  );

  return (
    <>
      {!showProfile ? (
        <SignupForm
          accountType="tourist"
          fields={fields}
          termsText={termsText}
          onProfileContinue={(data) => {
            setTouristData(data);
            setShowProfile(true);
          }}
        />
      ) : (
        <TouristProfileForm initialData={touristData} />
      )}
    </>
  );
}
