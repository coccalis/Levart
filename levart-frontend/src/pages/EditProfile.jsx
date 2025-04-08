import { Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import EditUserInfo from "../components/Profile/EditProfile/EditUserInfo";
import EditUserlLayout from "../components/Profile/EditProfile/EditUserlLayout";
import EditUserSecurity from "../components/Profile/EditProfile/EditUserSecurity";
import EditChangeBgImg from "../components/Profile/EditProfile/EditChangeBgImg";

function EditProfile() {
  const [selected, setSelected] = useState("info");

  return (
    <div className="w-full my-10 mx-auto max-w-7xl">
      <div className="my-5">
        <h1 className="font-semibold text-2xl text-mainText text-center">
          Edit Profile
        </h1>
      </div>

      <Tabs
        aria-label="Options"
        size="lg"
        radius="sm"
        color="primary"
        variant="bordered"
        selectedKey={selected}
        onSelectionChange={setSelected}
        classNames={{
          base: "w-full min-w-6xl",
          tab: "font-semibold w-full justify-center items-center",
          tabList: "w-full mx-16 ",
          tabContent: "w-full text-center",
          panel: "w-full",
        }}
      >
        <Tab key="info" title="Edit Profile Info">
          <EditUserInfo />
        </Tab>
        <Tab key="bg" title="Change Background">
          <EditChangeBgImg />
        </Tab>
        <Tab key="layout" title="Change Layout">
          <EditUserlLayout />
        </Tab>
        <Tab key="security" title="Security">
          <EditUserSecurity />
        </Tab>
      </Tabs>
    </div>
  );
}

export default EditProfile;
