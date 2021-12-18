import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as Arrow } from "../../icons/chevron-down.svg";
import { ReactComponent as Check } from "../../icons/check.svg";

import "./index.css";

export const Dropdown = ({
	options = [],
	selectedOptions = new Map(),
	multiSelect = false,
	onChange = () => {},
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef();
	useEffect(() => {
		document.addEventListener("mousedown", handleClick);
		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, []);

	const handleClick = (e) => {
		if (!ref.current.contains(e.target)) {
			setIsOpen(false);
		}
	};

	const toggleIsOpen = () => {
		setIsOpen(!isOpen);
	};

	const handleSelect = (value, label) => {
		if (multiSelect) {
			if (selectedOptions.has(value)) {
				selectedOptions.delete(value);
			} else {
				selectedOptions.set(value, label);
			}
			onChange(new Map(selectedOptions));
		} else {
			onChange(new Map([[value, label]]));
			toggleIsOpen();
		}
	};

	const handleSelectAll = () => {
		if (selectedOptions.size === options.length) {
			onChange(new Map());
		} else {
			onChange(new Map(options.map((option) => [option.value, option.label])));
		}
	};

	const renderOptions = options.map((option, idx) => (
		<DropdownOption
			key={idx}
			value={option.value}
			label={option.label}
			selected={selectedOptions.has(option.value)}
			multiSelect={multiSelect}
			onClick={handleSelect}
		/>
	));

	const renderMultiDisplay = selectedOptions.size
		? Array.from(selectedOptions.values()).map((label, idx) => (
				<span key={idx} className="dropdown__display-label">
					{label}
				</span>
		  ))
		: "Select options";

	const renderSingleDisplay = selectedOptions.size
		? selectedOptions.values().next().value
		: "Select an option";

	return (
		<div className={`dropdown__container ${isOpen ? "open" : ""}`} ref={ref}>
			<div tabIndex="0" className="dropdown__display" onClick={toggleIsOpen}>
				<div className="dropdown__display-value">
					{multiSelect ? renderMultiDisplay : renderSingleDisplay}
				</div>
				<Arrow className="dropdown__display-arrow" />
			</div>
			<div className="dropdown__options-container">
				{multiSelect && options.length && (
					<DropdownOption
						label="Select All"
						selected={selectedOptions.size === options.length}
						multiSelect={multiSelect}
						onClick={handleSelectAll}
					/>
				)}
				{renderOptions}
			</div>
		</div>
	);
};

const DropdownOption = ({ value, label, selected, multiSelect, onClick }) => {
	return (
		<div
			tabIndex="0"
			className={`dropdown__option ${selected ? "selected" : ""}`}
			onClick={() => onClick(value, label)}
		>
			{multiSelect && (
				<i className="dropdown__option-check">
					<Check />
				</i>
			)}
			<span>{label}</span>
		</div>
	);
};
