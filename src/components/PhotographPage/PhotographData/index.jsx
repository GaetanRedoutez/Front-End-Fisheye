import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

/**
 * PhotographData component
 *
 * @param {Object} props - Component props
 * @param {Object} props.photograph - The photograph object containing details
 * @param {number} props.totalLikes - The total number of likes for the photograph
 * @returns {JSX.Element} The PhotographData component
 */
export const PhotographData = ({ photograph, totalLikes }) => {
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
