import { DateTime } from "luxon";

function Forecast({ data, units }) {
  const formatToLocalTime = (unixTimestamp, timezone) => {
    // Convert Unix timestamp to a Luxon DateTime object
    const dateTime = DateTime.fromMillis(unixTimestamp * 1000);
    
    // Format the time in 12-hour format with AM/PM indication
    const formattedTime = dateTime.toFormat("hh:mm a");
    
    // Get current date for comparison
    const now = DateTime.now();
    
    // Format the date as "Today" if it's the current day or as "EEE, dd" for other days
    const formattedDate = dateTime.hasSame(now, 'day')
      ? "Today"
      : dateTime.toFormat("EEE, dd");
      
    return { formattedTime, formattedDate };
  };

  const tempUnit = units === "metric" ? "°C" : "°F";

  return (
    <div>
      <div className="flex items-center justify-start my-2">
        <p className="text-white font-medium">Daily Forecast</p>
      </div>
      <hr className="my-1" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-white">
        {data.list.slice(0, 12).map((item, idx) => {
          const { formattedTime, formattedDate } = formatToLocalTime(
            item.dt,
            data.city.timezone
          );
          return (
            <div
              className="flex items-center justify-between p-2 bg-white/10 rounded-lg backdrop-blur-sm"
              key={idx}
            >
              <div className="flex flex-col items-start">
                <p className="font-light text-sm">{formattedDate}</p>
                <p className="font-light text-sm">{formattedTime}</p>
                <p className="font-medium text-lg">
                  {Math.round(item.main.temp)}
                  {tempUnit}
                </p>
              </div>
              <div className="flex items-center">
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="weather_condition_icon"
                  className="w-12"
                />
              </div>
            </div>
          );
        })}
      </div>
      <hr className="my-2" />
    </div>
  );
}

export default Forecast;
