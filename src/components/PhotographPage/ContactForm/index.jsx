/**
 * ContactForm component handles form submission and logs form data.
 * @component
 */
import './index.css';

export const ContactForm = () => {
	const submit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const formObject = Object.fromEntries(formData.entries());

		console.log('FormData :', formObject);

		e.target.reset();
	};
	return (
		<>
			<form action="" onSubmit={submit} className="contact-form">
				<div className="form-input">
					<label htmlFor="firstName">Prénom</label>
					<input type="text" name="firstName" required />
				</div>
				<div className="form-input">
					<label htmlFor="lastName">Nom</label>
					<input type="text" name="lastName" required />
				</div>
				<div className="form-input">
					<label htmlFor="email">Email</label>
					<input type="email" name="email" required />
				</div>
				<div className="form-input">
					<label htmlFor="message">Message</label>
					<textarea className="form-messsage" name="message" cols="85" rows="10" required />
				</div>
				<button type="submit" className="button-form-submit" aria-label="Send">
					Envoyer
				</button>
			</form>
		</>
	);
};
