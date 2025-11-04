import { Link } from "react-router-dom";
import HostIcon from "../assets/host_icon.png";
import TimeIcon from "../assets/time_icon.png";
import LocationIcon from "../assets/location_icon.png";
import AttendeesIcon from "../assets/attendees_icon.png";

/* Title, host, time, and location will be fetched from api, and linked to meetup.id from api */

function MeetupDetailCard({ meetup }) {
  const {
    title,
    description,
    date,
    location,
    host,
    capacity,
    registeredUsers = [],
  } = meetup;

  const booked = registeredUsers.length;

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("sv-SE", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="flex flex-col bg-[#d2d4d9] p-5 w-full h-[40rem] rounded-2xl">
      <article className="flex flex-col justify-between h-full">
        <header className="flex w-full justify-between">
          <h3 className="text-2xl">{title}</h3>
          <ul className="flex flex-col items-end gap-1 text-right">
            <li className="flex items-center gap-x-2">
              <span>{host.name}</span>
              <img src={HostIcon} alt="Ikon för värd" className="w-4 h-4" />
            </li>
            <li className="flex items-center gap-x-2">
              <span>{formatDate(date)}</span>
              <img src={TimeIcon} alt="Ikon för tid" className="w-4 h-4" />
            </li>
            <li className="flex items-center gap-x-2">
              <span>{location}</span>
              <img
                src={LocationIcon}
                alt="Ikon för plats"
                className="w-4 h-4"
              />
            </li>
          </ul>
        </header>
        <section aria-label="Beskrivning av meetup" className="text-xl/8">
          <p>{description}</p>
        </section>

        <section aria-label="Deltagare">
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-x-2 whitespace-nowrap">
              <img
                src={AttendeesIcon}
                alt="Ikon för antal platser"
                className="w-5 h-5"
              />
              <span>Antal platser: {capacity}</span>
            </li>
            <li className="flex items-center gap-x-2 whitespace-nowrap">
              <img
                src={AttendeesIcon}
                alt="Ikon för bokade platser"
                className="w-5 h-5"
              />
              <span>Bokade platser: {booked} </span>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}

export default MeetupDetailCard;
