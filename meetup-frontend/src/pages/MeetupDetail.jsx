import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import MeetupDetailCard from "../components/MeetupDetailCard";
import { getMeetupById } from "../api/api";
import RegisterButton from "../components/RegisterButton";
import UnregisterButton from "../components/UnregisterButton";

function MeetupDetail() {
  const { id } = useParams();
  const [meetup, setMeetup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  //console.log("User ID: ", userId, "Meetup ID: ", id);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMeetupById(id);
        setMeetup(data);

        //console.log(data.registeredUsers[0]);
        const registered = data.registeredUsers.some((u) => u?._id === userId);
        console.log(registered);

        setIsRegistered(registered);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Okänt fel");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id, userId]);

  const handleRegistered = () => {
    setIsRegistered(true);
    setMeetup((m) => ({
      ...m,
      registeredUsers: [...m.registeredUsers, { _id: userId }],
    }));
  };

  const handleUnregistered = () => {
    setIsRegistered(false);
    setMeetup((m) => ({
      ...m,
      registeredUsers: m.registeredUsers.filter((u) => u?._id !== userId),
    }));
  };

  const isFull =
    !!meetup &&
    Array.isArray(meetup.registeredUsers) &&
    meetup.registeredUsers.length >= meetup.capacity;

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

              {/* not logged in */}
              {!token && (
                <p>
                  Du behöver vara inloggad för att kunna anmäla dig för mötet.
                </p>
              )}

              {/* not registered, not fully booked */}
              {token && !isRegistered && !isFull && (
                <RegisterButton
                  meetupId={meetup._id}
                  onRegistered={handleRegistered}
                />
              )}

              {/* not registered, fully BOOKED */}
              {token && !isRegistered && isFull && (
                <p>Den här meetup:en är fullbokad.</p>
              )}

              {/* registered, not fully booked/fully BOOKED */}
              {token && isRegistered && (
                <UnregisterButton
                  meetupId={meetup._id}
                  onUnregistered={handleUnregistered}
                />
              )}
            </>
          )}
        </main>
      </div>
      <Navbar />
    </div>
  );
}

export default MeetupDetail;
