import { useEffect, useState } from 'react';
import './index.css';
import {
	getMediaByPhotographerId,
	getPhotographerById,
} from '../../../api/service/photographers.service';
import { PhotographHeader } from '../PhotographHeader';
import { PhotographGallery } from '../PhotographGallery';
import { PhotographData } from '../PhotographData';

/**
 * @param {number} id - The ID of the photograph
 */
export const PhotographBody = ({ id }) => {
	const [photograph, setPhotograph] = useState();
	const [mediaItems, setMediaItems] = useState();
	const [totalLikes, setTotalLikes] = useState(0);

	useEffect(() => {
		const fetch = async () => {
			const data = await getPhotographerById(id);
			setPhotograph(data);
		};
		fetch();
	}, [id]);

	useEffect(() => {
		const fetch = async () => {
			const data = await getMediaByPhotographerId(photograph.id);
			setMediaItems(data);
		};

		!!photograph && fetch();
	}, [JSON.stringify(photograph)]);

	useEffect(() => {
		!!mediaItems && setTotalLikes(mediaItems.reduce((acc, item) => acc + item.likes, 0));
	}, [JSON.stringify(mediaItems)]);
	return (
		photograph && (
			<div className="photograph-container">
				<PhotographHeader {...{ photograph }} />
				<PhotographGallery {...{ photograph, mediaItems, setTotalLikes, totalLikes }} />
				{mediaItems && <PhotographData {...{ photograph, totalLikes }} />}
			</div>
		)
	);
};
