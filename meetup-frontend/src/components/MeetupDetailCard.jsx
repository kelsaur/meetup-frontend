import { Link } from "react-router-dom";
import HostIcon from "../assets/host_icon.svg";
import TimeIcon from "../assets/time_icon.svg";
import LocationIcon from "../assets/location_icon.svg";
import AttendeesIcon from "../assets/attendees_icon.png";

/* Title, host, time, and location will be fetched from api, and linked to meetup.id from api */

function MeetupDetailCard() {
  return (
    <div className="flex flex-col bg-[#d2d4d9] p-3 w-full h-[40rem] rounded-2xl">
      <article className="flex flex-col justify-between h-full">
        <header className="flex w-full justify-between">
          <h3 className="text-2xl">Vandring</h3>
          <ul className="flex flex-col items-end gap-1 text-right">
            <li className="flex items-center gap-x-2">
              <span>Värd</span>
              <img src={HostIcon} alt="Ikon för värd" className="w-4 h-4" />
            </li>
            <li className="flex items-center gap-x-2">
              <span>Tid</span>
              <img src={TimeIcon} alt="Ikon för tid" className="w-4 h-4" />
            </li>
            <li className="flex items-center gap-x-2">
              <span>Plats</span>
              <img
                src={LocationIcon}
                alt="Ikon för plats"
                className="w-4 h-4"
              />
            </li>
          </ul>
        </header>
        <section aria-label="Beskrivning av meetup" className="text-xl">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            feugiat, ex vitae dapibus efficitur, elit diam pharetra metus,
            auctor elementum ex mauris at risus. Curabitur sed sodales augue.
            Proin eget nibh interdum, dignissim lacus at, tincidunt lectus. In
            malesuada semper velit, id pharetra metus pulvinar consectetur.
          </p>
        </section>

        <section aria-label="Deltagare">
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-x-2 whitespace-nowrap">
              <img
                src={AttendeesIcon}
                alt="Ikon för antal platser"
                className="w-5 h-5"
              />
              <span>Antal platser:</span>
            </li>
            <li className="flex items-center gap-x-2 whitespace-nowrap">
              <img
                src={AttendeesIcon}
                alt="Ikon för bokade platser"
                className="w-5 h-5"
              />
              <span>Bokade platser:</span>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}

export default MeetupDetailCard;
