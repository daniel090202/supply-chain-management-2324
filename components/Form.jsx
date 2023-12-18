import { useState } from "react";

const Form = ({
  setCreateShipmentModel,
  createShipmentModel,
  createShipment,
}) => {
  const [shipment, setShipment] = useState({
    receiver: "",
    pickupTime: "",
    distance: "",
    price: "",
  });

  const handleCreateShipment = async () => {
    try {
      await createShipment(shipment);
    } catch (error) {
      console.log(error);
    }
  };

  return createShipmentModel ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-10"
        onClick={() => setCreateShipmentModel(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setCreateShipmentModel(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mx-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 1014.293 4.293a1 1 0 01-1.414 1.414L10 11.4141-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">
              Track product and create shipment
            </h4>
            <p className="text-[15px] text-gray-500">
              Fill in the form below to track the product and create shipment
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="text"
                  name="receiver"
                  placeholder="Receiver"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus: border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({ ...shipment, receiver: e.target.value })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="date"
                  name="pickupTime"
                  placeholder="Pick-up time"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus: border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({ ...shipment, pickupTime: e.target.value })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  name="distance"
                  placeholder="Distance"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus: border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({ ...shipment, distance: e.target.value })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus: border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({ ...shipment, price: e.target.value })
                  }
                />
              </div>
              <button
                onClick={() => handleCreateShipment()}
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus: ring-2"
              >
                Create shipment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Form;
