import { UserPlus, MapPinned, ShieldCheck } from "lucide-react";

export default function AgentProfileForm() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white px-4">
      <div className="max-w-2xl w-full mx-auto py-12">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-[#333333]">
            Ready to share your expertise and start earning?
          </h2>
        </div>

        {/* Steps */}
        <div className="space-y-9">
          {/* Step 1 */}
          <div className="flex items-start gap-5">
            <UserPlus className="text-[#333333] w-auto h-12 lg:h-7  mt-1" />
            <p className="text-base text-[#333333] leading-relaxed">
              Answer a few questions and start building your professional agent
              profile.
            </p>
          </div>

          <div className="border-t border-gray-200" />

          {/* Step 2 */}
          <div className="flex items-start gap-5">
            <MapPinned className="text-[#333333] w-auto h-12 lg:h-7 mt-1" />
            <p className="text-base text-[#333333] leading-relaxed">
              Offer local travel services or guided experiences to clients
              around the world.
            </p>
          </div>

          <div className="border-t border-gray-200" />

          {/* Step 3 */}
          <div className="flex items-start gap-5">
            <ShieldCheck className="text-[#333333] w-auto h-12 lg:h-7  mt-1" />
            <p className="text-base text-gray-700 leading-relaxed">
              Get booked, get paid securely, and rely on us for support every
              step of the way.
            </p>
          </div>

          <div className="border-t border-gray-200" />

          {/* Info Text */}
          <p className="text-sm text-center text-gray-500 mt-6">
            It usually takes up to 5–10 minutes to complete your profile.
          </p>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="w-full px-4 py-6 bg-white">
        <div className="max-w-2xl mx-auto flex justify-center">
          <button
            onClick={() => alert("Start the multi-step form here")}
            className="w-full lg:w-auto px-6 py-3 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
