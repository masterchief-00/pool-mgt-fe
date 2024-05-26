import { useSelector } from "react-redux";
import { SideNav } from "./SideNav.jsx";
import { FaCircleUser } from "react-icons/fa6";
import LOGO_IMG from "../assets/logo.png";

export const Sidebar = () => {
  const activeLink = useSelector((state) => state.activeLinks.active);
  const userState = useSelector((state) => state.user);

  return (
    <div className=" w-[22%] h-screen p-2">
      <div className="flex flex-col items-center w-full h-full rounded-lg shadow-md border-2 border-gray-200 shadow-gray-400 bg-gray-100">
        <div className="flex flex-col gap-4 justify-center items-center w-full p-4">
          <img src={LOGO_IMG} alt="logo" />
          <div className="  w-[90%] h-[1px] bg-gray-700 opacity-20" />
        </div>
        <div className="flex flex-col flex-1 justify-start gap-4 w-full p-4">
          <SideNav
            label={"Overview"}
            destination={"/dashboard"}
            active={activeLink === "Overview"}
          />
          {userState.role === "admin" && (
            <SideNav
              label={"Pools"}
              destination={"/pool/create"}
              active={activeLink === "Pools"}
            />
          )}

          {userState.role === "admin" && (
            <SideNav
              label={"Operators"}
              destination={"/operator/create"}
              active={activeLink === "Operators"}
            />
          )}
        </div>
        <div className="  w-[90%] h-[1px] bg-gray-700 opacity-20" />
        <div className="flex flex-row w-full gap-2 items-center h-[10%] p-6">
          <FaCircleUser size={45} />
          <div className="flex flex-col">
            <label className=" font-semibold text-xl">Kalinda Vital</label>
            <label className="text-gray-700 text-sm">{userState.role}</label>
          </div>
        </div>
      </div>
    </div>
  );
};