const Table = ({ setCreateShipmentModel, allShipmentsData }) => {
  const convertTime = (time) => {
    const newTime = new Date(time);
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);

    return formattedTime;
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Create tracking
          </h3>
          <p className="text-gray-600 mt-2">
            Tracking the package from the plantation
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <p
            onClick={() => setCreateShipmentModel(true)}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 md:text-sm rounded-lg md:inline-flex"
          >
            Add tracking
          </p>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Sender</th>
              <th className="py-3 px-6">Receiver</th>
              <th className="py-3 px-6">Pick-up time</th>
              <th className="py-3 px-6">Distance</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Delivery time</th>
              <th className="py-3 px-6">Paid</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {allShipmentsData?.map((shipment, index) => {
              return (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.sender.slice(0, 15)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.receiver.slice(0, 15)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {convertTime(shipment.pickupTime)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.distance} kilometer(s)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.deliveryTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.isPaid ? "Completed" : "Incomplete"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.status == 0
                      ? "Pending"
                      : shipment.status == 1
                      ? "In transit"
                      : "Delivered"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
