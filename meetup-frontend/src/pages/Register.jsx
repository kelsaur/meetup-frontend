import React from 'react';
import { Link } from 'react-router-dom';
import MeetUpLogo from '../assets/meetup_logo6 2.svg';
import Button from '../components/Button';

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg text-center w-[430px] h-[932px] flex flex-col justify-between">
        <header className="pt-20 flex flex-col items-center">
          <img src={MeetUpLogo} alt="MeetUp Logo" className="mx-auto w-60 h-60" />
        </header>

        <main className="flex-grow flex flex-col items-center justify-center space-y-6">
          <form className="w-full max-w-[300px] space-y-4">
            <div>
              <input
                type="email"
                placeholder="E-post"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B88A2]"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Lösenord"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B88A2]"
              />
            </div>
            <Button type="submit">
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
