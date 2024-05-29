import { Link } from "react-router-dom";
import banner_IMG from "../assets/banner.jpeg";
import logo_IMG from "../assets/logo_big.png";

export const LandingPage = () => {
  return (
    <div className="w-full h-full bg-white">
      <div className="flex flex-row items-center justify-between w-full h-[8%] bg-white py-4 px-8">
        <div className="flex flex-row justify-center items-center">
          <img src={logo_IMG} alt="logo" className=" h-12" />
          <label className="font-bold text-2xl">Smart Swimming Pool</label>
        </div>

        <div>
          <Link
            to={"/login"}
            className="bg-black text-white font-semibold px-4 py-2 rounded-md"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-around mt-12">
        <div className="flex flex-col w-[40%]">
          <div className="flex flex-col">
            <label className="font-bold text-4xl">Clean Pools,</label>
            <label className="font-bold text-4xl text-center ml-5">
              {" "}
              healthier communities
            </label>
          </div>

          <p className="font-thin text-lg mt-12">
            a smart pool monitoring system which is capable of monitoring and
            predicting water quality parameters in real time is developed. The
            system updates in real time all the water quality values for user
            viewing with the support of internet facilities.
          </p>

          <div className=" mt-12">
            <Link
              to={"/login"}
              className="bg-black text-white text-2xl font-semibold px-6 py-2 rounded-full"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="w-[50%]">
          <img src={banner_IMG} alt="banner" className="rounded-lg" />
        </div>
      </div>
      <div className="flex justify-center items-center w-full mt-24 text-gray-700">
        <label className="font-semibold text-3xl">
          The only solution to Swimming pool monitoring
        </label>
      </div>
    </div>
  );
};
