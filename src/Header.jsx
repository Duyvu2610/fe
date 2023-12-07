function Header() {
  return (
    <header className="flex justify-between">
      <img
        src="https://create.runsystem.info/f64f41168cd733a600cf44015894952a.png"
        alt=""
        className="w-[300px]"
      />
      <div className="flex gap-8">
        <p>Welcome, vu</p>
        <a href="/" className="text-blue-700 underline hover:text-red-600">
          Logout
        </a>
      </div>
    </header>
  );
}

export default Header;
