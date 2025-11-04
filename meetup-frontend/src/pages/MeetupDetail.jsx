import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import MeetupDetailCard from "../components/MeetupDetailCard";
import { getMeetupById } from "../api/api";
import RegisterButton from "../components/RegisterButton";

function MeetupDetail() {
  const { id } = useParams();
  const [meetup, setMeetup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMeetupById(id);
        setMeetup(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Okänt fel");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="p-4">
        <Header />
        <main className="flex flex-col gap-5">
          {error && (
            <p className="text-sm text-red-600">
              Kunde inte hämta meetup: {error}
            </p>
          )}
          {isLoading && <p className="text-sm text-gray-600">Laddar…</p>}
          {!isLoading && !error && meetup && (
            <>
              <MeetupDetailCard meetup={meetup} />
              <RegisterButton meetupId={meetup._id} />
            </>
          )}
        </main>
      </div>

      <Navbar />
    </div>
  );
}

export default MeetupDetail;
