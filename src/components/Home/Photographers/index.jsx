/**
 * Component to display a list of photographers.
 * Fetches data from API and renders each photographer.
 *
 * @component
 */
import { useEffect, useState } from 'react';
import { Photograph } from '../Photograph';
import { getPhotographers } from '../../../api/service/photographers.service';
import './index.css';

export const Photographers = () => {
	const [photographers, setPhotographers] = useState([]);

	useEffect(() => {
		const fetch = async () => {
			const data = await getPhotographers();
			setPhotographers(data);
		};
		fetch();
	}, []);
	return (
		<section className="photographers-section">
			{photographers.map((photograph) => {
				return (
					<article className="photograph-article" key={photograph.id}>
						<Photograph {...photograph} />
					</article>
				);
			})}
		</section>
	);
};
