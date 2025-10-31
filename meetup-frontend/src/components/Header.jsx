import React from "react";
import MeetupLogo from "../assets/meetup_layout_logo.svg";

function Header() {
  return (
    <header className="flex justify-center pb-4">
      <img src={MeetupLogo} alt="MeetUp Logo" />
    </header>
  );
}

export default Header;
