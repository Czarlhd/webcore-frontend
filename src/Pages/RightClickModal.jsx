import React from "react";

export default function RightClickModal({
	show,
	handleCloseClick,
	position,
	options,
	onOptionSelect,
}) {
	const { x, y } = position;
	const modalStyle = {
		top: y,
		left: x,
	};

	const handleOptionClick = (option) => {
		onOptionSelect(option);
	};

	return (
		<div
			className={`modal ${show ? "show" : ""}`}
			style={{
				border: "1px solid black",
				width: "150px",
				borderRadius: "5px",
				boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
				position: "absolute",
				backgroundColor: "white",
				paddingLeft: "0.5rem",
				paddingRight: "0.5rem",
				...modalStyle,
			}}
		>
			<div className="modal-content">
				<span className="close" onClick={handleCloseClick}>
					&times;
				</span>
				<ul
					style={{
						listStyleType: "none",
						padding: 0,
						margin: 0,
					}}
				>
					{options.map((option, index) => (
						<li
							key={index}
							onClick={() => handleOptionClick(option)}
						>
							{option}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
