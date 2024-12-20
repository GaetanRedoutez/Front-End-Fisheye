import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import { ContactForm } from '../ContactForm';

export const DialogBox = ({ isOpen, onClose, photograph }) => {
	if (!isOpen) return null;

	return (
		<div className="dialog-overlay">
			<div className="dialog-box">
				<div className="dialog-header">
					<div className="dialog-title">
						<h2>Contactez-moi</h2>
						<div className="dialog-close">
							<FontAwesomeIcon
								icon={faX}
								onClick={onClose}
								className="dialog-close-icon"
								aria-label="Close Contact form"
							/>
						</div>
					</div>
					<div>{photograph.name}</div>
				</div>
				<ContactForm />
			</div>
		</div>
	);
};
