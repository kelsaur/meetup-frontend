const API_URL = "https://meetup-backend-latest-pdua.onrender.com";

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

// getUser - vid inloggning/profil-vy

// getUserMeetups - se alla inloggade användarens meetups. Hur delar vi upp de till anmälda / tidigare meetups ?
