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
    <div className="time-section">
      <p className="time-label">Today</p>
      <h2 className="time-city">{city}</h2>
      <p className="time-date">{formattedDateTime}</p>
    </div>
  );
}

export default TimeAndDate;
