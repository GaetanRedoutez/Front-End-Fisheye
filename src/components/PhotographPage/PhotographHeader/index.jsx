import { useState } from 'react';
import { normalizeName } from '../../../utils/normalizeString';
import './index.css';
import { DialogBox } from '../DialogBox';
//TODO MODAL CONTACT

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
				<button className="photograph-header-button" onClick={openDialog}>
					Contactez-moi
				</button>
				<div className="photograph-img-container">
					<img
						src={`/assets/photographers/${normalizeName(photograph.name)}.jpg`}
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
