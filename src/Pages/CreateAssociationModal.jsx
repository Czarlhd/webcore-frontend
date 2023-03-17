import React, { useState } from "react";

export default function CreateAssociationModal({
	position,
	handleCloseClick,
	classes,
	fromClassId,
	createAssociationButton,
}) {
	const { x, y } = position;
	const modalStyle = {
		top: y,
		left: x + 200,
	};

	const fromClass = classes.find((el) => el._id === fromClassId).name;

	const [isBidirectional, setIsBidirectional] = useState(false);

	console.log(fromClass);

	function createAssociation() {
		const toClassId = document.getElementById("classSelect").value;
		createAssociationButton(fromClassId, toClassId, isBidirectional);
		handleCloseClick();
	}

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
				<div>
					<span>Create Association from: </span>
				</div>
				<div>
					<span style={{ fontWeight: "bold" }}>{fromClass}</span>
				</div>
			</div>
			<div>
				<div>To Class: </div>
				<select id="classSelect" style={{ width: "70px" }}>
					{classes.map((el) => {
						if (el._id !== fromClassId) {
							return (
								<option value={el._id} key={el._id}>
									{el.name}
								</option>
							);
						} else {
							return null;
						}
					})}
				</select>
			</div>
			<div>
				<span>Is Bidirectional</span>
				<input
					type="checkbox"
					id="abstract"
					name="abstract"
					value="abstract"
					onChange={(e) => setIsBidirectional(e.target.checked)}
				/>
			</div>
			<div>
				<button
					id="createAssociationButton"
					onClick={createAssociation}
				>
					Create Association
				</button>
			</div>
		</div>
	);
}
