import React from 'react';
import MeetUpLogo from '../assets/meetup_logo6 2.svg';
import LinkButton from '../components/LinkButton';

function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-[430px] h-[932px] flex flex-col justify-between">
        <header className="pt-20 flex flex-col items-center">
          <img src={MeetUpLogo} alt="MeetUp Logo" className="mx-auto w-60 h-60" />
        </header>

        <main className="flex flex-col items-center justify-center pb-60">
          <div className="flex flex-col space-y-6 w-full max-w-[300px]">
            <LinkButton to="/register">
              SKAPA KONTO
            </LinkButton>
            <LinkButton to="/login">
              LOGGA IN
            </LinkButton>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Landing;
