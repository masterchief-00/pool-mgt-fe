export const ModalPool = ({ Fn }) => {
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
            Update Swimming pool details
          </h3>
          <div className="mt-2">
            <div class="flex flex-col w-full max-h-[90%] bg-white p-4 rounded-md">
              <div className="flex flex-col mt-6 overflow-y-scroll gap-4">
                <div className="md:col-span-5">
                  <label for="full_name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value=""
                  />
                </div>

                <div className="md:col-span-5">
                  <label for="full_name">Depth</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value=""
                  />
                </div>

                <div className="md:col-span-5">
                  <label for="full_name">Dimensions</label>
                  <div className="flex flex-row gap-3">
                    <div>
                      <label className=" text-black text-sm">Length</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                      />
                    </div>

                    <div>
                      <label className=" text-black text-sm">Width</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                      />
                    </div>
                  </div>
                </div>

                <div class="md:w-1/3">
                  <label>Assign to</label>
                  <select
                    name=""
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    id="my-select"
                  >
                    <option value="Default">Operator 1</option>
                    <option value="A">Operator 1</option>
                  </select>
                </div>

                <div class="md:col-span-5 text-right">
                  <div class="flex flex-row justify-end gap-2">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleAction}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
