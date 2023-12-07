function MyButton({ className, onClick, children }) {
  return (
    <button
      className={`bg-slate-300 px-6 rounded-lg hover:bg-slate-400 transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default MyButton;
