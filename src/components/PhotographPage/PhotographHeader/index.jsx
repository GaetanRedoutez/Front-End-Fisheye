import { useState } from 'react';
import { normalizeName } from '../../../utils/normalizeString';
import './index.css';
import { DialogBox } from '../DialogBox';

/**
 * Component for displaying the header of a photograph page.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.photograph - The photograph data.
 * @param {string} props.photograph.name - The name of the photographer.
 * @param {string} props.photograph.city - The city of the photographer.
 * @param {string} props.photograph.country - The country of the photographer.
 * @param {string} props.photograph.tagline - The tagline of the photographer.
 * @returns {JSX.Element} The rendered component.
 */
export const PhotographHeader = ({ photograph }) => {
	const [isDialogOpen, setDialogOpen] = useState(false);

	const openDialog = () => setDialogOpen(true);
	const closeDialog = () => setDialogOpen(false);
	return (
		<>
			<div className="photograph-header">
				<div>
					<h1>{photograph.name}</h1>
					<div>
						<p className="photograph-header-location">
							{photograph.city}, {photograph.country}
						</p>
						<p className="photograph-header-tagline">{photograph.tagline}</p>
					</div>
				</div>
				<button className="photograph-header-button" onClick={openDialog} aria-label="Contact Me">
					Contactez-moi
				</button>
				<div className="photograph-img-container">
					<img
						src={`/assets/photographers/${normalizeName(photograph.name)}.webp`}
						alt={photograph.name}
						loading="lazy"
						className="photograph-img"
					/>
				</div>
			</div>
			<DialogBox isOpen={isDialogOpen} onClose={closeDialog} photograph={photograph} />
		</>
	);
};
