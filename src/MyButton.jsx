function MyButton({ className, onClick, disable, children }) {
  return (
    <button
      className={`text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 ${className}`}
      onClick={onClick}
      disabled={disable}
    >
      {children}
    </button>
  );
}

export default MyButton;
