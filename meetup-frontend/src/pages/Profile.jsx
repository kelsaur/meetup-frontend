import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import MeetupCard from '../components/MeetupCard';
import { getUser, getUserMeetups } from '../api/api';

function Profile() {
  const [user, setUser] = useState(null);
  const [upcomingMeetups, setUpcomingMeetups] = useState([]);
  const [pastMeetups, setPastMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      // Kolla om användaren är inloggad
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      if (!token || !userId) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        
        // Hämta användarinfo
        const userData = await getUser(userId);
        setUser(userData);
        
        // Hämta användarens meetups
        const meetupsData = await getUserMeetups(userId);
        
        // Dela upp i kommande och tidigare meetups
        const now = new Date();
        const upcoming = meetupsData.filter(meetup => new Date(meetup.date) >= now);
        const past = meetupsData.filter(meetup => new Date(meetup.date) < now);
        
        setUpcomingMeetups(upcoming);
        setPastMeetups(past);
        
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Kunde inte hämta användardata');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <>
        <div className="p-4">
          <Header />
          <main className="flex justify-center items-center h-screen">
            <p className="text-gray-500">Laddar...</p>
          </main>
        </div>
        <Navbar />
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="p-4">
          <Header />
          <main className="flex justify-center items-center h-screen">
            <p className="text-red-500">{error}</p>
          </main>
        </div>
        <Navbar />
      </>
    );
  }

  return (
    <>
      <div className="p-4">
        <Header />
        <main className="flex flex-col gap-6">
          {/* Användarinfo */}
          <section className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Min Profil</h1>
            {user && (
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
            )}
          </section>

          {/* Kommande meetups */}
          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">Anmälda Meetups</h2>
            {upcomingMeetups.length > 0 ? (
              upcomingMeetups.map((meetup) => (
                <MeetupCard key={meetup.id} meetup={meetup} />
              ))
            ) : (
              <p className="text-gray-500">Du har inga anmälda meetups</p>
            )}
          </section>

          {/* Tidigare meetups */}
          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">Tidigare Meetups</h2>
            {pastMeetups.length > 0 ? (
              pastMeetups.map((meetup) => (
                <MeetupCard key={meetup.id} meetup={meetup} />
              ))
            ) : (
              <p className="text-gray-500">Du har inga tidigare meetups</p>
            )}
          </section>
        </main>
      </div>
      <Navbar />
    </>
  );
}

export default Profile;
