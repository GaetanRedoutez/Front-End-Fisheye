import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useState } from 'react';
import { normalizeName } from '../../../utils/normalizeString';
import { LightBoxModal } from '../LightBoxModal';
import { SelectDropdown } from '../SelectDropdown';
import './index.css';
import { handleClickEnter } from '../../../utils/handleEvent';

/**
 * Component for displaying a gallery of photographs.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.photograph - The photograph object.
 * @param {Array} props.mediaItems - The list of media items.
 * @param {Function} props.setTotalLikes - Function to set the total likes.
 * @param {number} props.totalLikes - The total number of likes.
 * @returns {JSX.Element} The PhotographGallery component.
 */
export const PhotographGallery = ({ photograph, mediaItems, setTotalLikes, totalLikes }) => {
	const [filter, setFilter] = useState('Popularité');
	const [lightBoxOpen, setLightBoxOpen] = useState(false);
	const [lightBoxIndex, setLightBoxIndex] = useState(0);

	const openLightBox = (index) => {
		setLightBoxIndex(index);
		setLightBoxOpen(true);
	};

	const closeLightBox = () => setLightBoxOpen(false);

	const sortedMedia = useMemo(() => {
		return sortMedia(mediaItems, filter).map((item) => ({
			...item,
			originalIndex: mediaItems.findIndex((media) => media.id === item.id),
		}));
	}, [filter, mediaItems]);

	return (
		<div className="photograph-gallery">
			<div className="photograph-gallery-filters">
				<p>Trier par : </p>
				<SelectDropdown {...{ filter, setFilter }} />
			</div>
			{mediaItems && (
				<section className="gallery-section">
					{sortedMedia.map((item, index) => {
						const mediaType = Object.keys(item).find(
							(k) => k.includes('image') || k.includes('video')
						);
						const mediaUrl = `/assets/images/${normalizeName(photograph.name)}/${
							item.image || item.video
						}`;

						return (
							<article key={item.id} className="gallery-article">
								<MediaFactory
									type={mediaType}
									url={mediaUrl}
									item={item}
									showDescription={true}
									setTotalLikes={setTotalLikes}
									totalLikes={totalLikes}
									openLightBox={() => openLightBox(index)}
									className="gallery-media"
								/>
							</article>
						);
					})}
				</section>
			)}
			<LightBoxModal
				isOpen={lightBoxOpen}
				onClose={closeLightBox}
				media={mediaItems}
				initialIndex={lightBoxIndex}
				photographName={photograph.name}
			/>
		</div>
	);
};

/**
 * Factory component for rendering media based on type.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.type - The type of media (image or video).
 * @param {string} props.url - The URL of the media.
 * @param {Object} props.item - The media item object.
 * @param {boolean} props.showDescription - Flag to show description.
 * @param {string} props.className - The CSS class name.
 * @param {Function} props.openLightBox - Function to open the lightbox.
 * @param {Function} props.setTotalLikes - Function to set the total likes.
 * @param {number} props.totalLikes - The total number of likes.
 * @returns {JSX.Element} The MediaFactory component.
 */
export const MediaFactory = ({
	type,
	url,
	item,
	showDescription,
	className,
	openLightBox,
	setTotalLikes,
	totalLikes,
}) => {
	switch (type) {
		case 'image':
			return (
				<ImageMedia
					url={url}
					item={item}
					showDescription={showDescription}
					className={className}
					openLightBox={openLightBox}
					setTotalLikes={setTotalLikes}
					totalLikes={totalLikes}
				/>
			);
		case 'video':
			return (
				<VideoMedia
					url={url}
					item={item}
					showDescription={showDescription}
					className={className}
					openLightBox={openLightBox}
					setTotalLikes={setTotalLikes}
					totalLikes={totalLikes}
				/>
			);
		default:
			return <p>Type de média non supporté</p>;
	}
};

/**
 * Component for rendering an image media item.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.url - The URL of the image.
 * @param {Object} props.item - The media item object.
 * @param {boolean} props.showDescription - Flag to show description.
 * @param {string} props.className - The CSS class name.
 * @param {Function} props.openLightBox - Function to open the lightbox.
 * @param {Function} props.setTotalLikes - Function to set the total likes.
 * @param {number} props.totalLikes - The total number of likes.
 * @returns {JSX.Element} The ImageMedia component.
 */
const ImageMedia = ({
	url,
	item,
	showDescription,
	className,
	openLightBox,
	setTotalLikes,
	totalLikes,
}) => {
	return (
		<div>
			<img
				src={url}
				alt={item.title}
				className={className}
				onClick={(e) => handleClickEnter(e, openLightBox)}
				onKeyDown={(e) => handleClickEnter(e, openLightBox)}
				tabIndex={0}
			/>
			{showDescription ? (
				<MediaDescription item={item} setTotalLikes={setTotalLikes} totalLikes={totalLikes} />
			) : (
				<></>
			)}
		</div>
	);
};

/**
 * Component for rendering a video media item.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.url - The URL of the video.
 * @param {Object} props.item - The media item object.
 * @param {boolean} props.showDescription - Flag to show description.
 * @param {string} props.className - The CSS class name.
 * @param {Function} props.openLightBox - Function to open the lightbox.
 * @param {Function} props.setTotalLikes - Function to set the total likes.
 * @param {number} props.totalLikes - The total number of likes.
 * @returns {JSX.Element} The VideoMedia component.
 */
const VideoMedia = ({
	url,
	item,
	showDescription,
	className,
	openLightBox,
	setTotalLikes,
	totalLikes,
}) => {
	return (
		<div>
			<video
				controls={!showDescription}
				tabIndex={0}
				className={className}
				loading="lazy"
				onClick={(e) => handleClickEnter(e, openLightBox)}
				onKeyDown={(e) => handleClickEnter(e, openLightBox)}
			>
				<source src={url} type="video/mp4" />
				Votre navigateur ne supporte pas les vidéos.
			</video>
			{showDescription ? (
				<MediaDescription item={item} setTotalLikes={setTotalLikes} totalLikes={totalLikes} />
			) : (
				<></>
			)}
		</div>
	);
};

/**
 * Component for rendering the description of a media item.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.item - The media item object.
 * @param {Function} props.setTotalLikes - Function to set the total likes.
 * @param {number} props.totalLikes - The total number of likes.
 * @returns {JSX.Element} The MediaDescription component.
 */
const MediaDescription = ({ item, setTotalLikes, totalLikes }) => {
	const [likes, setLikes] = useState(item.likes);

	const handleLike = () => {
		setLikes(likes + 1);
		setTotalLikes(totalLikes + 1);
	};
	return (
		<div className="media-description">
			<div className="media-description-title">{item.title}</div>
			<div className="media-description-likes">
				<div>{likes}</div>
				<FontAwesomeIcon icon={faHeart} aria-label="likes" onClick={handleLike} />
			</div>
		</div>
	);
};

/**
 * Function to sort media items based on criteria.
 *
 * @param {Array} media - The list of media items.
 * @param {string} criteria - The sorting criteria (Popularité, Date, Titre).
 * @returns {Array} The sorted list of media items.
 */
const sortMedia = (media, criteria) => {
	if (!Array.isArray(media)) {
		return [];
	}

	switch (criteria) {
		case 'Popularité':
			return media.sort((a, b) => b.likes - a.likes);
		case 'Date':
			return media.sort((a, b) => new Date(b.date) - new Date(a.date));
		case 'Titre':
			return media.sort((a, b) => a.title.localeCompare(b.title));
		default:
			return media;
	}
};
