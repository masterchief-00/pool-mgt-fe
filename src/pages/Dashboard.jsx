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
            <div className="flex flex-row gap-3">
              <div className="flex flex-col gap-2 justify-center items-center">
                <label className="font-bold text-2xl">5</label>
                <label className="font-semibold text-md text-gray-400">
                  Online
                </label>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <label className="font-bold text-2xl">1</label>
                <label className="font-semibold text-md text-gray-400">
                  Offline
                </label>
              </div>
            </div>
          </div>
          <div className="h-[85%] overflow-y-scroll">
            <TablePools
              deviceStatus={deviceStatus}
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
        <div className="w-[50%] h-[43%] rounded-lg shadow-gray-400 bg-white p-4 overflow-hidden">
          <div className="flex flex-row justify-between h-fit">
            <div className="flex flex-col gap-1 w-full h-full">
              <label className="font-bold text-2xl">Available locations</label>
              <label className="font-semibold text-md text-gray-600">
                6 total
              </label>
            </div>
          </div>
          <div className="h-[85%] overflow-y-scroll">
            <TableLocations locations={locations} onView={setLocationModal} />
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
