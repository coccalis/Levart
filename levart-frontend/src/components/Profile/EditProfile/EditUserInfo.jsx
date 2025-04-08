import { Avatar, Badge, Button, Input, Spinner } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, uploadImage } from "../../../store/profileSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { editUserInfo } from "../../../services/edit-profile-api";

function EditUserInfo() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userProfile } = useSelector((state) => state.profile);
  const { username } = user;
  console.log(user);
  useEffect(() => {
    dispatch(fetchUser({ username }));
  }, [dispatch, username]);

  const [isLoading, setIsLoading] = useState(false);

  const imageInput = useRef(null);
  const [form, setForm] = useState({
    name: "",
    type: "",
    uri: "",
  });
  const [formInfo, setFormInfo] = useState({
    username: "" || userProfile?.username,
    firstname: "" || userProfile?.firstname,
    lastname: "" || userProfile?.lastname,
    city: "" || userProfile?.city,
    country: "" || userProfile?.country,
    about: "" || userProfile?.about,
  });
  console.log("userProfile", userProfile);
  console.log("forminfo", formInfo);
  const handleUpload = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setForm({
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
      const uploadPromise = form.uri && dispatch(uploadImage({ form }));
      const hasFormInfoChanged = Object.keys(formInfo).some(
        (key) => formInfo[key] !== userProfile[key]
      );

      const editPromise =
        hasFormInfoChanged && editUserInfo({ formUser: formInfo });

      await Promise.all([uploadPromise, editPromise]);
      setIsLoading(false);
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-1 border-gray-100 rounded-lg shadow-lg p-5 mx-16">
      <div>
        <h1 className=" text-xl text-mainText font-semibold">Edit User Info</h1>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <div className="flex flex-col justify-center items-center">
            <Badge
              content={
                <>
                  <button onClick={() => imageInput.current.click()}>
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                </>
              }
              placement="bottom-right"
              className="bg-transparent"
            >
              <Avatar
                radius="full"
                src={userProfile?.imageUrl}
                alt="profile"
                className="w-36 h-36"
              />
            </Badge>
            <h1 className="text-lg font-semibold text-secondary-text">
              @{userProfile?.username}
            </h1>
            <div className="w-full flex justify-center items-center">
              <Input
                type="text"
                value={formInfo.about}
                onChange={(e) =>
                  setFormInfo({ ...formInfo, about: e.target.value })
                }
                placeholder={userProfile?.about}
                radius="sm"
                variant="bordered"
                isClearable
                isRequired
                classNames={{
                  inputWrapper: [
                    "border-1 border-transparent shadow-transparent",
                    "font-bold",
                    "group-data-[focus=true]:border-transparent",
                    "group-data-[hover=true]:border-transparent",
                  ],
                  input: ["font-bold text-mainText"],
                }}
                className=" max-w-lg w-full"
              />
            </div>
            <input
              type="file"
              color="none"
              onChange={handleUpload}
              ref={imageInput}
              accept="image/jpeg, image/jpg, image/png"
              className="hidden"
            />
          </div>
          <hr className="bg-gray-100 h-1 rounded-lg mx-10" />
          <div className="mx-auto max-w-2xl w-full">
            <div className="grid grid-cols-2 gap-5 text-mainText font-semibold my-5">
              <div>
                <h1>First Name</h1>
                <Input
                  type="text"
                  value={formInfo.firstname}
                  onChange={(e) =>
                    setFormInfo({ ...formInfo, firstname: e.target.value })
                  }
                  placeholder={userProfile?.firstName}
                  radius="sm"
                  variant="bordered"
                  isClearable
                  isRequired
                  classNames={{
                    inputWrapper: ["border-1", "font-bold"],
                  }}
                  className="w-auto"
                />
              </div>
              <div>
                <h1>Last name</h1>
                <Input
                  type="text"
                  value={formInfo.lastname}
                  onChange={(e) =>
                    setFormInfo({ ...formInfo, lastname: e.target.value })
                  }
                  placeholder={userProfile?.lastName}
                  radius="sm"
                  variant="bordered"
                  isClearable
                  isRequired
                  classNames={{
                    inputWrapper: ["border-1", "font-bold"],
                  }}
                  className="w-auto"
                />
              </div>
              <div>
                <h1>City</h1>
                <Input
                  type="text"
                  value={formInfo.city}
                  onChange={(e) =>
                    setFormInfo({ ...formInfo, city: e.target.value })
                  }
                  placeholder={userProfile?.city}
                  radius="sm"
                  variant="bordered"
                  isClearable
                  isRequired
                  classNames={{
                    inputWrapper: ["border-1", "font-bold"],
                  }}
                  className="w-auto"
                />
              </div>
              <div>
                <h1>Country</h1>
                <Input
                  type="text"
                  value={formInfo.country}
                  onChange={(e) =>
                    setFormInfo({ ...formInfo, country: e.target.value })
                  }
                  placeholder={userProfile?.country}
                  radius="sm"
                  variant="bordered"
                  isClearable
                  isRequired
                  classNames={{
                    inputWrapper: ["border-1", "font-bold"],
                  }}
                  className="w-auto"
                />
              </div>
            </div>
          </div>
          <div className="flex  justify-end">
            <Button
              type="sumbit"
              color="primary"
              size="md"
              className="w-max font-semibold"
            >
              {isLoading ? (
                <Spinner color="white" size="small" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditUserInfo;
