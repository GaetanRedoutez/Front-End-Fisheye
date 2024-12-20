import { useLocation } from 'react-router-dom';
import './index.css';

export const Header = () => {
	const location = useLocation();

	return (
		<header className="Header">
			<h1>
				<a href="/">
					<img
						src="/assets/images/logo.png"
						alt="Fisheye Home Page"
						className="header-logo"
						aria-label="Fisheye Home Page"
					/>
				</a>
			</h1>
			{location.pathname === '/' && <div className="header-texte">Nos photographes</div>}
		</header>
	);
};
