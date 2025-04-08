import { Button, Input, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { changePassword } from "../../../services/edit-profile-api";
import { EyeSlashFilledIcon } from "../../../assets/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../../assets/icons/EyeFilledIcon";

function EditUserSecurity() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isLoading, setIsLoading] = useState(false);
  const [isInavlid, setIsInvalid] = useState(false);
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (form.oldPassword === "" || form.newPassword === "") {
      setIsInvalid(true);
      setIsLoading(false);
      return;
    }

    try {
      await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
      setIsInvalid(false);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsInvalid(false);
    }
  };
  return (
    <div className="border-1 border-gray-100 rounded-lg shadow-lg p-5 mx-16">
      <div>
        <h1 className=" text-xl text-mainText font-semibold">
          Change Password
        </h1>
      </div>
      <div className="mx-auto max-w-2xl w-full">
        <form className="space-y-5 my-16" onSubmit={handleSubmit}>
          <div>
            <h1 className=" font-semibold text-mainText">Old Password</h1>
            <Input
              type={isVisible ? "text" : "password"}
              value={form.oldPassword}
              onChange={(e) =>
                setForm({ ...form, oldPassword: e.target.value })
              }
              radius="sm"
              variant="bordered"
              isClearable
              isRequired
              isInvalid={isInavlid}
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
              classNames={{
                inputWrapper: ["border-1", "font-bold"],
              }}
              className="w-auto"
            />
          </div>
          <div>
            <h1 className=" font-semibold text-mainText">New Password</h1>
            <Input
              type={isVisible ? "text" : "password"}
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
              radius="sm"
              variant="bordered"
              isClearable
              isRequired
              isInvalid={isInavlid}
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
              classNames={{
                inputWrapper: ["border-1", "font-bold"],
              }}
              className="w-auto"
            />
          </div>
          <div className="flex  justify-end my-16">
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
        </form>
      </div>
    </div>
  );
}

export default EditUserSecurity;
