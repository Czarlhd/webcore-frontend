import React from "react";

export default function AttributeModal({
	types,
	addAttributeButton,
	position,
	setAttributeName,
	attributeName,
	buttonName,
	selectedAttribute,
	handleCloseClick,
	height,
	width,
}) {
	const { x, y } = position;

	let updatedX = x;
	let updatedY = y;

	if (buttonName === "Add") {
		updatedX = x + 200 > width ? x - 345 : x + 200;
		updatedY = y;
	}

	if (buttonName === "Update") {
		updatedX = x - 60;
		updatedY = y + 100 > height ? y - 150 : y + 10;
	}

	const modalStyle = {
		top: updatedY,
		left: updatedX,
	};

	// top: y > height - 200 ? y - 150 : y,
	// 	left: x + 400 > width ? x - 150 : x + 100,

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
			<div
				style={{
					backgroundColor: buttonName === "Update" ? "red" : "none",
				}}
			>
				{buttonName} Attribute:{" "}
				<span style={{ fontWeight: "bold" }}>
					{selectedAttribute.split(" ")[1]}
				</span>
			</div>
			<input
				id="newAttributeName"
				type="text"
				placeholder="Attribute Name"
				value={attributeName}
				onChange={(e) => setAttributeName(e.target.value)}
			/>
			{buttonName === "Add" && (
				<div>
					<div>Select Type</div>
					<select id="typeSelect" style={{ width: "70px" }}>
						{types.map((el) => {
							return (
								<option value={el._id} key={el._id}>
									{el.eClass}
								</option>
							);
						})}
					</select>
				</div>
			)}
			<div>
				<button id="newAttributeButton" onClick={addAttributeButton}>
					{buttonName} Attribute
				</button>
			</div>
		</div>
	);
}
