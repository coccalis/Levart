import { Button, Chip, Input, Spinner } from "@nextui-org/react";
import { useState } from "react";
import interests from "../data/tripInterests";
import { useDispatch } from "react-redux";
import { setTripInfo } from "../store/tripSlice";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/images/levart-guide-ai-1.svg";
import img2 from "../assets/images/levart-guide-ai-2.svg";
import img3 from "../assets/images/levart-guide-ai-3.svg";

function TripPlanner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [tripInfoForm, setTripInfoForm] = useState({
    destination: "",
    bugdet: "",
    duration: "",
    interests: [],
  });

  const handleStart = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsStarted(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleInterest = (interest) => {
    if (tripInfoForm.interests.includes(interest)) {
      setTripInfoForm({
        ...tripInfoForm,
        interests: tripInfoForm.interests.filter((item) => item !== interest),
      });
    } else {
      setTripInfoForm({
        ...tripInfoForm,
        interests: [...tripInfoForm.interests, interest],
      });
    }
  };

  const handlePlanTrip = () => {
    setIsLoading(true);
    if (
      tripInfoForm.destination === "" ||
      tripInfoForm.duration === "" ||
      tripInfoForm.bugdet === "" ||
      tripInfoForm.interests.length === 0
    ) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    dispatch(setTripInfo(tripInfoForm));
    setTimeout(() => {
      navigate("/trip-planner-result");
      setIsLoading(false);
    }, 1000);
  };

  console.log(tripInfoForm);

  return (
    <main className="w-full my-10 mx-auto max-w-7xl ">
      <div className="grid grid-cols-3 gap-x-5 min-h-[70vh]">
        {/* Left column */}
        <div className="border-1 border-gray-200 rounded-lg overflow-hidden shadow-md">
          {!isStarted ? (
            <img
              src={img1}
              alt="Levart AI"
              className="w-full h-full object-cover"
              style={{ maxHeight: "70vh" }}
            />
          ) : (
            <div className="p-5 flex flex-col h-full space-y-10">
              <div>
                <h2 className="text-lg text-mainText font-semibold my-5">
                  Where’s your next adventure taking you?
                </h2>
                <Input
                  placeholder="Destination"
                  value={tripInfoForm.destination}
                  onChange={(e) =>
                    setTripInfoForm({
                      ...tripInfoForm,
                      destination: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <h2 className="text-lg text-mainText font-semibold my-5">
                  How much are you planning to spend on your trip?
                </h2>
                <Input
                  placeholder="Bugdet"
                  value={tripInfoForm.bugdet}
                  onChange={(e) =>
                    setTripInfoForm({
                      ...tripInfoForm,
                      bugdet: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>

        {/* Middle column */}
        <div className="border-1 border-gray-200 rounded-lg relative shadow-md">
          {!isStarted ? (
            <div className="flex justify-between items-center flex-col h-full relative">
              {/* Image Container */}
              <div className="absolute inset-0 w-full h-full z-0">
                <img
                  src={img3} // Replace with your image URL
                  alt="Travel Background"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Text and Button Container */}
              <div className="z-10 text-center relative flex flex-col justify-between h-full p-5">
                <h1 className="text-3xl font-bold text-white mb-4">
                  LevartGuide AI
                </h1>
                <div className="text-center text-white">
                  <h1 className="font-bold text-xl mb-2">
                    Your smart travel companion that crafts personalized
                    itineraries in seconds, so you can explore more and plan
                    less.
                  </h1>
                </div>

                <div>
                  <h1 className="text-white font-bold text-lg mt-6">
                    Ready to start planning your trip?
                  </h1>
                  <Button
                    color="primary"
                    variant="solid"
                    onClick={handleStart}
                    className="w-full font-semibold text-lg mt-6 hover:bg-hoverLinkBtn"
                  >
                    {isLoading ? <Spinner color="white" /> : "Plan My Trip Now"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 flex flex-col justify-between h-full ">
              <div>
                <h1 className="text-mainText font-semibold text-lg my-5">
                  What’s the duration of your trip?
                </h1>
                <Input
                  placeholder="Duration"
                  value={tripInfoForm.duration}
                  description="To ensure the best experience for all travelers, we’ve limited trip durations to a maximum of 6 days due to high demand. Don’t worry—we’ll make every day unforgettable!"
                  type="number"
                  min={1}
                  max={6}
                  onChange={(e) =>
                    setTripInfoForm({
                      ...tripInfoForm,
                      duration: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex justify-center my-5">
                <Button
                  color="primary"
                  onClick={() => handlePlanTrip()}
                  className="w-full font-semibold text-lg hover:bg-hoverLinkBtn"
                >
                  Plan my trip
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="border-1 border-gray-200 rounded-lg overflow-hidden shadow-md">
          {!isStarted ? (
            <img
              src={img2}
              alt="Levart AI"
              className="w-full h-full object-cover"
              style={{ maxHeight: "70vh" }}
            />
          ) : (
            <div className="p-5">
              <h2 className=" text-mainText font-semibold text-xl my-5">
                What’s on your travel wishlist?
              </h2>
              {interests.map((interest, index) => (
                <Chip
                  key={index}
                  variant="flat"
                  className={`m-2 cursor-pointer hover:bg-hoverLinkBtn hover:text-white transition ${
                    tripInfoForm.interests.includes(interest)
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => handleInterest(interest)}
                >
                  {interest}
                </Chip>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default TripPlanner;
