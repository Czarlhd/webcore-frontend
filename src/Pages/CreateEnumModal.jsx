import React from "react";
import { useState } from "react";

export default function CreateEnumModal({
	createEnumButton,
	handleCloseClick,
	position,
}) {
	const { x, y } = position;
	const modalStyle = {
		top: y,
		left: x - 195,
	};

	const [enumName, setEnumName] = useState("");

	const handleCreateEnum = () => {
		createEnumButton(enumName, x - 192, y - 141);
		handleCloseClick();
	};

	return (
		<div
			style={{
				border: "1px solid black",
				width: "175px",
				borderRadius: "5px",
				boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
				position: "absolute",
				backgroundColor: "white",
				padding: "0.5rem",
				...modalStyle,
			}}
		>
			<span className="close" onClick={handleCloseClick}>
				&times;
			</span>
			<input
				id="newEnumName"
				type="text"
				placeholder="Enumeration Name"
				value={enumName}
				onChange={(e) => setEnumName(e.target.value)}
			/>
			<div>
				<button id="createEnumButton" onClick={handleCreateEnum}>
					Create Enumeration
				</button>
			</div>
		</div>
	);
}
