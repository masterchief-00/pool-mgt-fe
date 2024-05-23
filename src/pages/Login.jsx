import React from "react";
import { Link, useNavigate } from "react-router-dom";
import banner_IMG from "../assets/banner_login.jpg";

export default function Login() {
  const navigation = useNavigate();
  const handleLogin = () => {
    navigation("/dashboard");
  };
  return (
    <div className="flex flex-col item lg:flex-row justify-center bg-white lg:justify-between h-screen">
      <div className="flex flex-col w-full lg:w-auto items-center lg:py-8">
        <div className="w-full mt-[25%]">
          <div className="w-full flex flex-col items-center lg:items-start p-6 lg:space-y-10 lg:ml-24 sm:p-8 rounded-lg">
            <h2 className="hidden md:flex text-left text-4xl font-bold text-gray-900">
              Sign in to platform
            </h2>
            <h2 className="flex md:hidden text-left text-4xl font-bold text-gray-900">
              Sign in
            </h2>
            <form
              className="mt-8 space-y-6 w-full md:w-11/12"
              onSubmit={handleLogin}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  Your username
                </label>
                <input
                  type="text"
                  onChange={(event) => setUserName(event.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary_variant focus:border-secondary_variant block w-full p-2.5"
                  placeholder="e.g johndoe"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary_variant focus:border-secondary_variant block w-full p-2.5"
                />
              </div>
              <div className="flex">
                <Link
                  href="#"
                  className="text-sm text-secondary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-black rounded-lg hover:bg-secondary_variant focus:ring-4 focus:ring-primary-300 sm:w-auto"
              >
                Login to your account
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-col w-fit">
        <img
          src={banner_IMG}
          alt="banner"
          className="object-cover object-center h-full"
        />
      </div>
    </div>
  );
}
