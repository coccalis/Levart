import { Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import EditGroupInfo from "../components/Groups/EditGroup/EditGroupInfo";
import EditMembers from "../components/Groups/EditGroup/EditMembers";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroup } from "../store/groupSlice";
import { useParams } from "react-router-dom";

function EditGroup() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { group } = useSelector((state) => state.group);
  const [selected, setSelected] = useState("group-info");
  const { deleteTrigger } = useSelector((state) => state.group);

  useEffect(() => {
    dispatch(fetchGroup(id));
  }, [dispatch, deleteTrigger]);

  return (
    <div className="w-full my-10 mx-auto max-w-7xl">
      <div className="my-5">
        <h1 className="font-semibold text-2xl text-mainText text-center">
          Edit Group
        </h1>
      </div>
      <div>
        <Tabs
          aria-label="Options"
          size="lg"
          radius="sm"
          color="primary"
          variant="bordered"
          selectedKey={selected}
          onSelectionChange={setSelected}
          className=" justify-evenly"
          classNames={{
            base: "w-full min-w-6xl",
            tab: "font-semibold w-full justify-center items-center",
            tabList: "w-full mx-16 ",
            tabContent: "w-full text-center",
            panel: "w-full",
          }}
        >
          <Tab key="group-info" title="Edit Group Info">
            <EditGroupInfo />
          </Tab>
          <Tab key="members" title="Manage Members">
            <EditMembers members={group?.members} groupId={id} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default EditGroup;
