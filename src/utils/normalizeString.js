/**
 * Normalizes a given string by removing all non-alphanumeric characters.
 *
 * @param {string} name - The string to be normalized.
 * @returns {string} - The normalized string containing only alphanumeric characters.
 */
export const normalizeName = (name) => {
	return name.replace(/[^a-zA-Z0-9]/g, '');
};
