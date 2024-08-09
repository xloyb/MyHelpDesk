// "use client"
// import React, { useEffect, useState } from "react";

// const ThemeToggle = () => {
//   const [theme, setTheme] = useState("dark");

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) {
//       setTheme(savedTheme);
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);

//     localStorage.setItem("theme", newTheme);

//     document.documentElement.setAttribute("data-theme", newTheme);
//   };

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//   }, [theme]);

//   return (
//     <label className="cursor-pointer grid place-items-center mr-4">
//       <input
//         type="checkbox"
//         checked={theme === "light"}
//         className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
//         onChange={toggleTheme}
//       />
//       <svg
//         className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
//         xmlns="http://www.w3.org/2000/svg"
//         width="14"
//         height="14"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <circle cx="12" cy="12" r="5" />
//         <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
//       </svg>
//       <svg
//         className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
//         xmlns="http://www.w3.org/2000/svg"
//         width="14"
//         height="14"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
//       </svg>
//     </label>
//   );
// };

// export default ThemeToggle;


"use client"
import React, { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="cursor-pointer grid place-items-center mr-2" onClick={toggleTheme}>
      {theme === "dark" ? (
        <MdSunny className="" size={24} />
      ) : (
        <FaMoon className="" size={24} />
      )}
    </div>
  );
};

export default ThemeToggle;
