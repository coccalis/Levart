import { matchPath, Navigate, Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/Navbars/NavBar";
import Footer from "../components/Footers/Footer";
import FooterHub from "../components/Footers/FooterHub";
import { useSelector } from "react-redux";
import ScrollToTop from "../components/ScrollToTop";
import NavSearchBar from "../components/Navbars/NavSearchBar";
import SideBar from "../components/SideBars/SideBar";
import SideBarRight from "../components/SideBars/SideBarRight";
import Chat from "./Chat";

function RouteLayout() {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

function AuthLayout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  // Define paths to match
  const showSidebarLeftPaths = [
    "/levart-hub",
    "/groups",
    "/groups-result/:id/:name",
    "/create-group",
  ];

  const showFooterPaths = ["/chat", "/chatroom/:receiver"];

  const showSidebarRightPaths = ["/levart-hub", "/groups", "/create-group"];

  // Check if current location matches any of the paths
  const showSidebarLeft = showSidebarLeftPaths.some((path) =>
    matchPath(path, location.pathname)
  );

  const showSidebarRight = showSidebarRightPaths.some((path) =>
    matchPath(path, location.pathname)
  );

  const showFooter = showFooterPaths.some((path) =>
    matchPath(path, location.pathname)
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col h-screen">
        <header>{!showSidebarLeft ? <NavBar /> : <NavSearchBar />}</header>

        <div className="flex flex-1">
          {showSidebarLeft && <SideBar />}
          <Outlet />

          {showSidebarRight && <SideBarRight />}
        </div>

        <footer>{!showFooter && <FooterHub />}</footer>
      </div>
    </>
  );
}

function ChatLayout() {
  const location = useLocation(); // Get the current route location

  // Check if the current route is "/chat"
  const isChatRoute = location.pathname === "/chat";
  return (
    <main className="w-full my-10 mx-auto max-w-screen-2xl">
      <h1 className=" text-mainText font-semibold text-2xl text-center my-3">
        Levart Chatroom
      </h1>
      <div className="">
        <div className="grid grid-cols-3 gap-x-5">
          <Chat />
          <div className="col-span-2">{!isChatRoute && <Outlet />}</div>
        </div>
      </div>
    </main>
  );
}

export { RouteLayout, AuthLayout, ChatLayout };
