import React, { useEffect, useState } from "react";
import { TablePools } from "../components/TablePools";
import { TableOperators } from "../components/TableOperators";
import { ModalPool } from "../components/ModalPool";
import { ModalDeletePool } from "../components/ModalDeletePool";
import { useDispatch, useSelector } from "react-redux";
import { TableLocations } from "../components/TableLocations";
import { ModalLocation } from "../components/ModalLocation";
import { poolsAssigned } from "../redux/slices/poolsAssignedSlice";
import { poolsAvailable } from "../redux/slices/poolsByLocationSlice";
import { operatorsAvailable } from "../redux/slices/operatorsByLocationSlice";
import { ModalDeleteOperator } from "../components/ModalDeleteOperator";
import { getLocations } from "../redux/slices/locationsSlice";

export const Dashboard = () => {
  const userState = useSelector((state) => state.user.user);
  const loginState = useSelector((state) => state.login);
  const poolsAssignedState = useSelector((state) => state.assignedPools);
  const poolsAvailableState = useSelector((state) => state.poolsByLocation);
  const locationsState = useSelector((state) => state.locations);
  const operatorsAvailableState = useSelector(
    (state) => state.operatorsByLocation
  );

  const dispatch = useDispatch();
  const userId = localStorage.getItem("user_id");
  const userRole = localStorage.getItem("user_role");
  const userLocation = localStorage.getItem("user_location");

  const [poolEditModal, setPoolEditModal] = useState({
    id: null,
    open: false,
    data: null,
  });
  const [locationModal, setLocationModal] = useState({ id: null, open: false });
  const [pools, setPools] = useState([]);
  const [operators, setOperators] = useState([]);
  const [locations, setLocations] = useState([]);

  const [poolDeleteModal, setPoolDeleteModal] = useState({
    id: null,
    open: false,
  });
  const [operatorDeleteModal, setOperatorDeleteModal] = useState({
    id: null,
    open: false,
  });

  const handleDelete = (id) => {};

  useEffect(() => {
    if (locationsState.serverResponded) {
      setLocations(locationsState.response);
    }
  }, [locationsState.serverResponded]);

  useEffect(() => {
    if (operatorsAvailableState.serverResponded) {
      setOperators(operatorsAvailableState.response);
    }
  }, [operatorsAvailableState.serverResponded]);

  useEffect(() => {
    if (poolsAvailableState.serverResponded) {
      setPools(poolsAvailableState.response);
    }
  }, [poolsAvailableState.serverResponded]);

  useEffect(() => {
    if (poolsAssignedState.serverResponded) {
      setPools(poolsAssignedState.response);
    }
  }, [poolsAssignedState.serverResponded]);

  useEffect(() => {
    if (userRole === "operator") {
      dispatch(poolsAssigned(userId));
    } else if (userRole === "admin") {
      dispatch(poolsAvailable(userLocation));
      dispatch(operatorsAvailable(userLocation));
    } else if (userRole === "overseer") {
      dispatch(getLocations());
    }
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full h-full p-2">
      {userRole === "admin" && (
        <div className="w-full h-[43%] rounded-lg shadow-gray-400 bg-white p-4 overflow-hidden">
          <div className="flex flex-row justify-between h-fit">
            <div className="flex flex-col gap-1 w-full h-full">
              <label className="font-bold text-2xl">Swimming pools</label>
              <label className="font-semibold text-md text-gray-600">
                {pools.length} total
              </label>
            </div>
          </div>
          <div className="h-[85%] overflow-y-scroll">
            <TablePools
              pools={pools}
              onEdit={setPoolEditModal}
              onDelete={setPoolDeleteModal}
              role={userRole}
            />
          </div>
        </div>
      )}
      {userRole === "admin" && (
        <div className="w-full h-[43%] rounded-lg shadow-gray-400 bg-white p-4 overflow-hidden">
          <div className="flex flex-row justify-between h-fit">
            <div className="flex flex-col gap-1 w-full h-full">
              <label className="font-bold text-2xl">Operators</label>
              <label className="font-semibold text-md text-gray-600">
                {operators.length} total
              </label>
            </div>
          </div>
          <div className="h-[85%] overflow-y-scroll">
            <TableOperators
              onDelete={setOperatorDeleteModal}
              operators={operators}
              role={userRole}
            />
          </div>
        </div>
      )}

      {userRole === "operator" && (
        <div className="w-full h-[43%] rounded-lg shadow-gray-400 bg-white p-4 overflow-hidden">
          <div className="flex flex-row justify-between h-fit">
            <div className="flex flex-col gap-1 w-full h-full">
              <label className="font-bold text-2xl">Assigned pools</label>
              <label className="font-semibold text-md text-gray-600">
                {pools.length} total
              </label>
            </div>
          </div>
          <div className="h-[85%] overflow-y-scroll">
            <TablePools
              pools={pools}
              onEdit={setPoolEditModal}
              onDelete={setPoolDeleteModal}
              role={userRole}
            />
          </div>
        </div>
      )}

      {userRole === "overseer" && (
        <div className="flex h-full flex-row">
          <div className="w-[50%] h-[43%] rounded-lg shadow-gray-400 bg-white p-4 overflow-hidden">
            <div className="flex flex-row justify-between h-fit">
              <div className="flex flex-col gap-1 w-full h-full">
                <label className="font-bold text-2xl">
                  Available locations
                </label>
                <label className="font-semibold text-md text-gray-600">
                  {locations.length} total
                </label>
              </div>
            </div>
            <div className="h-[85%] overflow-y-scroll">
              <TableLocations locations={locations} onView={setLocationModal} />
            </div>
          </div>
          <div className="w-[50%] h-[43%] rounded-lg shadow-gray-400 bg-transparent p-4 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.4927920574264!2d30.060151911394943!3d-1.956333898017703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca42ba4412995%3A0xeb7a3b7e5681a72d!2sKigali%20Serena%20Hotel!5e0!3m2!1sen!2srw!4v1716978777948!5m2!1sen!2srw"
              width="600"
              height="480"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      )}
      {poolEditModal.open && (
        <ModalPool
          data={poolEditModal.data}
          operators={operators}
          Fn={setPoolEditModal}
        />
      )}
      {poolDeleteModal.open && <ModalDeletePool Fn={setPoolDeleteModal} />}
      {locationModal.open && (
        <ModalLocation
          role={userRole}
          location={locationModal.id}
          Fn={setLocationModal}
        />
      )}
      {operatorDeleteModal.open && (
        <ModalDeleteOperator Fn={setOperatorDeleteModal} />
      )}
    </div>
  );
};
