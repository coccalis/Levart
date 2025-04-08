import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../store/authSlice.js";
import { Button, Input, Spinner } from "@nextui-org/react";
import img from "../assets/images/register_img.webp";
import { EyeSlashFilledIcon } from "../assets/icons/EyeSlashFilledIcon.jsx";
import { EyeFilledIcon } from "../assets/icons/EyeFilledIcon.jsx";
import { useNavigate } from "react-router-dom";

function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(formData);
  const handleClear = (field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signupUser({ userData: formData }));
  };

  useEffect(() => {
    if (confirmPassword !== formData.password) {
      setIsInvalid(true);
      setErrorMessage("Passwords dont match!");
    } else {
      setIsInvalid(false);
      setErrorMessage("");
    }
  }, [confirmPassword, formData.password]);

  useEffect(() => {
    if (isAuthenticated) navigate("/setting-up-profile");
  }, [isAuthenticated, navigate]);

  return (
    <>
      <main className="w-auto flex flex-col items-center justify-center my-10">
        <div className="bg-white shadow-lg py-6 space-y-8 sm:p-6 sm:rounded-lg xsm:w-8/12 lg:w-7/12">
          <div className="grid lg:grid-cols-2 md:grid-cols-1">
            <div className="p-3 space-y-5 my-5">
              <div>
                <h1 className="text-center font-bold text-mainText text-2xl">
                  Create account
                </h1>
              </div>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <div className="grid lg:grid-cols-2 xsm:grid-rows-1 gap-x-4 w-full">
                    <div className="w-full">
                      <Input
                        type="text"
                        label="First Name"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        labelPlacement="outside"
                        radius="sm"
                        variant="bordered"
                        isClearable
                        onClear={() => handleClear("firstname")}
                        isRequired
                        className="py-1 xsm:w-full lg:w-unit-5xl"
                        classNames={{
                          inputWrapper: ["border-1", "font-bold"],
                        }}
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        type="text"
                        label="Last Name"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        labelPlacement="outside"
                        radius="sm"
                        variant="bordered"
                        isClearable
                        onClear={() => handleClear("lastname")}
                        isRequired
                        className="py-1 xsm:w-full lg:w-unit-5xl"
                        classNames={{
                          inputWrapper: ["border-1", "font-bold"],
                        }}
                      />
                    </div>
                  </div>
                  <Input
                    type="email"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    labelPlacement="outside"
                    radius="sm"
                    variant="bordered"
                    className="py-1"
                    isClearable
                    onClear={() => handleClear("email")}
                    isRequired
                    classNames={{
                      inputWrapper: ["border-1", "font-bold"],
                    }}
                  />
                  <Input
                    type="text"
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    labelPlacement="outside"
                    radius="sm"
                    variant="bordered"
                    className="py-1"
                    isClearable
                    onClear={() => handleClear("username")}
                    isRequired
                    classNames={{
                      inputWrapper: ["border-1", "font-bold"],
                    }}
                  />
                  <Input
                    isRequired
                    radius="sm"
                    variant="bordered"
                    label="Password"
                    labelPlacement="outside"
                    name="password"
                    description="We recommend to include this variations Aa1?/-"
                    value={formData.password}
                    onChange={handleChange}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="w-auto"
                    classNames={{
                      inputWrapper: ["border-1", "font-bold"],
                    }}
                  />
                  <Input
                    isRequired
                    radius="sm"
                    variant="bordered"
                    label="Confirm Password"
                    labelPlacement="outside"
                    name="confirmPassword"
                    value={confirmPassword}
                    onValueChange={setConfirmPassowrd}
                    isInvalid={isInvalid}
                    errorMessage={errorMessage}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="w-auto"
                    classNames={{
                      inputWrapper: ["border-1", "font-bold"],
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  className={`w-full px-4 py-2 text-white text-lg font-medium rounded-lg ${
                    isLoading
                      ? `bg-gray-400 hover:bg-gray-700 cursor-not-allowed`
                      : `bg-mainBtn hover:bg-hoverLinkBtn active:bg-green-700 duration-150`
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner color="white" size="sm" /> : "Register"}
                </Button>
                {error && <p className="text-red-500 text-center">{error}</p>}
              </form>
              <p className="text-center">
                Already have an account?&nbsp;
                <a
                  href="/login"
                  className="font-medium text-primary-grn hover:text-hoverText"
                >
                  Sign in
                </a>
              </p>
            </div>
            <div className="p-0 m-0">
              <div className="flex flex-row justify-end  xsm:hidden sm:hidden lg:inline ">
                <img
                  src={img}
                  alt="hehe"
                  className="w-auto h-full rounded-r-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Register;
