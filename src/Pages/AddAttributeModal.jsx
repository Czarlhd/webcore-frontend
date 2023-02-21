import React from "react";

export default function AddAttributeModal({
	types,
	addAttributeButton,
	position,
	setAttributeName,
	attributeName,
}) {
	const { x, y } = position;
	const modalStyle = {
		top: y,
		left: x + 200,
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
			<div>Add new Attribute:</div>
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
					Add Attribute
				</button>
			</div>
		</div>
	);
}
