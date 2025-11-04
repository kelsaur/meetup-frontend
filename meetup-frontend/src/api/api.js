const API_URL = "https://meetup-backend-latest-pdua.onrender.com";

// Hjälpfunktion för att hantera svar från fetch
async function handleApiResponse(response) {
    let data;

    try {
        data = await response.json();
    } catch (jsonError) {
        // Om det misslyckas, läs det som ren text
        const textResponse = await response.text();
        console.warn('Backend did not return valid JSON. Response:', textResponse);

        if (!response.ok) {
            throw new Error(textResponse || `HTTP error! Status: ${response.status}`);
        }
        // Om status är OK men ingen JSON, returnera en default message
        return { message: textResponse || 'Successful operation (non-JSON response)' };
    }

    if (!response.ok) {
        throw new Error(data.message || data.error || `HTTP error! Status: ${response.status}`);
    }

    return data;
}

// getMeetups - hitta alla meetups
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

// Logga in användare
export const loginUser = async (credentials) => {
    console.log('Frontend: Sending login credentials:', credentials);
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        
        const data = await handleApiResponse(response);
        
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user.id);
        }
        
        return data;
    } catch (error) {
        console.error('Frontend: Error during login:', error.message);
        throw error;
    }
};

// createBooking - vid anmälan

// deleteBooking - vid avregistrering

// Get user
export const getUser = async (userId) => {
    console.log('Frontend: Fetching user info for:', userId);
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        
        return await handleApiResponse(response);
    } catch (error) {
        console.error('Frontend: Error fetching user:', error.message);
        throw error;
    }
};

// Get user meetups
export const getUserMeetups = async (userId) => {
    console.log('Frontend: Fetching meetups for user:', userId);
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/users/${userId}/meetups`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        
        return await handleApiResponse(response);
    } catch (error) {
        console.error('Frontend: Error fetching user meetups:', error.message);
        throw error;
    }
};
