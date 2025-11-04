import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MeetUpLogo from '../assets/meetup_logo6 2.svg';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { loginUser } from '../api/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Alla fält måste fyllas i.');
      return;
    }

    const credentials = {
      email: email,
      password: password,
    };

    try {
      const response = await loginUser(credentials);
      console.log('Inloggning lyckades:', response);
      
      if (response.user && response.user.name) {
        localStorage.setItem('userName', response.user.name);
      }
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Fel vid inloggning:', err.message || err);
      setError(err.message || 'Ett oväntat fel inträffade vid inloggning.');
    }
  };

  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-between h-full max-w-md w-full">
        <header className="flex flex-col items-center mb-16">
          <img src={MeetUpLogo} alt="MeetUp Logo" className="mb-8 w-60 h-60" />
          <h1 className="text-3xl font-bold text-gray-800">Logga In</h1>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center px-8 w-full">
          <form onSubmit={handleSubmit} className="w-full max-w-[300px] flex flex-col gap-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <InputField
              type="email"
              placeholder="E-post"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">
              LOGGA IN
            </Button>
          </form>
          <p className="mt-4 text-gray-600">
            Har du inget konto?{' '}
            <Link to="/register" className="text-[#4B88A2] hover:underline">
              Skapa konto här
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}

export default Login;
