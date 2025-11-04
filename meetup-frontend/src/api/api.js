const API_URL = "https://meetup-backend-latest-pdua.onrender.com";

// Hjälpfunktion för att hantera svar från fetch
async function handleApiResponse(response) {
  let data;

  try {
    data = await response.json();
  } catch (jsonError) {
    // Om det misslyckas, läs det som ren text
    const textResponse = await response.text();
    console.warn("Backend did not return valid JSON. Response:", textResponse);

    if (!response.ok) {
      throw new Error(textResponse || `HTTP error! Status: ${response.status}`);
    }
    // Om status är OK men ingen JSON, returnera en default message
    return {
      message: textResponse || "Successful operation (non-JSON response)",
    };
  }

  if (!response.ok) {
    throw new Error(
      data.message || data.error || `HTTP error! Status: ${response.status}`
    );
  }

  return data;
}

// getMeetups - hämta alla meetups
export const getMeetups = async () => {
  console.log("Sending req to api to fetch meetups");
  try {
    const response = await fetch(`${API_URL}/api/meetups`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    return await handleApiResponse(response);
  } catch (error) {
    console.error("getMeetups failed:", error);
    throw error;
  }
};

export const getMeetupById = async () => {
  const res = await fetch(`${API_URL}/api/meetups/${meetup.id}`);
  const meetup = await res.json();

  console.log(meetup);
};

// createUser - skapa konto
export const createUser = async (userData) => {
  console.log("Frontend: Sending user data for registration:", userData);
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await handleApiResponse(response);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
    }

    return data;
  } catch (error) {
    console.error("Frontend: Error during user registration:", error.message);
    throw error;
  }
};

// Logga in användare
export const loginUser = async (credentials) => {
  console.log("Frontend: Sending login credentials:", credentials);
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await handleApiResponse(response);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
    }

    return data;
  } catch (error) {
    console.error("Frontend: Error during login:", error.message);
    throw error;
  }
};

// createBooking - vid anmälan

// deleteBooking - vid avregistrering

// getUser - vid inloggning/profil-vy

// getUserMeetups - se alla inloggade användarens meetups. Hur delar vi upp de till anmälda / tidigare meetups ?
