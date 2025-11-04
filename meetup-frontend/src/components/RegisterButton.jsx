import React, { useState } from "react";
import Button from "./Button";
import { registerForMeetup } from "../api/api";

function RegisterButton({ meetupId }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Du måste logga in först.");
      setLoading(false);
      return;
    }

    try {
      await registerForMeetup({ meetupId, token });
      setMessage("Du är nu anmäld!");
    } catch (error) {
      setError("Kunde inte anmäla. Du är redan anmäld eller försök igen.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={handleRegister} disabled={loading} className="w-xs">
        {loading ? "Anmäler…" : "ANMÄL"}
      </Button>
      {message && <p className="text-green-700 text-sm">{message}</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}

export default RegisterButton;
