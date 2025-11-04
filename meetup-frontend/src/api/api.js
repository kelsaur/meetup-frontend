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

    return await handleApiResponse(response);
  } catch (error) {
    console.error("getMeetups failed:", error);
    throw error;
  }
};

export const getMeetupById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/meetups/${id}`, {
      headers: { Accept: "application/json" },
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error("getMeetupById failed:", error);
    throw error;
  }
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

// registerForMeetup - vid anmälan
export const registerForMeetup = async ({ meetupId, token }) => {
  console.log("Frontend sending register to api");

  if (!token) {
    throw new Error("Token missing");
  }
  try {
    const response = await fetch(
      `${API_URL}/api/meetups/${meetupId}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    const data = await handleApiResponse(response);
    console.log(data, "Register successful");
    return data;
  } catch (error) {
    console.error("getMeetupById failed:", error);
    throw error;
  }
};

// deleteBooking - vid avregistrering

// Get user
export const getUser = async (userId) => {
  console.log("Frontend: Fetching user info for:", userId);
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error("Frontend: Error fetching user:", error.message);
    throw error;
  }
};

// Get user meetups
export const getUserMeetups = async (userId) => {
  console.log("Frontend: Fetching meetups for user:", userId);
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/users/${userId}/meetups`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error("Frontend: Error fetching user meetups:", error.message);
    throw error;
  }
};
