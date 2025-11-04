import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import MeetupCard from '../components/MeetupCard';

const API_URL = "https://meetup-backend-latest-pdua.onrender.com";

function Profile() {
  const [user, setUser] = useState(null);
  const [upcomingMeetups, setUpcomingMeetups] = useState([]);
  const [pastMeetups, setPastMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      if (!token || !userId) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        
        const mockUser = {
          id: userId,
          name: localStorage.getItem('userName') || 'Användare',
        };
        setUser(mockUser);
        
        const response = await fetch(`${API_URL}/api/meetups/my-meetups`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Kunde inte hämta meetups');
        }

        const data = await response.json();
        
        setUpcomingMeetups(data.upcomingMeetups || []);
        setPastMeetups(data.pastMeetups || []);
        
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Kunde inte hämta användardata');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/');
  };

  if (loading) {
    return (
      <>
        <div className="p-4 min-h-screen">
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
        <div className="p-4 min-h-screen">
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
      <div className="p-4 pb-20 min-h-screen">
        <Header />
        <main className="flex flex-col gap-6">
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Min Profil</h1>
              <button 
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-red-500 transition underline"
              >
                Logga ut
              </button>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">Anmälda Meetups</h2>
            {upcomingMeetups.length > 0 ? (
              upcomingMeetups.map((meetup) => (
                <MeetupCard key={meetup._id} meetup={meetup} />
              ))
            ) : (
              <p className="text-gray-500">Du har inga anmälda meetups</p>
            )}
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">Tidigare Meetups</h2>
            {pastMeetups.length > 0 ? (
              pastMeetups.map((meetup) => (
                <MeetupCard key={meetup._id} meetup={meetup} />
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
