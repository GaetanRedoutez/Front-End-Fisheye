export const getPhotographers = async () => {
	try {
		const response = await fetch('/data/photographers.json');

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data.photographers;
	} catch (err) {
		console.error('Failed to fetch photographers:', err);
		throw new Error('Failed to fetch photographers');
	}
};

export const getPhotographerById = async (id) => {
	try {
		const response = await fetch('/data/photographers.json');

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		console.log('id', id);
		console.log('number', +id);
		const photographer = data.photographers.find((photographer) => photographer.id === +id);
		console.log('data', photographer);

		if (!photographer) {
			throw new Error(`Photographer with ID ${id} not found`);
		}

		return photographer;
	} catch (err) {
		console.error('Failed to fetch photographer by ID:', err);
		throw new Error('Failed to fetch photographer by ID');
	}
};
