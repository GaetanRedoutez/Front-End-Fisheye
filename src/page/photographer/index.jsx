import { useParams } from 'react-router-dom';
import { PhotographBody } from '../../components/PhotographPage/PhotographBody';
import './index.css';

export const PhotographPage = () => {
	const { id } = useParams();

	return <PhotographBody {...{ id }} />;
};
