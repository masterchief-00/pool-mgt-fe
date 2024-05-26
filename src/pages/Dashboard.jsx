import React, { useEffect, useState } from "react";
import { TablePools } from "../components/TablePools";
import { TableOperators } from "../components/TableOperators";
import { ModalPool } from "../components/ModalPool";
import { ModalDeletePool } from "../components/ModalDeletePool";
import { useSelector } from "react-redux";
import { TableLocations } from "../components/TableLocations";
import { ModalLocation } from "../components/ModalLocation";

export const Dashboard = () => {
  const userState = useSelector((state) => state.user);

  const [poolEditModal, setPoolEditModal] = useState({ id: null, open: false });
  const [locationModal, setLocationModal] = useState({ id: null, open: false });

  const [poolDeleteModal, setPoolDeleteModal] = useState({
    id: null,
    open: false,
  });

  const handleDelete = (id) => {};
  return (
    <div className="flex flex-col gap-2 w-full h-full p-2">
      {userState.role === "admin" && (
        <div className="w-full h-[43%] rounded-lg shadow-gray-400 bg-white p-4 overflow-hidden">
          <div className="flex flex-row justify-between h-fit">
            <div className="flex flex-col gap-1 w-full h-full">
              <label className="font-bold text-2xl">Swimming pools</label>
              <label className="font-semibold text-md text-gray-600">
                6 total
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
              onEdit={setPoolEditModal}
              onDelete={setPoolDeleteModal}
            />
          </div>
        </div>
      )}
      {userState.role === "admin" && (
        <div className="w-full h-[43%] rounded-lg shadow-gray-400 bg-white p-4 overflow-hidden">
          <div className="flex flex-row justify-between h-fit">
            <div className="flex flex-col gap-1 w-full h-full">
              <label className="font-bold text-2xl">Operators</label>
              <label className="font-semibold text-md text-gray-600">
                6 total
              </label>
            </div>
          </div>
          <div className="h-[85%] overflow-y-scroll">
            <TableOperators />
          </div>
        </div>
      )}

      {userState.role === "operator" && (
        <div className="w-full h-[43%] rounded-lg shadow-gray-400 bg-white p-4 overflow-hidden">
          <div className="flex flex-row justify-between h-fit">
            <div className="flex flex-col gap-1 w-full h-full">
              <label className="font-bold text-2xl">Assigned pools</label>
              <label className="font-semibold text-md text-gray-600">
                6 total
              </label>
            </div>
          </div>
          <div className="h-[85%] overflow-y-scroll">
            <TablePools
              onEdit={setPoolEditModal}
              onDelete={setPoolDeleteModal}
            />
          </div>
        </div>
      )}

      {userState.role === "overseer" && (
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
            <TableLocations onView={setLocationModal} />
          </div>
        </div>
      )}
      {poolEditModal.open && <ModalPool Fn={setPoolEditModal} />}
      {poolDeleteModal.open && <ModalDeletePool Fn={setPoolDeleteModal} />}
      {locationModal.open && <ModalLocation Fn={setLocationModal} />}
    </div>
  );
};
