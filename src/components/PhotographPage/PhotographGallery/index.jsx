import { useEffect, useMemo, useState } from 'react';
import './index.css';
import { SelectDropdown } from '../SelectDropdown';
import { getMediaByPhotographerId } from '../../../api/service/photographers.service';
import { normalizeName } from '../../../utils/normalizeString';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export const PhotographGallery = ({ photograph }) => {
	const [filter, setFilter] = useState('Popularité');
	const [mediaItems, setMediaItems] = useState();
	useEffect(() => {
		const fetch = async () => {
			const data = await getMediaByPhotographerId(photograph.id);
			setMediaItems(data);
		};
		fetch();
	}, [photograph.id]);

	const sortedMedia = useMemo(() => sortMedia(mediaItems, filter), [filter, mediaItems]);

	return (
		<div className="photograph-gallery">
			<div className="photograph-gallery-filters">
				<p>Trier par : </p>
				<SelectDropdown {...{ filter, setFilter }} />
			</div>
			{mediaItems && (
				<section className="gallery-section">
					{sortedMedia.map((item) => {
						console.log(item.date, item.price, item.likes);
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
									title={item.title}
									likes={item.likes}
								/>
							</article>
						);
					})}
				</section>
			)}
		</div>
	);
};

const MediaFactory = ({ type, url, title, likes }) => {
	switch (type) {
		case 'image':
			return <ImageMedia url={url} title={title} likes={likes} />;
		case 'video':
			return <VideoMedia url={url} title={title} likes={likes} />;
		default:
			return <p>Type de média non supporté</p>;
	}
};

const ImageMedia = ({ url, title, likes }) => (
	<div>
		<img src={url} alt={title} className="gallery-media" loading="lazy" />
		<MediaDescription title={title} likes={likes} />
	</div>
);

const VideoMedia = ({ url, title, likes }) => (
	<div>
		<video controls className="gallery-media" loading="lazy">
			<source src={url} type="video/mp4" />
			Votre navigateur ne supporte pas les vidéos.
		</video>
		<MediaDescription title={title} likes={likes} />
	</div>
);

const MediaDescription = ({ title, likes }) => {
	return (
		<div className="media-description">
			<div className="media-description-title">{title}</div>
			<div className="media-description-likes">
				<div>{likes}</div>
				<FontAwesomeIcon icon={faHeart} aria-label="likes" />
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
