import { Button, Spinner } from "@nextui-org/react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import fallbackImg from "../../../assets/images/fallback_img.png";
import { changeBgImage } from "../../../services/edit-profile-api";

function EditChangeBgImg() {
  const { userProfile } = useSelector((state) => state.profile);

  const imageInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const [imgBgForm, setImgBgForm] = useState({
    name: "",
    type: "",
    uri: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await changeBgImage({ form: imgBgForm });
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
        <h1 className=" text-xl text-mainText font-semibold my-2">
          Change Background Image
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <img
              onClick={() => imageInput.current.click()}
              src={
                imgBgForm.uri === ""
                  ? userProfile?.backgroundImgUrl
                    ? userProfile.backgroundImgUrl
                    : fallbackImg
                  : imgBgForm.uri
              }
              alt="background"
              className="w-full  aspect-[16/9] border-1 border-gray-100 bg-gray-200 rounded-md object-cover cursor-pointer"
            />

            <input
              type="file"
              onChange={handleUpload}
              ref={imageInput}
              accept="image/jpeg, image/jpg, image/png"
              className="hidden"
            />
          </div>
          <div className="flex  justify-end">
            <Button type="submit" color="primary" className="font-semibold">
              {isLoading ? <Spinner color="white" size="md" /> : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditChangeBgImg;
