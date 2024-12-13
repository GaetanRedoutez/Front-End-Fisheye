import './index.css';

export const ContactForm = () => {
	const submit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const formObject = Object.fromEntries(formData.entries());

		console.log('Champs soumis :', formObject);
	};
	return (
		<>
			<form action="" onSubmit={submit} className="contact-form">
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
					<input type="text" name="message" className="form-messsage" />
				</div>
				<button type="submit" className="button-form-submit">
					Envoyer
				</button>
			</form>
		</>
	);
};
