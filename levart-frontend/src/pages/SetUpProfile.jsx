import { useEffect, useRef, useState } from "react";
import {
  SetUpAbout,
  SetUpBackground,
  SetUpLayout,
  SetUpLocation,
  SetUpProfileImage,
} from "../components/SettingUpProfile/SetUp";
import { fetchUser, uploadImage } from "../store/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBgImage,
  editLayout,
  editUserInfo,
} from "../services/edit-profile-api";
import { useNavigate } from "react-router-dom";

function SetUpProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { userProfile } = useSelector((state) => state.profile);
  const { username } = user;
  useEffect(() => {
    dispatch(fetchUser({ username }));
  }, [dispatch, username]);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    country: "",
    city: "",
    about: "",
    layout: 1,
  });
  const [imgForm, setImgForm] = useState({ name: "", type: "", uri: "" });
  const [imgBgForm, setImgBgForm] = useState({ name: "", type: "", uri: "" });
  const imageInput = useRef(null);

  useEffect(() => {
    if (userProfile) {
      setForm((prevState) => ({
        ...prevState,
        username: userProfile.username,
        firstname: userProfile.firstname,
        lastname: userProfile.lastname,
      }));
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClear = (field) => {
    setForm((prevState) => ({
      ...prevState,
      [field]: "",
    }));
  };

  const handleNextPage = () => {
    if (currentPage < 5) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleUploadData = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (
      !form.country ||
      !form.city ||
      !form.about ||
      !imgForm.uri ||
      !imgBgForm.uri
    ) {
      alert("Please complete all fields.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Form data", form);
      console.log("Image form", imgForm);
      console.log("Background form", imgBgForm);

      if (imgForm.uri) {
        dispatch(uploadImage({ form: imgForm }));
      }
      if (imgBgForm.uri) {
        await changeBgImage({ form: imgBgForm });
      }

      await editUserInfo({
        formUser: {
          username: form.username,
          firstname: form.firstname,
          lastname: form.lastname,
          country: form.country,
          city: form.city,
          about: form.about,
        },
      });

      await editLayout({ layout: form.layout });
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      console.log("All data successfully uploaded.");
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.error("Error during upload:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <SetUpLocation
            form={form}
            handleChange={handleChange}
            handleClear={handleClear}
            handleNextPage={handleNextPage}
          />
        );
      case 2:
        return (
          <SetUpAbout
            form={form}
            handleChange={handleChange}
            handleClear={handleClear}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
          />
        );
      case 3:
        return (
          <SetUpProfileImage
            imgForm={imgForm}
            setImgForm={setImgForm}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            imageInput={imageInput}
            // handleUpload={handleUpload}
          />
        );
      case 4:
        return (
          <SetUpBackground
            imgBgForm={imgBgForm}
            setImgBgForm={setImgBgForm}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            imageInput={imageInput}
          />
        );
      case 5:
        return (
          <SetUpLayout
            form={form}
            setForm={setForm}
            handleChange={handleChange}
            handleUploadData={handleUploadData}
            handlePreviousPage={handlePreviousPage}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full my-auto mx-auto max-w-7xl">
      <div className="my-10">
        <h1 className=" text-center text-2xl text-mainText font-semibold ">
          Getting Started with Your Profile
        </h1>
        <p className="text-center text-md text-secondary-text">
          Welcome to the first step of your journey! Let's create your perfect
          travel profile together.
        </p>
      </div>
      <form
        onSubmit={handleUploadData}
        className="w-full h-full flex flex-col my-5 mx-auto max-w-lg"
      >
        {renderPage()}
      </form>
    </div>
  );
}

export default SetUpProfile;
