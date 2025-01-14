import { useState } from 'react';
import './index.css';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * SelectDropdown component for filtering photographs by different criteria.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.filter - The current filter option.
 * @param {Function} props.setFilter - Function to set the selected filter option.
 * @returns {JSX.Element} The rendered SelectDropdown component.
 */
export const SelectDropdown = ({ filter, setFilter }) => {
	const options = ['Popularité', 'Date', 'Titre'];
	const [isOpen, setIsOpen] = useState(false);

	const handleSelect = (option) => {
		setFilter(option);
		setIsOpen(false);
	};

	return (
		<div className="dropdown" aria-label="order-by">
			<button
				className="select-dropdown"
				role="listbox"
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				onClick={() => setIsOpen((state) => !state)}
			>
				<div className="select-dropdown-title">
					{filter} <FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} aria-label="dropdown" />
				</div>
			</button>
			{isOpen && (
				<ul className="dropdown-options" role="listbox">
					{options
						.filter((option) => option !== filter)
						.map((option, index) => {
							const className =
								index === 0 ? 'dropdown-option-title first-option' : 'dropdown-option-title';
							return (
								<li
									key={option}
									className="dropdown-option"
									role="option"
									onClick={() => handleSelect(option)}
								>
									<div className={className}>{option}</div>
								</li>
							);
						})}
				</ul>
			)}
		</div>
	);
};
