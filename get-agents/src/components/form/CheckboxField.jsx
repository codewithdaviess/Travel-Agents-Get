function CheckboxField({ name, checked, onChange, label }) {
  return (
    <label className="inline-flex items-start text-sm text-gray-700">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="rounded w-auto h-3 border-gray-300 text-green-600 focus:ring-green-500 mt-1"
        style={{ transform: "scale(1.5)" }}
      />
      <span className="ml-2 leading-tight">{label}</span>
    </label>
  );
}

export default CheckboxField;
