import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
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
  DropdownSection,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavLogo from "../../assets/images/LevartLogo.webp";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import { ArrrowLeftEndOnRectangleIcon } from "../../assets/icons/ArrrowLeftEndOnRectangleIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { fetchConnectedUser } from "../../store/profileSlice";
import { navIcons, dropdownItems, menuItems } from "../../data/navMenuItems";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { connectedUserProfile } = useSelector((state) => state.profile);

  const username = user?.username || undefined;
  useEffect(() => {
    if (username) {
      dispatch(fetchConnectedUser());
    }
  }, [dispatch, username]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Navbar
      shouldHideOnScroll
      isBlurred={false}
      className=" bg-navClr"
      maxWidth="xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
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

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
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

      <NavbarContent className="hidden md:flex gap-10" justify="center">
        <NavbarItem>
          <Link
            href="/"
            className="text-mainText hover:text-hoverText font-semibold text-lg "
          >
            Home
          </Link>
        </NavbarItem>
        <Dropdown
          showArrow
          classNames={{ base: "font-semibold", content: "bg-white " }}
        >
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-mainText font-semibold text-lg hover:text-hoverText"
                radius="sm"
                variant="light"
                endContent={navIcons.chevron}
              >
                Discover
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            className="w-[340px]"
            classNames={{ list: "font-semibold" }}
            itemClasses={{
              base: [
                "gap-4",
                "data-[hover=true]:text-mainText",
                "data-[hover=true]:bg-dropDownHover",
                "dark:data-[hover=true]:bg-dropDownHover",
                "data-[selectable=true]:focus:bg-dropDownHover",
                "data-[pressed=true]:opacity-70",
                "data-[focus-visible=true:ring-default-500",
              ],
            }}
          >
            {dropdownItems.map((item) => (
              <DropdownItem
                key={item.key}
                description={item.description}
                startContent={item.icon}
                onClick={() => handleNavigation(item.path)}
                classNames={{
                  title: "font-bold text-mainText",
                  description: "whitespace-normal break-words max-w-[340px]",
                }}
              >
                {item.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        {menuItems.map((item, index) => (
          <NavbarItem>
            <Link
              href={item.path}
              className="text-mainText hover:text-hoverText font-semibold text-lg "
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {isAuthenticated ? (
          <>
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
                    "dark:data-[hover=true]:bg-dropDownHover",
                    "data-[selectable=true]:focus:bg-dropDownHover",
                    "data-[pressed=true]:opacity-70",
                    "data-[focus-visible=true:ring-default-500",
                  ],
                }}
              >
                <DropdownSection showDivider>
                  <DropdownItem key="info" className="h-10 gap-2">
                    <p className=" font-medium">
                      Signed in as:{" "}
                      <span className="font-bold">{user.username}</span>
                    </p>
                  </DropdownItem>
                </DropdownSection>
                <DropdownItem
                  key="profile"
                  startContent={
                    <FontAwesomeIcon icon={faUser} className="size-4" />
                  }
                  onClick={() => navigate(`/profile/${username}`)}
                >
                  <p className="font-semibold">Profile</p>
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
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link
                href="/login"
                className="text-mainText hover:text-hoverText font-semibold"
              >
                Login
              </Link>
            </NavbarItem>
            <NavbarItem className="hidden md:flex">
              <Button
                as={Link}
                className="bg-mainBtn text-white font-semibold"
                href="/register"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu className=" bg-navClr">
        <Link
          href="/"
          className="w-full font-semibold hover:text-hoverText pl-2"
          size="lg"
        >
          Home
        </Link>
        <Accordion>
          <AccordionItem
            indicator={
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="size-4 text-mainText"
              />
            }
            key={1}
            title="Discover"
            classNames={{
              title: "font-semibold text-lg data-[hover=true]:text-hoverText",
              content: "pl-5",
            }}
          >
            {dropdownItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="w-full font-semibold hover:text-hoverText my-2 gap-x-2"
                color={"foreground"}
                size="lg"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </AccordionItem>
        </Accordion>

        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="w-full font-semibold hover:text-hoverText pl-2 my-2"
              color={"foreground"}
              href={item.path}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}

        <Link
          href="/login"
          className="w-full font-semibold text-white p-2 bg-primary-grn rounded-lg"
          size="lg"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="w-full font-semibold text-primary-grn p-2 border-2 border-primary-grn rounded-lg"
          size="lg"
        >
          Register
        </Link>
      </NavbarMenu>
    </Navbar>
  );
}

export default NavBar;
