import React, { useState, useEffect } from "react";
import MeetupCard from "../components/MeetupCard";
import SearchInput from "../components/SearchInput";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { getMeetups } from "../api/api";

function MeetupList() {
  const [meetups, setMeetups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMeetups();
        setMeetups(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Okänt fel");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <div className="p-4">
        <Header />
        <main className="flex flex-col gap-5">
          <section>
            <SearchInput />
          </section>
          <section
            aria-label="Lista av alla meetups"
            className="flex flex-col gap-3"
          >
            {error && (
              <p className="text-sm text-red-600">
                Kunde inte hämta meetups: {error}
              </p>
            )}
            {isLoading && <p className="text-sm text-gray-600">Laddar…</p>}
            {!isLoading &&
              !error &&
              meetups.map((m) => <MeetupCard key={m._id} meetup={m} />)}
          </section>
        </main>
      </div>
      <Navbar />
    </>
  );
}

export default MeetupList;
