import React, { useState } from "react";
import Button from "./Button";
import { unregisterFromMeetup } from "../api/api";

function UnregisterButton({ meetupId, onUnregistered }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUnregister = async () => {
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
      await unregisterFromMeetup({ meetupId, token });
      setMessage("Du är nu avregistrerad från meetup!");
      onUnregistered?.();
    } catch (error) {
      setError("Kunde inte avregistrera. Du är inte anmäld för denna meetup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={handleUnregister}
        disabled={loading}
        className="w-xs bg-[#fe7362]"
      >
        {loading ? "Avregistrerar…" : "AVREGISTRERA"}
      </Button>
      {message && <p className="text-green-700 text-sm">{message}</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}

export default UnregisterButton;
