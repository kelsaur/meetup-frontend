import React from "react";
import MeetupCard from "../components/MeetupCard";
import SearchInput from "../components/SearchInput";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function MeetupList() {
  return (
    <>
      <div className="p-4">
        <Header />
        <div className="flex flex-col gap-10">
          <SearchInput />
          <div className="flex flex-col gap-3">
            <MeetupCard />
            <MeetupCard />
            <MeetupCard />
            <MeetupCard />
            <MeetupCard />
            <MeetupCard />
            <MeetupCard />
            <MeetupCard />
            <MeetupCard />
            <MeetupCard />
            <MeetupCard />
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
}

export default MeetupList;
