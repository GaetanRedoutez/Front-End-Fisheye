import './index.css';

export const ContactForm = () => {
	return (
		<>
			<form action="" onSubmit={(e) => e.preventDefault()} className="contact-form">
				<div className="form-input">
					<label htmlFor="firstName">Prénom</label>
					<input type="text" name="firstName" />
				</div>
				<div className="form-input">
					<label htmlFor="lastName">Nom</label>
					<input type="text" name="lastName" />
				</div>
				<div className="form-input">
					<label htmlFor="email">Email</label>
					<input type="email" name="email" />
				</div>
				<div className="form-input">
					<label htmlFor="message">Message</label>
					<input type="text" name="message" />
				</div>
				<button type="submit" className="button-form-submit">
					Envoyer
				</button>
			</form>
		</>
	);
};
