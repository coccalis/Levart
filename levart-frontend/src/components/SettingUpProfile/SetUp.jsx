import { Avatar, Button, Input, Spinner, Textarea } from "@nextui-org/react";
import { LayoutOne, LayoutTwo } from "../../assets/icons/Layout/Layout";
import fallbackImg from "../../assets/images/fallback_img.png";

export function SetUpLocation({
  form,
  handleChange,
  handleClear,
  handleNextPage,
}) {
  return (
    <div className=" p-5 border-gray-200 rounded-xl border-1 shadow-md min-h-full">
      <div className="h-full flex flex-col items-center justify-center space-y-5">
        <div className="w-full text-center">
          <h1 className=" text-mainText font-semibold text-xl">
            Share Your Home Base
          </h1>
          <p className="text-center text-md text-secondary-text">
            Tell fellow travelers about your corner of the world by adding your
            city and country.
          </p>
        </div>

        <Input
          type="text"
          label="Country"
          name="country"
          value={form.country}
          onChange={handleChange}
          labelPlacement="outside"
          radius="sm"
          variant="bordered"
          isClearable
          isRequired
          onClear={() => handleClear("country")}
          className="py-1 xsm:w-full lg:w-unit-5xl"
          classNames={{
            inputWrapper: ["border-1", "font-bold"],
          }}
        />
        <Input
          type="text"
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          labelPlacement="outside"
          radius="sm"
          variant="bordered"
          isClearable
          isRequired
          onClear={() => handleClear("city")}
          className="py-1 xsm:w-full lg:w-unit-5xl"
          classNames={{
            inputWrapper: ["border-1", "font-bold"],
          }}
        />

        <Button
          size="md"
          color="primary"
          className="font-semibold w-1/2 text-lg"
          onClick={handleNextPage}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export function SetUpAbout({
  form,

  handleChange,
  handleClear,
  handleNextPage,
  handlePreviousPage,
}) {
  return (
    <div className=" p-5 border-gray-200 rounded-xl border-1 shadow-md min-h-full">
      <div className="h-full flex flex-col items-center justify-center space-y-5">
        <div className="w-full text-center">
          <h1 className=" text-mainText font-semibold text-xl">
            Your Travel Story
          </h1>
          <p className="text-center text-md text-secondary-text">
            Share what makes you unique as a traveler - your interests,
            experiences, and dreams.
          </p>
        </div>
        <Textarea
          type="text"
          label="About"
          placeholder="Tell us about yourself"
          name="about"
          value={form.about}
          onChange={handleChange}
          labelPlacement="outside"
          minRows={2}
          radius="sm"
          variant="bordered"
          isClearable
          isRequired
          onClear={() => handleClear("about")}
          className="py-1 xsm:w-full lg:w-unit-5xl"
          classNames={{
            inputWrapper: ["border-1", "font-bold"],
          }}
        />

        <div className="flex flex-row justify-between space-x-5 w-full">
          <Button
            size="md"
            color="primary"
            variant="bordered"
            className="font-semibold w-1/2 text-lg"
            onClick={handlePreviousPage}
          >
            Back
          </Button>
          <Button
            size="md"
            color="primary"
            className="font-semibold w-1/2 text-lg"
            onClick={handleNextPage}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SetUpProfileImage({
  imgForm,
  setImgForm,
  handleNextPage,
  handlePreviousPage,
  imageInput,
}) {
  const handleUpload = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setImgForm({
        name: file.name,
        type: file.type,
        uri: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div className=" p-5 border-gray-200 rounded-xl border-1 shadow-md min-h-full">
      <div className="h-full flex flex-col items-center justify-center space-y-5 ">
        <div className="w-full text-center">
          <h1 className=" text-mainText font-semibold text-xl">
            Put a Face to the Adventure
          </h1>
          <p className="text-center text-md text-secondary-text">
            Add your profile picture and let other travelers connect with the
            person behind the journeys.
          </p>
        </div>

        <Avatar
          radius="full"
          showFallback={imgForm.uri === "" ? true : false}
          src={
            imgForm.uri === ""
              ? "https://images.unsplash.com/broken"
              : imgForm.uri
          }
          alt="profile"
          className="w-32 h-32 cursor-pointer"
          onClick={() => imageInput.current.click()}
        />

        <input
          type="file"
          color="none"
          onChange={handleUpload}
          ref={imageInput}
          accept="image/jpeg, image/jpg, image/png"
          className="hidden"
        />

        <div className="flex flex-row justify-between space-x-5 w-full">
          <Button
            size="md"
            color="primary"
            variant="bordered"
            className="font-semibold w-1/2 text-lg"
            onClick={handlePreviousPage}
          >
            Back
          </Button>
          <Button
            size="md"
            color="primary"
            className="font-semibold w-1/2 text-lg"
            onClick={handleNextPage}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SetUpBackground({
  imgBgForm,
  setImgBgForm,
  handleNextPage,
  handlePreviousPage,
  imageInput,
}) {
  const handleUpload = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setImgBgForm({
        name: file.name,
        type: file.type,
        uri: URL.createObjectURL(file),
      });
    }
  };
  return (
    <div className="p-5 border-gray-200 rounded-xl border-1 shadow-md min-h-full">
      <div className="h-full w-full space-y-5 flex flex-col items-center justify-center">
        <div className="w-full text-center">
          <h1 className=" text-mainText font-semibold text-xl">
            Set Your Scene
          </h1>
          <p className="text-center text-md text-secondary-text">
            Choose a stunning background image that represents your travel
            spirit.
          </p>
        </div>

        <img
          onClick={() => imageInput.current.click()}
          src={imgBgForm.uri === "" ? fallbackImg : imgBgForm.uri}
          alt="background"
          className="w-full min-h-full h-80 border-1 border-gray-100 bg-gray-200 rounded-md object-cover cursor-pointer"
        />

        <input
          type="file"
          onChange={handleUpload}
          ref={imageInput}
          accept="image/jpeg, image/jpg, image/png"
          className="hidden"
        />

        <div className="flex flex-row justify-between space-x-5 w-full">
          <Button
            size="md"
            color="primary"
            variant="bordered"
            className="font-semibold w-1/2 text-md"
            onClick={handlePreviousPage}
          >
            Back
          </Button>
          <Button
            size="md"
            color="primary"
            className="font-semibold w-1/2 text-md"
            onClick={handleNextPage}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SetUpLayout({ form, setForm, handlePreviousPage, isLoading }) {
  return (
    <div className="p-5 border-gray-200 rounded-xl border-1 shadow-md min-h-full w-full">
      <div className="w-full space-y-5 flex flex-col items-center justify-center">
        <div className="w-full text-center">
          <h1 className=" text-mainText font-semibold text-xl">
            Style Your Space
          </h1>
          <p className="text-center text-md text-secondary-text">
            Select a profile layout that best showcases your travel personality.
            Don't worry - you can always change this later in your settings!
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 w-full">
          <div className="flex flex-col justify-center items-center">
            <label className="cursor-pointer w-full">
              <input
                type="radio"
                name="layout"
                value={1}
                className="hidden"
                checked={form.layout === 1}
                onChange={() => setForm({ ...form, layout: 1 })}
              />
              <LayoutOne
                className={`w-full h-auto max-w-sm ${
                  form.layout === 1
                    ? " text-hoverText hover:text-hoverLinkBtn"
                    : "text-[#ACACAC] hover:text-neutral-500"
                } `}
              />
            </label>
            <h1
              className={`text-center mt-2 ${
                form.layout === 1
                  ? " font-bold text-hoverText "
                  : " font-semibold text-mainText "
              }`}
            >
              Layout 1
            </h1>
          </div>
          <div className={`flex flex-col justify-center items-center `}>
            <label className="cursor-pointer w-full">
              <input
                type="radio"
                name="layout"
                value={2}
                className="hidden"
                checked={form.layout === 2}
                onChange={() => setForm({ ...form, layout: 2 })}
              />
              <LayoutTwo
                className={`w-full h-auto max-w-sm ${
                  form.layout === 2
                    ? " text-hoverText hover:text-hoverLinkBtn"
                    : "text-[#ACACAC] hover:text-neutral-500"
                } `}
              />
            </label>
            <h1
              className={`text-center mt-2 font-bold ${
                form.layout === 2
                  ? " font-bold text-hoverText "
                  : " font-semibold text-mainText "
              }`}
            >
              Layout 2
            </h1>
          </div>
        </div>

        <div className="flex flex-row justify-between space-x-5 w-full">
          <Button
            size="md"
            color="primary"
            variant="bordered"
            className="font-semibold w-1/2 text-md"
            onClick={handlePreviousPage}
          >
            Back
          </Button>
          <Button
            type="submit"
            size="md"
            color="primary"
            className="font-semibold w-1/2 text-md"
          >
            {isLoading ? (
              <Spinner size="md" color="white" />
            ) : (
              "Start Your Travel Story"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
