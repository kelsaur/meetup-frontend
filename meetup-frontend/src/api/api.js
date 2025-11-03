const API_URL = "https://meetup-backend-latest-pdua.onrender.com";

// Hjälpfunktion för att hantera svar från fetch
async function handleApiResponse(response) {
    let data;
    // Försök först att läsa svaret som JSON
    try {
        data = await response.json();
    } catch (jsonError) {
        // Om det misslyckas, läs det som ren text
        const textResponse = await response.text();
        console.warn('Backend did not return valid JSON. Response:', textResponse);
        // Om status inte är OK, kasta ett fel med textsvaret
        if (!response.ok) {
            throw new Error(textResponse || `HTTP error! Status: ${response.status}`);
        }
        // Om status är OK men ingen JSON, returnera en default message
        return { message: textResponse || 'Successful operation (non-JSON response)' };
    }

    // Om svaret inte är OK (d.v.s. status 4xx eller 5xx), kasta ett fel
    if (!response.ok) {
        // Backend skickar { message: "..." } eller { error: "..." }
        throw new Error(data.message || data.error || `HTTP error! Status: ${response.status}`);
    }

    return data; // Returnera JSON-datan
}

export const getMeetups = async () => {
	const res = await fetch(`${API_URL}/api/meetups/getMeetups`);
	const meetups = await res.json();

	console.log(meetups);
};

export const getMeetupById = async () => {
	const res = await fetch(`${API_URL}/api/meetups/${meetup.id}`);
	const meetup = await res.json();

	console.log(meetup);
};

// createBooking - vid anmälan

// deleteBooking - vid avregistrering

// createUser - skapa konto
export const createUser = async (userData) => {
    console.log('Frontend: Sending user data for registration:', userData);
    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        
        const data = await handleApiResponse(response);
        
        // Spara token och user info om registreringen lyckas
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user.id);
        }
        
        return data;
    } catch (error) {
        console.error('Frontend: Error during user registration:', error.message);
        throw error;
    }
};

// getUser - vid inloggning/profil-vy

// getUserMeetups - se alla inloggade användarens meetups. Hur delar vi upp de till anmälda / tidigare meetups ?
