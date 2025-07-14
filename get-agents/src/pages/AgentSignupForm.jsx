// AgentSignup.jsx
import SignupForm from "../components/form/SignupForm";
import AgentProfileForm from "../components/profiles/AgentProfileForm";

import { useState } from "react";

export default function AgentSignup() {
  const [showProfile, setShowProfile] = useState(false);
  const [agentData, setAgentData] = useState(null);

  // Fields specific to Agent
  const fields = [
    { group: "name", label: "First Name", name: "firstName", type: "text" },
    { group: "name", label: "Last Name", name: "lastName", type: "text" },
    { label: "Work Email Address", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password", placeholder: "Password (8 or more characters)" },
    { label: "Country", name: "country", type: "country" },
    { label: "Send me emails with tips on how to find talent that fits my needs.", name: "sendTips", type: "checkbox" },
    { label: null, name: "agreeTerms", type: "checkbox" }, // Terms handled separately in termsText
  ];

  const termsText = (
    <>
      I agree to the{" "}
      <a href="#" className="text-green-600 underline">Terms of Service</a>, including the{" "}
      <a href="#" className="text-green-600 underline">User Agreement</a> and{" "}
      <a href="#" className="text-green-600 underline">Privacy Policy</a>.
    </>
  );

  return (
    <>
      {!showProfile ? (
        <SignupForm
          accountType="agent"
          fields={fields}
          termsText={termsText}
          onProfileContinue={(data) => {
            setAgentData(data);
            setShowProfile(true);
          }}
        />
      ) : (
        <AgentProfileForm initialData={agentData} />
      )}
    </>
  );
}
