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
}) {
	const { x, y } = position;
	const modalStyle = {
		top: buttonName === "Add" ? y : y + 10,
		left: buttonName === "Add" ? x + 200 : x - 60,
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
			<div>
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
			<div>
				<button id="newAttributeButton" onClick={addAttributeButton}>
					{buttonName} Attribute
				</button>
			</div>
		</div>
	);
}
