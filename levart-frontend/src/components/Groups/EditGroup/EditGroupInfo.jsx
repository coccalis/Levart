import { useEffect, useRef, useState } from "react";
import fallback from "../../../assets/images/fallback_img.png";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { changeBgGroupImg, editGroup } from "../../../services/groups-api";
import { useSelector } from "react-redux";

function EditGroupInfo() {
  const { id } = useParams();
  const { group } = useSelector((state) => state.group);

  const imageInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formInfo, setFormInfo] = useState({
    id: id,
    name: "",
    information: "",
  });
  const [imageInfo, setImageInfo] = useState({
    name: "",
    type: "",
    uri: "",
  });

  useEffect(() => {
    setFormInfo({
      id: id,
      name: group?.name,
      information: group?.information,
    });
  }, [group]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageInfo({
        name: file.name,
        type: file.type,
        uri: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!imageInfo.uri && !formInfo.name && !formInfo.information) {
      return;
    }
    const promises = [];
    if (imageInfo.uri) {
      promises.push(changeBgGroupImg({ groupId: id, form: imageInfo }));
    }
    if (formInfo.name || formInfo.information) {
      promises.push(editGroup({ formInfo }));
    }

    try {
      await Promise.all(promises);
      setIsLoading(false);
      //   console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border 1 border-gray-100 rounded-lg shadow-lg p-5 mx-16">
      <div className="my-5">
        <h1 className=" text-xl text-mainText font-semibold">
          Edit Group Info
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <button
            type="button"
            className="w-full"
            onClick={() => imageInput.current.click()}
          >
            <img
              src={imageInfo.uri || group?.bgImage || fallback}
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
          <div className="space-y-10 my-10">
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
              isClearable
              isRequired
              classNames={{
                inputWrapper: ["border-1", "font-bold"],
              }}
              className="w-1/2"
            />
            <div className="my-5">
              <Input
                type="text"
                label="Group Information"
                labelPlacement="outside"
                value={formInfo.information}
                onChange={(e) =>
                  setFormInfo({ ...formInfo, information: e.target.value })
                }
                placeholder="Group Information"
                radius="sm"
                variant="bordered"
                isClearable
                isRequired
                classNames={{
                  inputWrapper: ["border-1", "font-bold"],
                }}
                className="w-full h-full my"
              />
            </div>

            <Button type="submit" color="primary" className="font-semibold">
              {isLoading ? <Spinner color="white" size="md" /> : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditGroupInfo;
