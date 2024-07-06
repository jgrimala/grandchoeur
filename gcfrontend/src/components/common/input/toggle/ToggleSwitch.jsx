/**
 * toggle.jsx
 * components\common\input\toggle\toggle.jsx
 */
import React, { useState } from "react";
import "./ToggleSwitch.scss";

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
			className={`toggle-switch ${isChecked ? "enabled" : ""}`}
			onClick={toggleSwitch}
		>
			<div
				className="toggle-knob"
				style={{ left: isChecked ? "30px" : "4px" }}
			/>
		</div>
	);
};

export default ToggleSwitch;
