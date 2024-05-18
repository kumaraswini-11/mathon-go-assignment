import { parse, format } from "date-fns";

export const formatDate = (inputDate) => {
  // Parse the input string into a Date object
  const parsedDate = parse(inputDate, "dd/MM/yyyy, HH:mm:ss", new Date());

  // Format the parsed date to "dd MMM ''yy"
  const formattedDate = format(parsedDate, "dd MMM ''yy");

  return formattedDate;
};

export const formatTimestamp = (timestamp) => {
  // Extract minutes and seconds
  const minutes = Math.floor(timestamp / 60);
  const seconds = Math.floor(timestamp % 60);

  // Format the minutes and seconds
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0"); // Ensure two digits for seconds

  // Concatenate minutes and seconds with "min" and "sec"
  const formattedTime = `${formattedMinutes} min ${formattedSeconds} sec`;

  return formattedTime;
};
