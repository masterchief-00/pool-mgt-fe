import { useSelector } from "react-redux";

export const TablePools = ({ onEdit, onDelete }) => {
  const userState = useSelector((state) => state.user);

  const handleEdit = (id) => {
    onEdit({ open: true, id });
  };

  const handleDelete = (id) => {
    onDelete({ open: true, id });
  };
  return (
    <div className="flex flex-col mt-4">
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden ">
            <table className="min-w-full divide-y divide-gray-200 table-fixed ">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="checkbox-all" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
                  >
                    Depth
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
                  >
                    Length
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
                  >
                    Width
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-100">
                  <td className="p-4 w-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                      />
                      <label htmlFor="checkbox-table-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">
                    Pool 01
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    1.2 meters
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    9m
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    6m
                  </td>
                  <td className="flex flex-row gap-1 py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    <label className=" text-sm bg-green-400 px-[2px] rounded-md">
                      Online
                    </label>
                    <label className=" text-sm bg-green-400 px-[2px] rounded-md">
                      Safe
                    </label>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    <a
                      href="/pool/data"
                      className="text-gray-600 mx-[0.7px] px-1 rounded-md bg-green-400 hover:underline"
                    >
                      View
                    </a>
                    {userState.role === "admin" && (
                      <>
                        <a
                          href="#"
                          onClick={() => handleEdit(12)}
                          className="text-gray-600 px-1 mx-[0.7px] rounded-md bg-yellow-400 hover:underline"
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          onClick={() => handleDelete(12)}
                          className="text-gray-600 px-1 mx-[0.7px] rounded-md bg-red-400 hover:underline"
                        >
                          Delete
                        </a>
                      </>
                    )}
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-4 w-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                      />
                      <label htmlFor="checkbox-table-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">
                    Pool 02
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    1.2 meters
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    9m
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    6m
                  </td>
                  <td className="flex flex-row gap-1 py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    <label className=" text-sm bg-green-400 px-[2px] rounded-md">
                      Online
                    </label>
                    <label className=" text-sm bg-orange-400 px-[2px] rounded-md">
                      Unsafe
                    </label>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    <a
                      href="/pool/data"
                      className="text-gray-600 mx-[0.7px] px-1 rounded-md bg-green-400 hover:underline"
                    >
                      View
                    </a>
                    {userState.role === "admin" && (
                      <>
                        <a
                          href="#"
                          onClick={() => handleEdit(12)}
                          className="text-gray-600 px-1 mx-[0.7px] rounded-md bg-yellow-400 hover:underline"
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          onClick={() => handleDelete(12)}
                          className="text-gray-600 px-1 mx-[0.7px] rounded-md bg-red-400 hover:underline"
                        >
                          Delete
                        </a>
                      </>
                    )}
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-4 w-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                      />
                      <label htmlFor="checkbox-table-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">
                    Pool 02
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    1.2 meters
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    9m
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    6m
                  </td>
                  <td className="flex flex-row gap-1 py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    <label className=" text-sm bg-red-400 px-[2px] rounded-md">
                      Offline
                    </label>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    <a
                      href="/pool/data"
                      className="text-gray-600 mx-[0.7px] px-1 rounded-md bg-green-400 hover:underline"
                    >
                      View
                    </a>
                    {userState.role === "admin" && (
                      <>
                        <a
                          href="#"
                          onClick={() => handleEdit(12)}
                          className="text-gray-600 px-1 mx-[0.7px] rounded-md bg-yellow-400 hover:underline"
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          onClick={() => handleDelete(12)}
                          className="text-gray-600 px-1 mx-[0.7px] rounded-md bg-red-400 hover:underline"
                        >
                          Delete
                        </a>
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
