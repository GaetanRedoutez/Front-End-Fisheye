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
					<h2 className="dialog-title">
						<div>Contactez-moi</div>
						<div>{photograph.name}</div>
					</h2>
					<div className="dialog-close">
						<FontAwesomeIcon icon={faX} onClick={onClose} />
					</div>
				</div>
				<ContactForm />
			</div>
		</div>
	);
};
