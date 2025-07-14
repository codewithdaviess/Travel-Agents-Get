export default function FormTitle({ title, subtitle }) {
  return (
    <div className="max-w-md w-full text-center mb-8">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
    </div>
  );
}
