import { useEffect, useLayoutEffect, useState } from 'react';
import './index.css';
import { MediaFactory } from '../PhotographGallery';
import { normalizeName } from '../../../utils/normalizeString';
import { faAngleLeft, faAngleRight, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * LightBoxModal component
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Determines if the lightbox is open
 * @param {Function} props.onClose - Function to close the lightbox
 * @param {Array} props.media - Array of media items to display
 * @param {number} props.initialIndex - Initial index of the media to display
 * @param {string} props.photographName - Name of the photograph
 * @returns {JSX.Element|null} The LightBoxModal component
 */
export const LightBoxModal = ({ isOpen, onClose, media = [], initialIndex, photographName }) => {
	const [currentIndex, setCurrentIndex] = useState();

	useLayoutEffect(() => {
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
					<div className="lightbox-close">
						<FontAwesomeIcon
							icon={faX}
							onClick={onClose}
							className="lightbox-nav-icon"
							aria-label="Close dialog"
						/>
					</div>
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
