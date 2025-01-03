import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useState } from 'react';
import { normalizeName } from '../../../utils/normalizeString';
import { SelectDropdown } from '../SelectDropdown';
import './index.css';
import { LightBoxModal } from '../LightBoxModal';

export const PhotographGallery = ({ photograph, mediaItems }) => {
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
									openLightBox={() => openLightBox(sortedMedia[index].originalIndex)}
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

export const MediaFactory = ({ type, url, item, showDescription, className, openLightBox }) => {
	switch (type) {
		case 'image':
			return (
				<ImageMedia
					url={url}
					item={item}
					showDescription={showDescription}
					className={className}
					openLightBox={openLightBox}
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
				/>
			);
		default:
			return <p>Type de média non supporté</p>;
	}
};

const ImageMedia = ({ url, item, showDescription, className, openLightBox }) => (
	<div>
		<img src={url} alt={item.title} className={className} onClick={openLightBox} />
		{showDescription ? <MediaDescription item={item} /> : <></>}
	</div>
);

const VideoMedia = ({ url, item, showDescription, className, openLightBox }) => (
	<div>
		<video controls className={className} loading="lazy" onClick={openLightBox}>
			<source src={url} type="video/mp4" />
			Votre navigateur ne supporte pas les vidéos.
		</video>
		{showDescription ? <MediaDescription item={item} /> : <></>}
	</div>
);

const MediaDescription = ({ item }) => {
	const [likes, setLikes] = useState(item.likes);

	const handleLike = () => setLikes(likes + 1);
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

const sortMedia = (media, criteria) => {
	if (!Array.isArray(media)) {
		return [];
	}

	switch (criteria) {
		case 'Popularité':
			return media.sort((a, b) => b.likes - a.likes);
		case 'Date':
			return media.sort((a, b) => new Date(b.date) - new Date(a.date));
		case 'Prix':
			return media.sort((a, b) => b.price - a.price);
		default:
			return media;
	}
};
