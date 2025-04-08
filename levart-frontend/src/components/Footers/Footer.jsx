/* eslint-disable no-script-url */
import { AppStoreButton, GooglePlayButton } from "react-mobile-app-button";
import MainLogo from "../ui/MainLogo";

function Footer() {
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
      href: "/about",

      name: "About us",
    },
  ];
  return (
    <footer className="pt-10">
      <div className="bg-dark-grn mx-auto  text-white px-10 md:px-36 rounded-t-2xl">
        <div className="justify-between sm:flex">
          <div className="space-y-6 my-5 py-8">
            <MainLogo />
            <p className="max-w-md font-bold">
              Beyond Destinations, Creating Memories
            </p>
            <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              {footerNavs.map((item, idx) => (
                <li
                  key={idx}
                  className="text-white hover:text-hoverText duration-150 font-semibold"
                >
                  <a key={idx} href={item.href}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <p className="text-white font-semibold">Get the app</p>
            <div className="flex xsm:flex-col md:flex-row items-center gap-3 mt-3 sm:block space-y-10">
              <AppStoreButton
                theme="dark"
                className="bg-transparent border-transparent"
              />
              <GooglePlayButton
                theme="dark"
                className="bg-transparent border-transparent"
              />
            </div>
          </div>
        </div>
        <div className="mt-10 py-10 text-center text-gray-600">
          <p>© 2024-2030 Levart Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
