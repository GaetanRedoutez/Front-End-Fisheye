export const getPhotographers = async () => {
	try {
		const response = await fetch('/data/photographers.json');

		if (!response.ok) {
			console.error(`Fetch failed ! Status : ${response.status}`);
		}

		const data = await response.json();
		return data.photographers;
	} catch (err) {
		console.error('Failed to fetch photographers:', err);
	}
};

export const getPhotographerById = async (id) => {
	try {
		const response = await fetch('/data/photographers.json');

		if (!response.ok) {
			console.error(`Fetch failed ! Status : ${response.status}`);
		}

		const data = await response.json();

		const photographer = data.photographers.find((photographer) => photographer.id === +id);

		if (!photographer) {
			console.error(`Photographer with ID ${id} not found`);
		}

		return photographer;
	} catch (err) {
		console.error('Failed to fetch photographer by ID:', err);
	}
};

export const getMediaByPhotographerId = async (photographerId) => {
	try {
		const response = await fetch('/data/photographers.json');

		if (!response.ok) {
			console.error(`Fetch failed ! Status : ${response.status}`);
		}

		const data = await response.json();

		// Filtrer les médias correspondant au photographe
		const media = data.media.filter((item) => item.photographerId === +photographerId);

		if (media.length === 0) {
			console.error(`No media found for photographer with ID ${photographerId}`);
		}

		return media;
	} catch (err) {
		console.error('Failed to fetch media by photographer ID:', err);
	}
};
