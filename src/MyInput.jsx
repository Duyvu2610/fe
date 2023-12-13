function MyInput({
  type,
  id,
  className,
  onChange,
  value,
  name,
  maxLength,
  disable,
  readOnly,
}) {
  return (
    <input
      name={name}
      type={type}
      maxLength={maxLength}
      id={id}
      disabled={disable}
      onChange={onChange}
      value={value}
      readOnly={readOnly}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block disabled:cursor-not-allowed disabled:bg-gray-300 ${className}`}
    />
  );
}

export default MyInput;
