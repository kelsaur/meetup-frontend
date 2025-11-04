import { Link } from "react-router-dom";
import HostIcon from "../assets/host_icon.png";
import TimeIcon from "../assets/time_icon.png";
import LocationIcon from "../assets/location_icon.png";

function MeetupCard({ meetup, className }) {
  const { _id, title, description, date, location, host } = meetup;

  const commonCardClass =
    "flex flex-col bg-[#d2d4d9] p-3 w-full gap-4 rounded-2xl";
  const finalClasses = `${commonCardClass} ${className}`;

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("sv-SE", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <Link to={`/meetup/${_id}`} className="flex flex-col">
      <article className={finalClasses}>
        <header className="meetup-card flex flex-col items-start">
          <h3 className="meetup-title text-xl">{title}</h3>
          <p className="meetup-description text-sm line-clamp-2">
            {description}
          </p>
        </header>

        <ul
          aria-label="Detaljer om meetup"
          className="meetup-details flex w-full justify-between text-xs"
        >
          <li className="flex items-center gap-1">
            <img src={HostIcon} alt="Host Icon" className="inline w-5"></img>
            <p>{host.name}</p>
          </li>
          <li className="flex items-center gap-1">
            <img src={TimeIcon} alt="Time Icon" className="inline w-5"></img>
            <p>{formatDate(date)}</p>
          </li>
          <li className="flex items-center gap-1">
            <img
              src={LocationIcon}
              alt="Location Icon"
              className="inline w-5"
            ></img>
            <p>{location}</p>
          </li>
        </ul>
      </article>
    </Link>
  );
}

export default MeetupCard;
