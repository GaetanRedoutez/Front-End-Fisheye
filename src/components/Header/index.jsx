import './index.css';

export const Header = () => {
	const currentPath = window.location.pathname;

	return (
		<div className="Header">
			<a href="/home">
				<img src="/assets/images/logo.png" alt="Logo Fisheye" className="header-logo" />
			</a>
			{currentPath === '/home' && <div className="header-texte">Nos photographes</div>}
		</div>
	);
};
