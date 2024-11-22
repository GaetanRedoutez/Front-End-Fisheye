import { Link } from 'react-router-dom';
import './index.css';

export const Photographer = (photographer) => {
	return (
		<>
			<Link to={`/photographer/${photographer.id}`}>
				<img
					src="../../assets/photographers/account.png"
					alt={photographer.name}
					loading="lazy"
					className="photographer-img"
				/>
			</Link>
			<div className="photographer-name">{photographer.name}</div>
			<div className="photographer-location">
				{photographer.city}&nbsp;{photographer.country}
			</div>
			<div className="photographer-tagline">{photographer.tagline}</div>
			<div className="photographer-price"> {photographer.price} €/jour </div>
		</>
	);
};
