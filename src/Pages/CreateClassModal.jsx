import React from "react";
import { useState } from "react";

export default function CreateClassModal({
	createClassButton,
	handleCloseClick,
	position,
}) {
	const { x, y } = position;
	const modalStyle = {
		top: y,
		left: x - 195,
	};

	const [className, setClassName] = useState("");
	const [dataType, setDataType] = useState(false);
	const [isInterface, setIsInterface] = useState(false);
	const [isAbstract, setIsAbstract] = useState(false);

	//TODO X and Y need to change depending on the screensize (inspect open example) do the same for enumeration
	const handleCreateClass = () => {
		console.log("First abstract: ", isAbstract);
		createClassButton(
			className,
			dataType,
			isInterface,
			x - 192,
			y - 141,
			isAbstract
		);
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
				id="newClassName"
				type="text"
				placeholder="Class Name"
				value={className}
				onChange={(e) => setClassName(e.target.value)}
			/>
			<div>
				<span>Is Abstract</span>
				<input
					type="checkbox"
					id="abstract"
					name="abstract"
					value="abstract"
					onChange={(e) => setIsAbstract(e.target.checked)}
				/>
			</div>
			{/* <div>
				<span>Data Type</span>
				<input
					type="checkbox"
					id="dataType"
					name="dataType"
					value="dataType"
					onChange={(e) => setDataType(e.target.checked)}
				/>
			</div>
			<div>
				<span>Is Interface</span>
				<input
					type="checkbox"
					id="dataType"
					name="dataType"
					value="dataType"
					onChange={(e) => setIsInterface(e.target.checked)}
				/>
			</div> */}
			<div>
				<button id="createClassButton" onClick={handleCreateClass}>
					Create Class
				</button>
			</div>
		</div>
	);
}
