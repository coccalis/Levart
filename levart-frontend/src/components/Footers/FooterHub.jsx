import MainLogo from "../ui/MainLogo";

function FooterHub() {
  const footerNavs = [
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
    <footer className="text-gray-500  bg-gradient-to-b from-transparent to-[#EBFFED] px-4 py-5 w-full mx-auto md:px-8">
      <div className="max-w-lg sm:mx-auto sm:text-center">
        <div className="flex justify-center items-center">
          <MainLogo />
        </div>
        <p className="leading-relaxed mt-2 text-md font-semibold">
          Beyond Destinations, Creating Memories
        </p>
      </div>
      <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
        {footerNavs.map((item, idx) => (
          <li key={idx} className=" hover:text-gray-800">
            <a key={idx} href={item.href}>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-8 items-center justify-center sm:flex">
        <div className="mt-4 sm:mt-0">
          &copy; 2024-25 Levart All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default FooterHub;
