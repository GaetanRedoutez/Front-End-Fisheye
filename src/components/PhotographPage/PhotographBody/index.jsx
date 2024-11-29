import { useEffect, useState } from 'react';
import './index.css';
import { getPhotographerById } from '../../../api/service/photographers.service';
import { PhotographHeader } from '../PhotographHeader';
import { PhotographGallery } from '../PhotographGallery';

/**
 * @param {number} id - The ID of the photograph
 */
export const PhotographBody = ({ id }) => {
	const [photograph, setPhotograph] = useState();
	useEffect(() => {
		const fetch = async () => {
			const data = await getPhotographerById(id);
			console.log('data', data);
			setPhotograph(data);
		};
		fetch();
	}, [id]);
	return (
		photograph && (
			<div className="photograph-container">
				<PhotographHeader {...{ photograph }} />
				<PhotographGallery {...{ photograph }} />
			</div>
		)
	);
};
