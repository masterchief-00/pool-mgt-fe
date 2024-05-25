export const AddOperators = () => {
  return (
    <div class="w-full h-full p-2">
      <div class="flex flex-col w-full max-h-[90%] bg-white p-4 rounded-md">
        <div className="flex flex-col w-full">
          <label className="font-bold text-2xl">Add pool operator</label>
        </div>
        <div className="flex flex-col mt-6 overflow-y-scroll gap-4">
          <div className="md:col-span-5">
            <label for="full_name">First name</label>
            <input
              type="text"
              name="name"
              id="name"
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              value=""
            />
          </div>
          <div className="md:col-span-5">
            <label for="full_name">Last name</label>
            <input
              type="text"
              name="name"
              id="name"
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              value=""
            />
          </div>

          <div class="md:col-span-5">
            <label for="email">Email</label>
            <input
              type="text"
              name="location"
              id="location"
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              value=""
              placeholder="Serena Hotel"
            />
          </div>

          <div class="md:col-span-5">
            <label for="email">Phone number</label>
            <input
              type="text"
              name="location"
              id="location"
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              value=""
              placeholder="Serena Hotel"
            />
          </div>

          <div class="md:col-span-3">
            <label for="depth">Location</label>
            <input
              type="text"
              name="depth"
              id="depth"
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              value=""
              placeholder="3m"
            />
          </div>

          <div class="md:w-1/3">
            <label>Gender</label>
            <select
              name=""
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              id="my-select"
            >
              <option value="Default">Male</option>
              <option value="A">Female</option>
            </select>
          </div>

          <div class="md:col-span-5 text-right">
            <div class="inline-flex items-end">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
