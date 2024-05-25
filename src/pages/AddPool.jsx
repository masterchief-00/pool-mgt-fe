export const AddPool = () => {
  return (
    <div class="w-full h-full p-2">
      <div class="flex flex-col w-full h-fit bg-white p-4 rounded-md">
        <div className="flex flex-col w-full">
          <label className="font-bold text-2xl">Add Swimming pool</label>
        </div>
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

          <div class="md:col-span-5">
            <label for="email">Location</label>
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
            <label for="depth">Depth</label>
            <input
              type="text"
              name="depth"
              id="depth"
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              value=""
              placeholder="3m"
            />
          </div>

          <div class="md:col-span-2">
            <label>Dimensions</label>
            <div className="flex flex-row gap-1">
              <input
                type="text"
                name="l"
                id="city"
                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value=""
                placeholder="length"
              />
              <input
                type="text"
                name="w"
                id="w"
                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value=""
                placeholder="width"
              />
            </div>
          </div>

          <div class="md:w-1/3">
            <label>Assign to</label>
            <select
              name=""
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              id="my-select"
            >
              <option value="Default">[Not now]</option>
              <option value="A">Operator 1</option>
              <option value="B">Operator 1</option>
              <option value="C">Operator 1</option>
            </select>

            <p class="py-2 text-sm text-gray-600">
              only registered operators are on the list
            </p>
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
