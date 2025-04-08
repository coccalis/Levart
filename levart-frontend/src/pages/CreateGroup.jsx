import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import fallback_img from "../assets/images/fallback_img.png";
import { useRef, useState } from "react";
import { createGroup } from "../services/groups-api";

function CreateGroup() {
  const imageInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [formInfo, setFormInfo] = useState({
    name: "",
    information: "",
    image: {
      name: "",
      type: "",
      uri: "",
    },
  });

  const handleUpload = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setFormInfo({
        ...formInfo,
        image: {
          name: file.name,
          type: file.type,
          uri: URL.createObjectURL(file),
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsInvalid(false);

    if (
      !formInfo.image.uri ||
      formInfo.name === "" ||
      formInfo.information === ""
    ) {
      setIsLoading(false);
      setIsInvalid(true);
      return;
    }

    console.log("formInfo", formInfo);
    try {
      await createGroup(formInfo);
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-10">
      <div className=" ">
        <h1 className="text-2xl font-semibold text-mainText my-5">
          Create Group
        </h1>
        <form onSubmit={handleSubmit}>
          <button
            type="button"
            className="w-full"
            onClick={() => imageInput.current.click()}
          >
            <img
              src={formInfo.image.uri || fallback_img}
              alt="prev"
              className="w-full h-auto max-h-48 sm:max-h-56 md:max-h-72 lg:max-h-96 xl:max-h-[30rem] aspect-[16/9] object-cover  rounded-lg"
            />

            <input
              type="file"
              color="none"
              onChange={handleUpload}
              ref={imageInput}
              accept="image/jpeg, image/jpg, image/png"
              className="hidden"
            />
          </button>
          <div className="space-y-5 my-10">
            <Input
              type="text"
              label="Group Name"
              labelPlacement="outside"
              value={formInfo.name}
              onChange={(e) =>
                setFormInfo({ ...formInfo, name: e.target.value })
              }
              radius="sm"
              variant="bordered"
              isInvalid={isInvalid}
              isClearable
              isRequired
              classNames={{
                inputWrapper: ["border-1", "font-bold"],
                label: ["group-data-[focus=true]:text-mainText"],
              }}
              className="w-1/2"
            />
            <Textarea
              type="text"
              label="Group Information"
              labelPlacement="outside"
              value={formInfo.information}
              onChange={(e) =>
                setFormInfo({ ...formInfo, information: e.target.value })
              }
              maxRows={4}
              isInvalid={isInvalid}
              radius="sm"
              variant="bordered"
              isClearable
              isRequired
              classNames={{
                inputWrapper: ["border-1", "font-bold"],
                label: ["font-bold", "group-data-[focus=true]:text-mainText"],
              }}
              className="w-full h-full"
            />

            <Button type="submit" color="primary" className="font-semibold">
              {isLoading ? <Spinner color="white" size="md" /> : "Create Group"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CreateGroup;
