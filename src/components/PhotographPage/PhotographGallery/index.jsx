import { useState } from 'react';
import './index.css';
import { SelectDropdown } from '../SelectDropdown';

export const PhotographGallery = ({ photograph }) => {
	const [filter, setFilter] = useState('Popularité');
	return (
		<div className="photograph-gallery">
			<div className="photograph-gallery-filters">
				<p>Trier par : </p>
				<SelectDropdown {...{ filter, setFilter }} />
			</div>
			<section>
				section photo
				<article>les photos mappées</article>
			</section>
		</div>
	);
};
