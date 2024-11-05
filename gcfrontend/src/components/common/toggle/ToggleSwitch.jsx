/**
 * ToggleSwitch.jsx
 * components\common\input\toggle\ToggleSwitch.jsx
 */
import React, { useState } from "react";


const ToggleSwitch = ({ id, checked, onChange }) => {
	const [isChecked, setIsChecked] = useState(checked);

	const toggleSwitch = () => {
		setIsChecked(!isChecked); // Toggle the local state
		if (onChange) {
			onChange(!isChecked); // Pass the updated checked state to the parent
		}
	};

	return (
		<div
			onClick={toggleSwitch}
		>
			<div
			/>
		</div>
	);
};

export default ToggleSwitch;
