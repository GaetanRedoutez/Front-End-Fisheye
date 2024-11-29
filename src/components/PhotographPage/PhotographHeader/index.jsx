import { normalizeName } from '../../../utils/normalizeString';
import './index.css';
//TODO MODAL CONTACT

export const PhotographHeader = ({ photograph }) => {
	console.log(photograph);
	return (
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
			<button className="photograph-header-button">Contactez-moi</button>
			<img
				src={`/assets/photographers/${normalizeName(photograph.name)}.jpg`}
				alt="Image de profil du photographe"
				loading="lazy"
				className="photograph-img"
			/>
		</div>
	);
};
