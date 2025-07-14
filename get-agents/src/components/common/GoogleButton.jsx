import { FcGoogle } from "react-icons/fc";

export default function GoogleButton({ text = "Continue with Google", onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full border border-gray-300 rounded-lg flex items-center justify-center gap-2 py-2 hover:bg-gray-50 transition"
      type="button"
    >
      <FcGoogle className="text-xl" />
      <span className="text-sm font-medium text-gray-700">{text}</span>
    </button>
  );
}
