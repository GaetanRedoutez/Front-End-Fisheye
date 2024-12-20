import { Link } from 'react-router-dom';
import './index.css';
import { normalizeName } from '../../../utils/normalizeString';

export const Photograph = (photograph) => {
	return (
		<>
			<Link to={`/photograph/${photograph.id}`} className="photograph-link">
				<div className="photograph-img-container">
					<img
						src={`/assets/photographers/${normalizeName(photograph.name)}.jpg`}
						alt={photograph.name}
						loading="lazy"
						className="photograph-img"
					/>
				</div>
				<h2 className="photograph-name">{photograph.name}</h2>
			</Link>
			<div className="photograph-location">
				{photograph.city}&nbsp;{photograph.country}
			</div>
			<div className="photograph-tagline">{photograph.tagline}</div>
			<div className="photograph-price"> {photograph.price} €/jour </div>
		</>
	);
};
