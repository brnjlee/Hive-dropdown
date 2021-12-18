import "./App.css";
import React, { useState } from "react";

import { Dropdown } from "./components/Dropdown";

const options = Array.from(Array(10)).map((val, idx) => ({
	value: `op${idx}`,
	label: `Option ${idx}`,
}));

const multiOptions = [
	{ value: "op1", label: "Option 1" },
	{ value: "op2", label: "Option 2" },
];

const singleOption = [{ value: "op2", label: "Option 2" }];

const formatSelectedOptions = (options) =>
	options.map((option) => [option.value, option.label]);

const App = () => {
	//Multiselect example
	const [selectedOptions, setSelectedOptions] = useState(
		new Map(formatSelectedOptions(multiOptions))
	);
	//Single select example
	const [selectedOption, setSelectedOption] = useState(
		new Map(formatSelectedOptions(singleOption))
	);
	return (
		<div className="App">
			<div className="demo-container">
				<h1>Hive take-home prompt</h1>
				<h3>Multiselect dropdown</h3>
				<Dropdown
					multiSelect={true}
					options={options}
					selectedOptions={selectedOptions}
					onChange={setSelectedOptions}
				/>
				<h3>Single select dropdown</h3>
				<Dropdown
					options={options}
					selectedOptions={selectedOption}
					onChange={setSelectedOption}
				/>
			</div>
		</div>
	);
};

export default App;
