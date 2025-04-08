export function refactorDate(date) {
  const oldDate = new Date(date);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
    oldDate
  );

  return formattedDate;
}

export function refactorTime(date) {
  const [hours, minutes] = date.split(":");
  return `${hours}:${minutes.padStart(2, "0")}`;
}

export function refactorPostDate(date) {
  const oldDate = new Date(date);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
    oldDate
  );

  return formattedDate;
}
