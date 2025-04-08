import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import NavLogo from "../../assets/images/LevartLogo.webp";
import { logoutUser } from "../../store/authSlice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrrowLeftEndOnRectangleIcon } from "../../assets/icons/ArrrowLeftEndOnRectangleIcon";
import { fetchConnectedUser } from "../../store/profileSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faGear,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import SearchBarHub from "../ui/SearchBarHub";

function NavSearchBar() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { connectedUserProfile } = useSelector((state) => state.profile);
  const menuItems = ["Home", "Discover", "Trip Planner", "Login"];

  useEffect(() => {
    dispatch(fetchConnectedUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleNavigate = ({ category, name, id }) => {
    if (category) navigate(`/search/${category}/${name}`);
    else navigate(`groups-result/${id}/${name}`);
    setResults([]);
  };

  console.log("results", results);

  return (
    <Navbar
      shouldHideOnScroll
      isBlurred={false}
      className=" bg-navSearchClr"
      maxWidth="full"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: "shadow-none px-10",
        wrapper: "shadow-none",
      }}
    >
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="hover:text-hoverLinkBtn"
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand className="cursor-pointer">
          <Image
            width={150}
            src={NavLogo}
            radius="none"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-10 ms-5" justify="start">
        <NavbarBrand className="cursor-pointer space-x-16">
          <Image
            width={150}
            src={NavLogo}
            radius="none"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          />
          <div className="relative">
            {/* Search Bar Component */}
            <SearchBarHub setResults={setResults} setIsLoading={setIsLoading} />

            {/* Search Results Dropdown */}
            {results.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-lg z-50 max-h-60 overflow-y-auto overflow-x-clip">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className=" flex flex-row space-x-2 items-center p-5 hover:bg-gray-100 cursor-pointer border-b last:border-none"
                    onClick={() =>
                      handleNavigate({
                        category: result?.category,
                        name: result?.name,
                        id: result?.id,
                      })
                    }
                  >
                    <img
                      src={result.bgImage || result.imageUrl}
                      className="w-12 h-12 rounded-lg"
                      alt="result"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-mainText">
                        {result.title || result.name},{" "}
                        {result.city ? result.city : ""}
                      </h1>
                      <p className="text-sm text-secondary-text font-semibold truncate max-w-sm">
                        {result.description || result.information}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <button onClick={() => navigate("/chat")}>
          <FontAwesomeIcon
            icon={faComments}
            className=" text-secondary-text size-6"
          />
        </button>
        <Dropdown placement="bottom-end" showArrow>
          <DropdownTrigger>
            <Avatar
              src={connectedUserProfile?.imageUrl}
              as="button"
              className="transition-transform"
              name="Jason Hughes"
              size="md"
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            itemClasses={{
              base: [
                "gap-4",
                "data-[hover=true]:text-mainText",
                // "data-[hover=true]:bg-dropDownHover",
                "dark:data-[hover=true]:bg-dropDownHover",
                "data-[selectable=true]:focus:bg-dropDownHover",
                "data-[pressed=true]:opacity-70",
                "data-[focus-visible=true]:ring-default-500",
              ],
            }}
          >
            <DropdownItem
              key="info"
              className="h-10 gap-2"
              classNames={{ base: "text-mainText" }}
            >
              <p className="">Signed in as: </p>
              <p className="font-bold">{user.username}</p>
            </DropdownItem>
            <DropdownItem
              key="profile"
              startContent={<FontAwesomeIcon icon={faGear} />}
              onClick={() => navigate("/edit-profile")}
              classNames={{ base: "text-mainText" }}
            >
              <p className="font-semibold">Settings</p>
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              startContent={
                <ArrrowLeftEndOnRectangleIcon className="text-danger size-5" />
              }
              onClick={handleLogout}
            >
              <p className="text-danger font-semibold">Log Out</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu className=" bg-navClr">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full font-semibold hover:text-hoverText"
              color={"foreground"}
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default NavSearchBar;
