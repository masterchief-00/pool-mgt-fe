import { useDispatch, useSelector } from "react-redux";
import { registerOperator } from "../redux/slices/operatorAddSlice";
import { userSchema } from "../validation/userSchema";
import { useEffect, useState } from "react";
import { activeLinksActions } from "../redux/slices/activeLinkSlice";

export const AddOperators = () => {
  const dispatch = useDispatch();
  const userLocation = localStorage.getItem("user_location");
  const addOperatorsState = useSelector((state) => state.operators);

  const [errors, setErrors] = useState({});
  const [submitData, setSubmitData] = useState({
    fname: "",
    lname: "",
    location: "",
    email: "",
    phone: "",
    gender: "",
  });

  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      console.log(submitData);

      if (validateForm(submitData)) {
        dispatch(registerOperator(submitData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = (data) => {
    const { error } = userSchema.validate(data, { abortEarly: false });
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

  const handleInput = (e) => {
    e.preventDefault();

    setSubmitData((prevState) => ({
      ...prevState,
      fname: e.target.name === "fname" ? e.target.value : prevState.fname,
      lname: e.target.name === "lname" ? e.target.value : prevState.lname,
      email: e.target.name === "email" ? e.target.value : prevState.email,
      location:
        e.target.name === "location" ? e.target.value : prevState.location,
      phone: e.target.name === "phone" ? e.target.value : prevState.phone,
      gender: e.target.name === "gender" ? e.target.value : prevState.gender,
    }));
  };

  useEffect(() => {
    dispatch(activeLinksActions.setActiveLink("Operators"));
  }, []);

  return (
    <div className="w-full h-full p-2">
      <div className="flex flex-col w-full max-h-[90%] bg-white p-4 rounded-md">
        <div className="flex flex-col w-full">
          <label className="font-bold text-2xl">Add pool operator</label>
        </div>
        <div className="flex flex-col mt-6 overflow-y-scroll gap-4">
          <form onSubmit={handleSubmit}>
            <div className="md:col-span-5">
              <label>First name</label>
              <input
                type="text"
                name="fname"
                id="fname"
                onChange={handleInput}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={submitData.fname}
              />
              {errors.fname && (
                <span className=" text-red-400">{errors.fname}</span>
              )}
            </div>
            <div className="md:col-span-5">
              <label>Last name</label>
              <input
                type="text"
                name="lname"
                id="lname"
                onChange={handleInput}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={submitData.lname}
              />
              {errors.lname && (
                <span className=" text-red-400">{errors.lname}</span>
              )}
            </div>

            <div className="md:col-span-5">
              <label>Email</label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={handleInput}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={submitData.email}
                placeholder="email@gmail.com"
              />
              {errors.email && (
                <span className=" text-red-400">{errors.email}</span>
              )}
            </div>

            <div className="md:col-span-5">
              <label>Phone number</label>
              <input
                type="text"
                name="phone"
                id="phone"
                onChange={handleInput}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={submitData.phone}
                placeholder=""
              />
              {errors.phone && (
                <span className=" text-red-400">{errors.phone}</span>
              )}
            </div>

            <div className="md:col-span-3">
              <label>Location</label>
              <input
                type="text"
                name="location"
                id="location"
                onChange={handleInput}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={submitData.location}
                placeholder="serena hotel"
              />
              {errors.location && (
                <span className=" text-red-400">{errors.location}</span>
              )}
            </div>

            <div className="md:w-1/3">
              <label>Gender</label>
              <select
                name="gender"
                onChange={handleInput}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                id="gender"
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="md:col-span-5 text-right">
              <div className="inline-flex items-end">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
