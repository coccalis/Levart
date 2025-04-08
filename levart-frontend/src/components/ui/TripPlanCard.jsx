import { ScrollShadow, useDisclosure } from "@nextui-org/react";
import { motion } from "framer-motion";
import ModalTrip from "../ui/ModalTrip";
import { useDispatch } from "react-redux";
import { setTripTitle } from "../../store/tripSlice";
import { useEffect } from "react";

function TripPlanCard({ tripDay }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const splitTripDay = (day) => {
    const parts = day.split("\n").filter((part) => part.trim());
    const dayTitle = parts[0].trim();
    const dayTitleMatch = parts[0].match(/^Day \d+:\s*(.*)$/);
    const titleOfDay = dayTitleMatch
      ? dayTitleMatch[1].trim()
      : parts[0].trim();

    const extractText = (text, keyword) =>
      text?.replace(`* ${keyword}:`, "").trim();

    const morning = extractText(parts[1], "Morning");
    const afternoon = extractText(parts[2], "Afternoon");
    const evening = extractText(parts[3], "Evening");
    const night = extractText(parts[4], "Night");

    return { titleOfDay, dayTitle, morning, afternoon, evening, night };
  };

  const { titleOfDay, dayTitle, morning, afternoon, evening, night } =
    splitTripDay(tripDay);

  useEffect(() => {
    dispatch(setTripTitle(titleOfDay));
  }, [titleOfDay, dispatch]);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.009 }}
        className="border border-gray-200 hover:border-divider-clr rounded-xl p-5 shadow-md w-full h-[570px] pb-5 cursor-pointer my-5"
        onClick={() => onOpen()}
      >
        <h1 className="text-lg text-mainText font-semibold">{dayTitle}</h1>

        <ScrollShadow
          hideScrollBar
          offset={100}
          isEnabled
          className="h-full pb-10 "
        >
          {morning && morning.trim() && (
            <p className=" line-clamp-4">
              <strong>Morning:</strong>
              <br />
              {morning}
              <br />
            </p>
          )}
          {afternoon && afternoon.trim() && (
            <p className=" line-clamp-4">
              <strong>Afternoon:</strong>
              <br />
              {afternoon}
              <br />
            </p>
          )}
          {evening && evening.trim() && (
            <p className=" line-clamp-4">
              <strong>Evening:</strong>
              <br />
              {evening}
              <br />
            </p>
          )}
          {night && night.trim() && (
            <p className=" line-clamp-4">
              <strong>Night:</strong>
              <br />
              {night}
              <br />
            </p>
          )}
        </ScrollShadow>
      </motion.div>
      <ModalTrip
        isOpen={isOpen}
        onClose={onClose}
        dayTitle={dayTitle}
        titleOfDay={titleOfDay}
        morning={morning}
        afternoon={afternoon}
        evening={evening}
        night={night}
      />
    </>
  );
}

export default TripPlanCard;
