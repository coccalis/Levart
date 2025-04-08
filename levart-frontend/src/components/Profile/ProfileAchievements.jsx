import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAchievements } from "../../store/profileSlice";
import achievementsData from "../../data/achievements";

function ProfileAchievements({ isMyProfile }) {
  const dispatch = useDispatch();
  const { userAchievements } = useSelector((state) => state.profile);
  const { userProfile, connectedUserProfile } = useSelector(
    (state) => state.profile
  );

  const username = isMyProfile
    ? connectedUserProfile.username
    : userProfile.username;

  useEffect(() => {
    dispatch(fetchUserAchievements({ username }));
  }, [dispatch, username]);

  const renderAchievements = () => {
    return Object.entries(achievementsData).map(([category, achievements]) => {
      const unlockedCount = userAchievements[category] || 0; // Get the number of unlocked achievements in this category

      return (
        <>
          <div key={category} className="achievement-category text-mainText">
            <h1 className="font-semibold text-xl">{category}</h1>

            <div className="flex flex-wrap justify-start space-x-5">
              {achievements.map((achievement, index) => {
                const isUnlocked = unlockedCount >= achievement.threshold;
                return (
                  <div
                    key={index}
                    className="border-1 border-gray-200 p-5 rounded-md hover:shadow-md my-2 flex flex-col items-center justify-center w-1/5 cursor-pointer"
                  >
                    <img
                      src={achievement.icon}
                      alt={achievement.title}
                      className={`object-fit w-20 h-20 ${
                        isUnlocked ? "" : "grayscale"
                      }`}
                    />
                    <h1 className="font-semibold text-mainText text-xl">
                      {achievement.title}
                    </h1>
                    <p className="font-semibold text-secondary-text text-sm">
                      {achievement.subtext}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      );
    });
  };

  console.log("userAchievements: ", userAchievements);
  return (
    <div className="achievements">
      <div className="my-2">
        <h1 className="text-xl font-semibold text-mainText my-2">
          {isMyProfile ? `Your ` : `${username}'s`} Travel Achievements:
        </h1>
        <p className=" text-sm text-secondary-text font-semibold">
          {isMyProfile
            ? `Celebrate your milestones and see how far you've come! From your first
          pin on the map to exploring new continents, every adventure counts.
          Keep exploring to unlock more badges and share your journey with the
          world!`
            : `Get inspired by ${username}'s travel milestones! From their first pin to their latest adventure, every achievement tells a story. Who knows? Their journey might just spark your next trip!`}
        </p>
      </div>
      {renderAchievements()}
    </div>
  );
}

export default ProfileAchievements;
