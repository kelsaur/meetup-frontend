import React, { useState, useEffect, useMemo } from "react";
import MeetupCard from "../components/MeetupCard";
import SearchInput from "../components/SearchInput";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { getMeetups } from "../api/api";

function MeetupList() {
  const [meetups, setMeetups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getMeetups();
        const now = new Date();

        const upcoming = (Array.isArray(data) ? data : [])
          .filter((m) => new Date(m.date) >= now)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setMeetups(upcoming);
        //setMeetups(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Okänt fel");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return meetups;
    return meetups.filter((m) => {
      const inTitle = (m.title || "").toLowerCase().includes(q);
      const inDesc = (m.description || "").toLowerCase().includes(q);
      const inLocation = (m.location || "").toLowerCase().includes(q);
      return inTitle || inDesc || inLocation;
    });
  }, [meetups, query]);

  return (
    <>
      <div className="p-4 min-h-[100dvh] pb-20">
        <Header />
        <main className="flex flex-col gap-5">
          <section>
            <SearchInput value={query} onChange={setQuery} />
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

            {!isLoading && !error && filtered.length === 0 && (
              <p className="text-sm text-gray-600">
                Inga meetups matchar sökningen.
              </p>
            )}

            {!isLoading &&
              !error &&
              filtered.map((m) => <MeetupCard key={m._id} meetup={m} />)}
          </section>
        </main>
      </div>
      <Navbar />
    </>
  );
}

export default MeetupList;
