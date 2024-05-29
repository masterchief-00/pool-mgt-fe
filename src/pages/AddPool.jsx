import { useEffect, useState } from "react";
import { operatorsAvailable } from "../redux/slices/operatorsByLocationSlice";
import { useDispatch, useSelector } from "react-redux";
import { poolSchema } from "../validation/poolSchema";
import { registerPool } from "../redux/slices/poolAddSlice";
import { activeLinksActions } from "../redux/slices/activeLinkSlice";

export const AddPool = () => {
  const dispatch = useDispatch();
  const userLocation = localStorage.getItem("user_location");
  const addOperatorsState = useSelector((state) => state.pools);
  const operatorsAvailableState = useSelector(
    (state) => state.operatorsByLocation
  );

  const [operators, setOperators] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitData, setSubmitData] = useState({
    name: "",
    location: "",
    l: "",
    w: "",
    depth: "",
    assigned_to: "",
  });

  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      if (validateForm(submitData)) {
        dispatch(registerPool(submitData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = (data) => {
    const { error } = poolSchema.validate(data, { abortEarly: false });
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
      name: e.target.name === "name" ? e.target.value : prevState.name,
      l: e.target.name === "l" ? e.target.value : prevState.l,
      w: e.target.name === "w" ? e.target.value : prevState.w,
      depth: e.target.name === "depth" ? e.target.value : prevState.depth,
      assigned_to:
        e.target.name === "assigned_to"
          ? e.target.value
          : prevState.assigned_to,
      location:
        e.target.name === "location" ? e.target.value : prevState.location,
    }));
  };

  useEffect(() => {
    if (operatorsAvailableState.serverResponded) {
      setOperators(operatorsAvailableState.response);
    }
  }, [operatorsAvailableState.serverResponded]);

  useEffect(() => {
    dispatch(operatorsAvailable(userLocation));
    dispatch(activeLinksActions.setActiveLink("Pools"))
  }, []);
  return (
    <div className="w-full h-full p-2">
      <div className="flex flex-col w-full h-fit bg-white p-4 rounded-md">
        <div className="flex flex-col w-full">
          <label className="font-bold text-2xl">Add Swimming pool</label>
        </div>
        <div className="flex flex-col mt-6 overflow-y-scroll gap-4">
          <form onSubmit={handleSubmit}>
            <div className="md:col-span-5">
              <label>Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInput}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={submitData.name}
              />
              {errors.name && (
                <span className=" text-red-400">{errors.name}</span>
              )}
            </div>

            <div className="md:col-span-5">
              <label>Location</label>
              <input
                type="text"
                name="location"
                id="location"
                onChange={handleInput}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={submitData.location}
                placeholder="Serena Hotel"
              />
              {errors.location && (
                <span className=" text-red-400">{errors.location}</span>
              )}
            </div>

            <div className="md:col-span-3">
              <label>Depth</label>
              <input
                type="text"
                name="depth"
                id="depth"
                onChange={handleInput}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={submitData.depth}
                placeholder="3m"
              />
              {errors.depth && (
                <span className=" text-red-400">{errors.depth}</span>
              )}
            </div>

            <div className="md:col-span-2">
              <label>Dimensions</label>
              <div className="flex flex-row gap-1">
                <div>
                  <input
                    type="text"
                    name="l"
                    id="l"
                    onChange={handleInput}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={submitData.l}
                    placeholder="length"
                  />
                  {errors.l && (
                    <span className=" text-red-400">{errors.l}</span>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    name="w"
                    id="w"
                    onChange={handleInput}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={submitData.w}
                    placeholder="width"
                  />
                  {errors.w && (
                    <span className=" text-red-400">{errors.w}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="md:w-1/3">
              <label>Assign to</label>
              <select
                name="assigned_to"
                onChange={handleInput}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                id="assigned_to"
              >
                <option value=""></option>
                {operators.map((operator) => (
                  <option key={operator.id} value={operator.id}>
                    {operator.fname} {operator.lname}
                  </option>
                ))}
              </select>

              <p className="py-2 text-sm text-gray-600">
                only registered operators are on the list
              </p>
            </div>

            <div className="md:col-span-5 text-right">
              <div className="inline-flex items-end">
                <button
                  disabled={addOperatorsState.loading}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
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
