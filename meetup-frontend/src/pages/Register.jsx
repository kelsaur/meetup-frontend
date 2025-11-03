import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MeetUpLogo from '../assets/meetup_logo6 2.svg';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { createUser } from '../api/api';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  console.log("Register component rendered");

  // Temporär funktion för att testa om knappen är klickbar
  const handleButtonClick = () => {
    console.log("Button clicked!"); // DENNA MÅSTE LOGGAS NÄR DU KLICKAR PÅ KNAPPEN
  };

  const handleSubmit = async (event) => {
    console.log("handleSubmit called"); // DENNA MÅSTE LOGGAS NÄR FORMULÄRET SKICKAS
    event.preventDefault();
    setError('');

    if (!username || !email || !password) {
      setError('Alla fält måste fyllas i.');
      console.log("Validation failed: All fields required.");
      return;
    }

    const userData = {
      name: username,
      email: email,
      password: password,
    };

    console.log('Registreringsdata redo att skickas:', userData);

    try {
      const response = await createUser(userData);
      console.log('Registrering lyckades:', response);
      navigate('/login');
    } catch (err) {
      console.error('Fel vid registrering i komponent:', err.message || err);
      setError(err.message || 'Ett oväntat fel inträffade vid registrering.');
    }

    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg text-center w-[430px] h-[932px] flex flex-col justify-between">
        <header className="pt-20 flex flex-col items-center">
          <img src={MeetUpLogo} alt="MeetUp Logo" className="mx-auto mb-4 w-60 h-60" />
          <h1 className="text-3xl font-bold text-gray-800">Skapa Konto</h1>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center px-8 space-y-6">
          <form onSubmit={handleSubmit} className="w-full max-w-[300px] space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <InputField
                type="text"
                placeholder="Användarnamn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <InputField
                type="email"
                placeholder="E-post"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <InputField
                type="password"
                placeholder="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Lade till onClick här för att testa klickbarheten */}
            <Button type="submit" onClick={handleButtonClick}>
              REGISTRERA
            </Button>
          </form>
          <p className="mt-4 text-gray-600">
            Har du redan ett konto?{' '}
            <Link to="/login" className="text-[#4B88A2] hover:underline">
              Logga in här
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}

export default Register;
