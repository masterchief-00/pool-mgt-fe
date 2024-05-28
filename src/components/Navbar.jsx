import { FaRegCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export const Navbar = () => {
  const handleLogout = () => {
    localStorage.clear();

    window.location.href = "/";
  };
  return (
    <div className=" sticky top-0 flex w-full h-[10%] p-2">
      <div className=" flex flex-row items-center justify-between w-full h-full rounded-lg shadow-gray-400 bg-white p-2">
        <div className="flex flex-row justify-center items-center">
          <FaRegCalendarAlt className="text-gray-600" />
          <label className=" text-gray-700 ml-2">Monday, 5th March</label>
        </div>
        <div className="flex flex-row justify-center items-center">
          <FaLocationDot className="text-gray-600" />
          <label className=" text-gray-700 ml-2">Kigali, Serena Hotel</label>
        </div>
        <button
          onClick={() => handleLogout()}
          className="font-bold bg-black text-white py-2 px-4 rounded-3xl"
        >
          Log out
        </button>
      </div>
    </div>
  );
};
