import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export const PhotographData = ({ photograph, mediaItems }) => {
	const totalLikes = mediaItems.reduce((acc, item) => acc + item.likes, 0);
	return (
		<div className="photograph-data">
			<div className="photograph-data-content">
				<div>
					{totalLikes} <FontAwesomeIcon icon={faHeart} aria-label="likes" />
				</div>
				<div>{photograph.price} €/jour</div>
			</div>
		</div>
	);
};
