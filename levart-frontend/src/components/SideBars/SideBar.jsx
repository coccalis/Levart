import { Avatar } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFollowers,
  fetchFollowing,
  fetchUser,
  fetchUserPosts,
} from "../../store/profileSlice";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMapLocationDot,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { dropdownItems } from "../../data/navMenuItems";

function SideBar() {
  const dispatch = useDispatch();
  const { userProfile, followers, following, userPosts } = useSelector(
    (state) => state.profile
  );
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const { username } = user;

  useEffect(() => {
    if (isAuthenticated && username) {
      dispatch(fetchFollowers({ username }));
      dispatch(fetchFollowing({ username }));
      dispatch(fetchUserPosts({ username }));
      dispatch(fetchUser({ username }));
    }
  }, [dispatch, username]);
  return (
    <div className="h-full scroll-my-16">
      <div className="sticky top-0  flex flex-col space-y-4 ms-5 my-5">
        <div className="w-72 bg-white border-1 border-gray-200 shadow-md rounded-2xl p-5">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-7 px-2">
              <Avatar
                radius="full"
                src={userProfile?.imageUrl}
                alt="profile"
                className=" w-16 h-16"
              />
              <div className="text-start">
                <h1 className="font-semibold text-lg">
                  {userProfile?.firstname} {userProfile?.lastname}
                </h1>
                <h1 className="font-semibold text-secondary-text text-lg">
                  @{userProfile?.username}
                </h1>
              </div>
            </div>

            <div className="flex justify-around w-full">
              <div className="flex flex-col items-center">
                <p className="font-bold">{followers?.length || 0}</p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold">{following?.length || 0}</p>
                <p className="text-sm text-gray-500">Following</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold">{userPosts?.length || 0}</p>
                <p className="text-sm text-gray-500">Posts</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-72 bg-white border-1 border-gray-200 shadow-md rounded-2xl ">
          <ul className="flex flex-col p-5">
            <li className="hover:bg-dropDownHover rounded-xl transition-colors">
              <Link
                to="levart-hub"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800  "
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <FontAwesomeIcon icon={faHome} />
                </span>
                <span className="text-sm font-medium">Feed</span>
              </Link>
            </li>
            <li className="hover:bg-dropDownHover rounded-xl transition-colors">
              <Link
                to={`/profile/${username}`}
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <span className="text-sm font-medium">Profile</span>
              </Link>
            </li>
            <li className="hover:bg-dropDownHover rounded-xl transition-colors">
              <Link
                to={`/trip-planner`}
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <FontAwesomeIcon icon={faMapLocationDot} />
                </span>
                <span className="text-sm font-medium">LevartGuide AI</span>
              </Link>
            </li>
            <li className="hover:bg-dropDownHover rounded-xl transition-colors">
              <Link
                to="/groups"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <FontAwesomeIcon icon={faUserGroup} />
                </span>
                <span className="text-sm font-medium">Nomads</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-72 bg-white border-1 border-gray-200 shadow-md rounded-2xl ">
          <h1 className="text-gray-500 font-semibold px-5 py-2">Discover</h1>
          <ul className="flex flex-col px-5 py-2">
            {dropdownItems.map((item, index) => (
              <li
                className="hover:bg-dropDownHover rounded-xl transition-colors"
                key={index}
              >
                <Link
                  to={item.path}
                  className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800  "
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
