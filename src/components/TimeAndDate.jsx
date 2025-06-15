import React from "react";
import { DateTime } from "luxon";

function TimeAndDate({ data }) {
  // Extracting data from props
  const { dt, timezone, name: city } = data;

  // Convert Unix timestamp to a Luxon DateTime object
  const dateTime = DateTime.fromMillis(dt * 1000);

  // Format the DateTime object as required

  const formattedDateTime = dateTime.toFormat(`EEEE, dd LLLL yyyy | hh:mm a`);

  return (
    <div>
      <div className="flex justify-center items-center my-4">
        <p className="text-base sm:text-xl text-white font-light text-center px-2">{formattedDateTime}</p>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-2xl sm:text-3xl text-white font-medium text-center">{city}</p>
      </div>
    </div>
  );
}

export default TimeAndDate;
