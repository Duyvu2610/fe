import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const [isAddHref, setIsAddHref] = useState(
    window.location.href === "http://localhost:3000/students/add"
  );
  const handleLogout = () => {
    sessionStorage.removeItem("username");
    navigate("/");
  };
  return (
    <header className="flex justify-between">
      <img
        src="https://create.runsystem.info/f64f41168cd733a600cf44015894952a.png"
        alt=""
        className="w-[300px]"
      />
      <div className="flex gap-8">
        {!isAddHref && <p>Welcome, {sessionStorage.getItem("username")}</p>}
        <button
          href="/"
          class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
