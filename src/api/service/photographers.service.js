export const getPhotographers = async () => {
	try {
		const response = await fetch('/data/photographers.json');

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data.photographers;
	} catch (err) {
		console.error('Error fetching photographers:', err);
		throw err;
	}
};
