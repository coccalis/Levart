import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import fetchGoogleImage from "../../services/google-image-api";
import fallbackImg from "../../assets/images/fallback_img.png";

function ModalTrip({
  isOpen,
  onClose,
  dayTitle,
  morning,
  afternoon,
  evening,
  night,
  titleOfDay,
}) {
  const [imageTrip, setImageTrip] = useState([]);

  useEffect(() => {
    if (isOpen) {
      async function fetchImage() {
        const data = await fetchGoogleImage({ query: titleOfDay });
        setImageTrip(data.items);
      }
      fetchImage();
    } else {
      setImageTrip([]);
    }
  }, [isOpen, titleOfDay]);

  console.log("imageTrip: ", imageTrip);

  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose} scrollBehavior="inside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <img
                src={imageTrip[0]?.link || fallbackImg}
                alt="trip"
                className="w-full h-50 object-cover aspect-[16/9] rounded-lg mt-5"
                onError={(e) => (e.target.src = fallbackImg)}
              />
              <h1>{dayTitle}</h1>
            </ModalHeader>
            <ModalBody className="text-mainText font-semibold">
              {morning && morning.trim() && (
                <p>
                  <strong>Morning:</strong>
                  <br />
                  {morning}
                  <br />
                </p>
              )}
              {afternoon && afternoon.trim() && (
                <p>
                  <strong>Afternoon:</strong>
                  <br />
                  {afternoon}
                  <br />
                </p>
              )}
              {evening && evening.trim() && (
                <p>
                  <strong>Evening:</strong>
                  <br />
                  {evening}
                  <br />
                </p>
              )}
              {night && night.trim() && (
                <p>
                  <strong>Night:</strong>
                  <br />
                  {night}
                  <br />
                </p>
              )}
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalTrip;
