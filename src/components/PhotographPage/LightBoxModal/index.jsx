import { useEffect, useState } from 'react';
import './index.css';
import { MediaFactory } from '../PhotographGallery';
import { normalizeName } from '../../../utils/normalizeString';
import { faAngleLeft, faAngleRight, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const LightBoxModal = ({
	isOpen,
	onClose,
	media = [],
	initialIndex = 0,
	photographName,
}) => {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	useEffect(() => {
		if (Array.isArray(media) && media.length > 0) {
			setCurrentIndex(Math.min(initialIndex, media.length - 1));
		}
	}, [initialIndex, media]);

	const handleNext = (e) => {
		e.stopPropagation();
		if (media.length > 0) {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
		}
	};

	const handlePrev = (e) => {
		e.stopPropagation();
		if (media.length > 0) {
			setCurrentIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
		}
	};

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'ArrowRight') {
				handleNext(e);
			} else if (e.key === 'ArrowLeft') {
				handlePrev(e);
			} else if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [media]);

	if (!isOpen || !Array.isArray(media) || media.length === 0) return null;

	const currentMedia = media[currentIndex];
	const mediaType = Object.keys(currentMedia).find(
		(k) => k.includes('image') || k.includes('video')
	);
	const mediaUrl = `/assets/images/${normalizeName(photographName)}/${
		currentMedia.image || currentMedia.video
	}`;

	return (
		<div className="lightbox-overlay" onClick={onClose} aria-label="image closeup view">
			<div className="lightbox-box" onClick={(e) => e.stopPropagation()}>
				<div className="lightbox-side">
					<FontAwesomeIcon
						icon={faAngleLeft}
						onClick={handlePrev}
						className="lightbox-nav-icon prev"
						aria-label="Previous image"
					/>
				</div>
				<MediaFactory
					type={mediaType}
					url={mediaUrl}
					item={currentMedia}
					showDescription={false}
					className="lightbox-media"
				/>
				<div className="lightbox-side">
					<FontAwesomeIcon
						icon={faX}
						onClick={onClose}
						className="lightbox-nav-icon"
						aria-label="Close dialog"
					/>
					<FontAwesomeIcon
						icon={faAngleRight}
						onClick={handleNext}
						className="lightbox-nav-icon"
						aria-label="Next image"
					/>
				</div>
			</div>
		</div>
	);
};
