import { useEffect, useState } from 'react';
import { Photographer } from '../Photographer';
import { getPhotographers } from '../../api/service/photographers.service';
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
			{photographers.map((photographer) => {
				return (
					<article className="photographer-article" key={photographer.id}>
						<Photographer {...photographer} />
					</article>
				);
			})}
		</section>
	);
};
