import { faBicycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { SkeletonCard } from "../ui/SkeletonCard";
import FancyCard from "../ui/FancyCard";

function ActivitiesToDoIn() {
  const { connectedUserProfile } = useSelector((state) => state.profile);
  const { activities, isLoading } = useSelector((state) => state.browse);
  const userCity = connectedUserProfile?.city;
  const defaultCity = "New York";

  const activitiesToDo = activities?.filter(
    (activity) => activity.city === userCity
  );

  const activitiesToDoDefault = activities?.filter(
    (activity) => activity.city === defaultCity
  );

  return (
    <div className="mx-10 md:mx-10 lg:mx-36 py-5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <FontAwesomeIcon icon={faBicycle} className="size-7 text-mainText" />
          <h1 className="text-mainText text-2xl font-semibold  leading-none ml-2">
            {activitiesToDo?.length > 0 ? userCity : defaultCity}
            's Must Do's
          </h1>
        </div>
      </div>
      <div className="grid xsm:grid-col-1 lg:grid-cols-3 gap-x-10">
        {!isLoading
          ? activitiesToDo && activitiesToDo.length > 0
            ? activitiesToDo.map((activity, index) => (
                <FancyCard
                  key={index}
                  imageUrl={activity.imageUrl}
                  title={activity.title}
                  ratio={"aspect-[16/9]"}
                  category={activity.category}
                />
              ))
            : activitiesToDoDefault.map((activity, index) => (
                <FancyCard
                  key={index}
                  imageUrl={activity.imageUrl}
                  title={activity.title}
                  ratio={"aspect-[16/9]"}
                  category={activity.category}
                />
              ))
          : [...Array(3)].map((_, index) => (
              <SkeletonCard key={index} index={index} />
            ))}
      </div>
    </div>
  );
}

export default ActivitiesToDoIn;
