import { Link } from "react-router-dom";
import HostIcon from "../assets/host_icon.svg";
import TimeIcon from "../assets/time_icon.svg";
import LocationIcon from "../assets/location_icon.svg";

/* Title, host, time, and location will be fetched from api, and linked to meetup.id from api */

function MeetupCard() {
  return (
    /*<Link to={`/meetups/${meetup.id}`} className="flex flex-col">*/
    <article className="flex flex-col bg-[#d2d4d9] p-3 w-full h-[6rem] rounded-2xl">
      <header className="meetup-card flex flex-col items-start">
        <h3 className="meetup-title text-xl">Vandring</h3>
        <p className="meetup-description text-sm">
          En meetup för alla vandringsälskare.
        </p>
      </header>

      <ul
        aria-label="Detaljer om meetup"
        className="meetup-details flex w-full justify-end gap-3"
      >
        <li>
          <img src={HostIcon} alt="Host Icon" className="inline"></img>Värd
        </li>
        <li>
          <img src={TimeIcon} alt="Time Icon" className="inline"></img>Tid
        </li>
        <li>
          <img src={LocationIcon} alt="Location Icon" className="inline"></img>
          Plats
        </li>
      </ul>
    </article>
    /* </Link>*/
  );
}

export default MeetupCard;
