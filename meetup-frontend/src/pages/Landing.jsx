import React from 'react';
import MeetUpLogo from '../assets/meetup_logo6 2.svg';
import LinkButton from '../components/LinkButton';

function Landing() {
  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-between h-full max-w-md w-full">
        <header className="flex flex-col items-center mb-16">
          <img src={MeetUpLogo} alt="MeetUp Logo" className="w-60 h-60" />
        </header>

        <main className="flex flex-col items-center justify-center pb-60 w-full">
          <div className="flex flex-col gap-6 w-full max-w-[300px]">
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
