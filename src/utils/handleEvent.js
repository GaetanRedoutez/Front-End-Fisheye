/**
 * Handles click and Enter key events.
 *
 * @param {Event} event - The event object.
 * @param {Function} callback - The callback function to execute when the event is a click or Enter key press.
 */
export const handleClickEnter = (event, callback) => {
	if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
		callback();
	}
};
