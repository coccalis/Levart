import { useState } from "react";
import { LayoutOne, LayoutTwo } from "../../../assets/icons/Layout/Layout";
import { Button, Spinner } from "@nextui-org/react";
import { editLayout } from "../../../services/edit-profile-api";
import { useSelector } from "react-redux";

function EditUserlLayout() {
  const { userProfile } = useSelector((state) => state.profile);
  console.log("eimai sto layout", userProfile);
  const [selectedLayout, setSelectedLayout] = useState(
    userProfile?.layout || 1
  );
  const [isLoading, setIsLoading] = useState(false);
  console.log(selectedLayout);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await editLayout({ layout: selectedLayout });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-1 border-gray-100 rounded-lg shadow-lg p-5 mx-16">
      <div>
        <h1 className=" text-xl text-mainText font-semibold">
          Edit Profile Layout
        </h1>
      </div>
      <div className="w-full my-5">
        <h1 className="text-center font-semibold text-secondary-text">
          Choose a layout that reflects your travel style!
        </h1>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 gap-x-16 ">
            <div className="flex flex-col justify-center items-center">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="layout"
                  value={1}
                  className="hidden"
                  checked={selectedLayout === 1}
                  onChange={() => setSelectedLayout(1)}
                />
                <LayoutOne
                  className={`w-full h-auto max-w-sm ${
                    selectedLayout === 1
                      ? " text-hoverText hover:text-hoverLinkBtn"
                      : "text-[#ACACAC] hover:text-neutral-500"
                  } `}
                />
              </label>
              <h1
                className={`text-center mt-2 ${
                  selectedLayout === 1
                    ? " font-bold text-hoverText "
                    : " font-semibold text-mainText "
                }`}
              >
                Layout 1
              </h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="layout"
                  value={2}
                  className="hidden"
                  checked={selectedLayout === 2}
                  onChange={() => setSelectedLayout(2)}
                />
                <LayoutTwo
                  className={`w-full h-auto max-w-sm ${
                    selectedLayout === 2
                      ? " text-hoverText hover:text-hoverLinkBtn"
                      : "text-[#ACACAC] hover:text-neutral-500"
                  } `}
                />
              </label>
              <h1
                className={`text-center mt-2 font-bold ${
                  selectedLayout === 2
                    ? " font-bold text-hoverText "
                    : " font-semibold text-mainText "
                }`}
              >
                Layout 2
              </h1>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="sumbit"
            color="primary"
            size="md"
            className="w-max font-semibold"
          >
            {isLoading ? <Spinner color="white" size="md" /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditUserlLayout;
