import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useState } from "react";
import ConnectionUserCard from "../ui/connectionUserCard";

function ModalConnections({ isOpen, onOpenChange, followers, following }) {
  const [selected, setSelected] = useState("followers");
  console.log("followers: ", followers);
  console.log("following: ", following);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      scrollBehavior="inside"
      className=" h-full min-h-[50vh]"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-row justify-center">
              <h1 className=" text-mainText font-bold text-xl text-center">
                Connections
              </h1>
            </ModalHeader>
            <ModalBody className="w-full">
              <Tabs
                aria-label="Options"
                size="lg"
                radius="sm"
                color="primary"
                variant="underlined"
                selectedKey={selected}
                onSelectionChange={setSelected}
                className=" justify-evenly"
                classNames={{
                  base: "w-full",
                  tab: "font-semibold w-full",
                  tabList: "w-full ",
                  tabContent: "w-full",
                  panel: "w-full",
                }}
              >
                <Tab key="followers" title="Followers">
                  {followers && followers?.length > 0 ? (
                    followers?.map((follower, index) => (
                      <ConnectionUserCard
                        key={index}
                        name={`${follower?.followed.firstname} ${follower?.followed.lastname}`}
                        username={follower?.followed.username}
                        profileImg={follower?.followed.imageUrl}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-center text-secondary-text font-semibold">
                      No followers yet.
                    </p>
                  )}
                </Tab>
                <Tab key="following" title="Following">
                  {following && following?.length > 0 ? (
                    following?.map((following, index) => (
                      <ConnectionUserCard
                        key={index}
                        name={`${following?.follower.firstname} ${following?.follower.lastname}`}
                        username={following?.follower.username}
                        profileImg={following?.follower.imageUrl}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-center text-secondary-text font-semibold">
                      You don't follow anyone yet.
                    </p>
                  )}
                </Tab>
              </Tabs>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalConnections;
