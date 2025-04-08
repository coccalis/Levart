import { Button, Checkbox, Input, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { EyeSlashFilledIcon } from "../assets/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../assets/icons/EyeFilledIcon";
import img from "../assets/images/sign_in_img.webp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/authSlice";

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  console.log("form", form);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.email === "" && form.password === "") {
      alert("error");
      return;
    }
    dispatch(
      loginUser({
        email: form.email,
        password: form.password,
        rememberMe: form.rememberMe,
      })
    );

    if (isAuthenticated) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <>
      <main className="w-full flex flex-col items-center justify-center my-10 sm:px-4">
        <div className="bg-white shadow-lg py-6 space-y-8 sm:p-6 sm:rounded-lg xsm:w-8/12 lg:w-1/2 p-unit-lg ">
          <div className="grid lg:grid-cols-2 md:grid-cols-1">
            <div className="p-3 space-y-5 my-5">
              <div>
                <h1 className="text-center font-bold text-mainText text-2xl mb-10">
                  Sign in
                </h1>
              </div>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <Input
                    type="email"
                    label="Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    labelPlacement="outside"
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
                <div className="py-1">
                  <Input
                    label="Password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    labelPlacement="outside"
                    variant="bordered"
                    radius="sm"
                    description="We recommend to include this variations Aa1?/-"
                    isRequired
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
                <div className="flex items-center justify-start text-sm">
                  <div className="flex items-center gap-x-3">
                    <Checkbox
                      radius="sm"
                      color="primary"
                      classNames={{
                        icon: "text-white",
                      }}
                      isSelected={form.rememberMe}
                      onValueChange={() =>
                        setForm((prev) => ({
                          ...prev,
                          rememberMe: !prev.rememberMe,
                        }))
                      }
                    >
                      Remember me
                    </Checkbox>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full px-4 py-2 text-white text-lg font-medium bg-mainBtn hover:bg-hoverLinkBtn active:bg-green-700 rounded-lg duration-150"
                >
                  {isLoading ? (
                    <Spinner size="sm" color="default" />
                  ) : (
                    `Sign in`
                  )}
                </Button>
                {error && (
                  <p className="text-center text-error font-semibold">
                    {error}
                  </p>
                )}
              </form>
              <p className="text-center">
                Don’t have an account?&nbsp;
                <a
                  href="/register"
                  className="font-medium text-green-600 hover:text-hoverLinkBtn"
                >
                  Sign up
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

export default Login;
