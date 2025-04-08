import { useNavigate } from "react-router-dom";

function ConnectionUserCard({ name, username, profileImg }) {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <div
      className="flex flex-row items-center gap-5 hover:bg-gray-200 rounded-lg p-2 cursor-pointer transitionc my-2"
      onClick={() => handleNav()}
    >
      <div>
        <img src={profileImg} alt="" className="w-14 h-14 rounded-full" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-mainText font-semibold">{name}</h1>
        <h3 className=" text-secondary-text font-semibold">@{username}</h3>
      </div>
    </div>
  );
}

export default ConnectionUserCard;
