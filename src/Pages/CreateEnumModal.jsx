import React from "react";
import { useState } from "react";

export default function CreateEnumModal({
	createEnumButton,
	handleCloseClick,
	position,
	height,
	width,
	svgRef,
}) {
	const { x, y } = position;
	const modalStyle = {
		top: y,
		left: x - 195,
	};

	//todo update x y to be relative to the canvas

	const [enumName, setEnumName] = useState("");

	const handleCreateEnum = () => {
		const svg = svgRef.current.querySelector("svg");
		const point = svg.createSVGPoint();
		point.x = x;
		point.y = y;

		const updatedX = Math.round(
			point.matrixTransform(svg.getScreenCTM().inverse()).x
		);
		const updatedY = Math.round(
			point.matrixTransform(svg.getScreenCTM().inverse()).y
		);

		createEnumButton(enumName, updatedX, updatedY);
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
