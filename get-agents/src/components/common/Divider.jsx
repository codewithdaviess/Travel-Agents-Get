export default function Divider({ text = "or" }) {
  return (
    <div className="flex items-center gap-4">
      <hr className="flex-1 border-gray-300" />
      <span className="text-sm text-gray-500">{text}</span>
      <hr className="flex-1 border-gray-300" />
    </div>
  );
}
