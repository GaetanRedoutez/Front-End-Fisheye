export const handleClickEnter = (event, callback) => {
	if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
		callback();
	}
};
