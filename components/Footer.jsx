const Footer = () => {
  const navigation = [
    {
      href: "#",
      name: "Terms",
    },
    {
      href: "#",
      name: "License",
    },
    {
      href: "#",
      name: "Privacy",
    },
    {
      href: "#",
      name: "About us",
    },
  ];

  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="justify-between sm:flex">
          <div className="space-y-6">
            <img src="https://www.floatui.com/logo.svg" className="w-32" />
            <p className="max-w-md">Developed based on Ethereum platform.</p>
            <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              {navigation.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="text-gray-800 hover:text-gray-500 duration-150"
                  >
                    <a key={index} href={item.href}>
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-6">
            <p className="text-gray-700 font-semibold">Get application</p>
            <div className="flex items-center gap-3 mt-3 sm:block">
              <a href="#">1</a>
              <a href="#" className="mt-0 block sm:mt-3">
                2
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 py-10 border-t md:text-center">
          <p>Daniel Nguyen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
