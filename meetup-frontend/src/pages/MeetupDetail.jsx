import Header from "../components/Header";
import Navbar from "../components/Navbar";
import MeetupDetailCard from "../components/MeetupDetailCard";
import Button from "../components/Button";

function MeetupDetail() {
  const handleJoinClick = () => {
    alert("Du har blivit anmält för denna meetup!");
    /* Function to save to db here */
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="p-4">
        <Header />
        <main>
          <MeetupDetailCard />
          <div className="flex justify-center mt-5">
            <Button onClick={handleJoinClick} className="w-xs">
              ANMÄL
            </Button>
          </div>
        </main>
      </div>

      <Navbar />
    </div>
  );
}

export default MeetupDetail;
