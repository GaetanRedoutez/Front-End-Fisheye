import { useState } from 'react';
import './index.css';

export const SelectDropdown = ({ filter, setFilter }) => {
	const options = ['Popularité', 'Date', 'Prix'];
	const [isOpen, setIsOpen] = useState(false);

	const handleSelect = (option) => {
		setFilter(option);
		setIsOpen(false);
	};

	return (
		<div className="dropdown">
			<button
				className="select-dropdown"
				role="listbox"
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				onClick={() => setIsOpen((state) => !state)}
			>
				{filter} ▼
			</button>
			{isOpen && (
				<ul className="dropdown-options" role="listbox">
					{options
						.filter((option) => option !== filter)
						.map((option) => (
							<li
								key={option}
								className="dropdown-option"
								role="option"
								onClick={() => handleSelect(option)}
							>
								{option}
							</li>
						))}
				</ul>
			)}
		</div>
	);
};
