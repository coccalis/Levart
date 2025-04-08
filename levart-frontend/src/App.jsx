import "./styles/App.css";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchResult from "./pages/SearchResult";
import LevartHub from "./pages/LevartHub";
import Profile from "./pages/Profile";
import { RouteLayout, AuthLayout, ChatLayout } from "./pages/Route";
import About from "./pages/About";
import Discover from "./pages/Discover";
import EditProfile from "./pages/EditProfile";
import Groups from "./pages/Groups";
import GroupResult from "./pages/Group-Result";
import CreateGroup from "./pages/CreateGroup";
import EditGroup from "./pages/EditGroup";
import Chat from "./pages/Chat";
import TripPlanner from "./pages/TripPlanner";
import TripPlannerResult from "./pages/TripPlannerResult";
import SearchResultList from "./pages/SearchResultList";
import SetUpProfile from "./pages/SetUpProfile";
import ChatRoom from "./components/Chat/ChatRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteLayout />,
    errorElement: "error",
    id: "root",
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <About /> },
      { path: "discover/:type", element: <Discover /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "search-list/:searchInput/:filter",
        element: <SearchResultList />,
      },
      {
        path: "search/:category/:name",
        element: <SearchResult />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "setting-up-profile",
        element: <SetUpProfile />,
      },
      {
        path: "trip-planner",
        element: <TripPlanner />,
      },
      {
        path: "trip-planner-result",
        element: <TripPlannerResult />,
      },
      {
        path: "levart-hub",
        element: <LevartHub />,
      },
      {
        path: "groups",
        element: <Groups />,
      },
      {
        path: "groups-result/:id/:name",
        element: <GroupResult />,
      },
      {
        path: "edit-group/:id",
        element: <EditGroup />,
      },
      {
        path: "create-group",
        element: <CreateGroup />,
      },
      {
        path: "profile/:username",
        element: <Profile />,
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        element: <ChatLayout />,
        children: [
          {
            path: "chat",
            element: <Chat />,
          },
          {
            path: "chatroom/:receiver",
            element: <ChatRoom />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
