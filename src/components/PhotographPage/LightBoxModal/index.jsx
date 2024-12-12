import { useState } from 'react';
import './index.css';
import { MediaFactory } from '../PhotographGallery';
import { normalizeName } from '../../../utils/normalizeString';
import { faAngleLeft, faAngleRight, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const LightBoxModal = ({ isOpen, onClose, media, initialIndex, photographName }) => {
	console.log(media);
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	if (!isOpen) return null;

	const handleNext = (e) => {
		e.stopPropagation();
		setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
	};

	const handlePrev = (e) => {
		e.stopPropagation();
		setCurrentIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
	};

	const currentMedia = media[currentIndex];

	console.log(currentMedia);
	const mediaType = Object.keys(currentMedia).find(
		(k) => k.includes('image') || k.includes('video')
	);
	const mediaUrl = `/assets/images/${normalizeName(photographName)}/${
		currentMedia.image || currentMedia.video
	}`;
	return (
		<div className="lightbox-overlay" onClick={onClose}>
			<div className="lightbox-box" onClick={(e) => e.stopPropagation()}>
				<div className="lightbox-side">
					<FontAwesomeIcon icon={faAngleLeft} onClick={handlePrev} className="lightbox-nav-icon" />
				</div>
				<MediaFactory
					type={mediaType}
					url={mediaUrl}
					title={media.title}
					likes={media.likes}
					showDescription={false}
					className="lightbox-media"
				/>
				<div className="lightbox-side">
					<FontAwesomeIcon icon={faX} onClick={onClose} className="lightbox-nav-icon" />
					<FontAwesomeIcon icon={faAngleRight} onClick={handleNext} className="lightbox-nav-icon" />
				</div>
			</div>
		</div>
	);
};
