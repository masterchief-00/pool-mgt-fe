export const ModalDeletePool = ({ Fn }) => {
  const handleAction = () => {
    Fn((prevState) => ({ ...prevState, open: false }));
  };
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Delete swimming pool
          </h3>
          <div className="mt-2">You are about to delete Pool 1, Are you sure?</div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleAction}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
