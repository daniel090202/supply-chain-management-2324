import Image from "next/image";
import images from "../images/index";

const Services = ({
  setOpenProfile,
  setCompleteModal,
  setGetModel,
  setStartModal,
}) => {
  const services = [
    {
      image: images.completeShipment,
    },
    {
      image: images.getShipment,
    },
    {
      image: images.startShipment,
    },
    {
      image: images.userProfile,
    },
    {
      image: images.shipmentCount,
    },
    {
      image: images.send,
    },
  ];

  const openModelBox = (status) => {
    if (status === 1) {
      setCompleteModal(true);
    } else if (status === 2) {
      setGetModel(true);
    } else if (status === 3) {
      setStartModal(true);
    } else if (status === 4) {
      setOpenProfile(true);
    }
  };
  return (
    <section className="py-0 pb-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {services.map((service, index) => {
              return (
                <li key={index}>
                  <div
                    onClick={() => openModelBox(index + 1)}
                    className="w-full h-60 sm:h-52 md:h-56"
                  >
                    <Image
                      src={service.image}
                      className="w-full h-full object-cover object-center shadow-md rounded-xl"
                      alt=""
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
