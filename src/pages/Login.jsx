import React, { useEffect, useState } from "react";
import banner_IMG from "../assets/banner_login.jpg";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../redux/slices/loginSlice";
import { loginSchema } from "../validation/loginSchema";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const authHandler = useSelector((state) => state.login);
  const navigation = useNavigate();

  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    e.preventDefault();

    setLoginData((prevState) => ({
      ...prevState,
      email: e.target.name === "email" ? e.target.value : prevState.email,
      password: e.target.name === "pwd" ? e.target.value : prevState.password,
    }));
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const formData = {
        email: String(loginData.email),
        password: String(loginData.password),
      };

      if (validateForm(formData)) {
        dispatch(auth(formData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = (data) => {
    const { error } = loginSchema.validate(data, { abortEarly: false });
    if (!error) {
      setErrors({});
      return true;
    }

    const newErrors = {};
    error.details.forEach((detail) => {
      newErrors[detail.path[0]] = detail.message;
    });
    setErrors(newErrors);
    return false;
  };

  useEffect(() => {
    if (authHandler.serverResponded) {
      navigation("/dashboard");
    }
  }, [authHandler.serverResponded]);

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
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  Your Email
                </label>
                <input
                  type="text"
                  name="email"
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary_variant focus:border-secondary_variant block w-full p-2.5"
                  placeholder="e.g johndoe"
                />
                {errors.email && (
                  <span className=" text-red-400">{errors.email}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="pwd"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="pwd"
                  id="pwd"
                  onChange={handleInput}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary_variant focus:border-secondary_variant block w-full p-2.5"
                />
                {errors.password && (
                  <span className=" text-red-400">{errors.password}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={authHandler.loading}
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
