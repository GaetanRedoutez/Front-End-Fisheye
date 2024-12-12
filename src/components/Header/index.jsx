import { useLocation } from 'react-router-dom';
import './index.css';

export const Header = () => {
	const location = useLocation();

	return (
		<div className="Header">
			<a href="/">
				<img src="/assets/images/logo.png" alt="Logo Fisheye" className="header-logo" />
			</a>
			{location.pathname === '/' && <div className="header-texte">Nos photographes</div>}
		</div>
	);
};
