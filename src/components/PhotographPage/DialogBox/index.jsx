import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import { ContactForm } from '../ContactForm';

/**
 * DialogBox component
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Determines if the dialog is open
 * @param {Function} props.onClose - Function to close the dialog
 * @param {Object} props.photograph - Photograph details
 * @returns {JSX.Element|null} The DialogBox component
 */
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
