const NS = "http://www.w3.org/2000/svg";

export default function CreateSvg(jsonSvg) {
	let svg = createSvg();

	/**
	 * ONE_CLASS shows how one class is created alone
	 * To check for two classes being created replace ONE_CLASS with TWO_CLASSES_WITH_ASSOCIATION
	 */
	jsonToSVG(svg, jsonSvg);

	return svg;
}

/**
 *
 * @param {The empty SVG canvas} svg
 * @param {The json object that will be converted to an SVG} json
 * This methods loops through the json object and creates the SVG representation
 *
 * !! This method is not complete yet !!
 *
 * Explanation:
 * It loops through the object, when it reaches "classes", it loops through the different classes
 * and created a box for each different class. For now it only works with one class, because we
 * are giving the same coordinates for each box and so they are stacked and we can only see the last one created.
 * (Can check console log to see that multiple classes are created).
 * The class name comes from the "name" attribute of the class in the JSON object.
 * A unique ID is generated for the class box and the className text field for easy manipulation.
 * More IDs will be added later depending on where we need them.
 *
 * TODO: The next step is to give each box different coordinates so that they are not stacked.
 * TODO: And then we can add the attributes and methods to each box.
 *
 * TODO: The next step after that is to add the associations between the classes.
 *
 */
function jsonToSVG(svg, json) {
	if (typeof json === "object") {
		//Gets the values for all component
		const values = json.layout.containers[0].value;

		//Create Classes
		if (Array.isArray(json["classes"])) {
			json.classes.forEach((Class, index) => {
				var coordinates = values.find((value) => {
					return value.key === Class._id;
				}).value;
				let attributes = [];
				if (Class.attributes) {
					attributes = Class.attributes; //If attributes exist, get them
				}
				createClassBox(
					svg,
					Class.name,
					Class._id,
					coordinates.x,
					coordinates.y,
					attributes,
					json.types,
					Class?.abstract
				);
			});

			//TODO Create Associations
			//"?." checks if association exists
			if (json?.associations) {
				json.associations.forEach((association) => {
					const classNames = association.name.split("_");
					const className1 = classNames[0];
					const className2 = classNames[1];
					const end1 = association.ends[0];
					const end2 = association.ends[1];

					createAssociation(
						svg,
						className1,
						className2,
						end1,
						end2,
						json.classes,
						values
					);
				});
			}
		}

		//Create Enumerations
		json.types.forEach((type) => {
			if (type.eClass.split("CD")[1] === "Enum") {
				var coordinates = values.find((value) => {
					return value.key === type._id;
				}).value;
				createEnumeration(
					svg,
					type.name,
					type._id,
					coordinates.x,
					coordinates.y,
					[
						//Test Array
						{ name: "Monday" },
						{ name: "Tuesday" },
						{ name: "Wednesday" },
						{ name: "Thursday" },
						{ name: "Friday" },
						{ name: "Saturday" },
						{ name: "Sunday" },
					]
				);
			}
		});
	}
}

function createSvg() {
	/**
	 * Create SVG representation
	 */
	let svg = document.createElementNS(NS, "svg");
	svg.setAttribute("width", "100%");
	svg.setAttribute("height", "600");
	svg.setAttribute("viewBox", "-0.5 -0.5 950 500");
	svg.setAttribute("id", "classDiagram");
	svg.style.backgroundColor = "grey";
	// document.body.appendChild(svg);
	return svg;
}

function createClassBox(
	svg,
	name,
	classId,
	x,
	y,
	attributes,
	types,
	isAbstract
) {
	/**
	 * Create SVG group
	 */
	let g = document.createElementNS(NS, "g");
	g.setAttribute("transform", `translate(${x}, ${y})`);
	g.setAttribute("name", name);
	g.setAttribute("id", "class-" + classId); //? This is the id of the class
	// g.setAttribute("pointer-events", "all");
	svg.appendChild(g);

	/**
	 * Create the class Name rectangle
	 */

	let path1 = document.createElementNS(NS, "path");
	if (isAbstract) {
		path1.setAttribute("d", "M 0 26 L 0 -20 L 160 -20 L 160 26");
	} else {
		path1.setAttribute("d", "M 0 26 L 0 0 L 160 0 L 160 26");
	}
	path1.setAttribute("fill", "rgb(255, 255, 255)");
	path1.setAttribute("stroke", "rgb(0, 0, 0)");
	path1.setAttribute("stroke-miterlimit", "10");
	path1.setAttribute("pointer-events", "none");
	g.appendChild(path1);

	let path3 = document.createElementNS(NS, "path");
	path3.setAttribute("d", "M 0 26 L 160 26");
	path3.setAttribute("fill", "none");
	path3.setAttribute("stroke", "rgb(0, 0, 0)");
	path3.setAttribute("stroke-miterlimit", "10");
	path3.setAttribute("pointer-events", "none");
	g.appendChild(path3);

	/**
	 * Create the class name text box for the first rectangle
	 */

	let g2 = document.createElementNS(NS, "g");
	g2.setAttribute("fill", "rgb(0, 0, 0)");
	g2.setAttribute("font-family", "Helvetica");
	g2.setAttribute("font-weight", "bold");
	g2.setAttribute("pointer-events", "none");
	g2.setAttribute("font-size", "12");
	g2.setAttribute("text-anchor", "middle");
	g.appendChild(g2);

	let className = document.createElementNS(NS, "text");
	className.setAttribute("id", "className-" + classId);
	className.setAttribute("x", "79.5");
	className.setAttribute("y", "17.5");
	className.setAttribute("pointer-events", "all");
	g2.appendChild(className);

	let textNode;
	textNode = document.createTextNode(name);

	if (isAbstract) {
		let abstractTspan = document.createElementNS(NS, "tspan");
		abstractTspan.setAttribute("x", "79.5");
		abstractTspan.setAttribute("y", "-1");
		abstractTspan.appendChild(document.createTextNode("«abstract»"));
		className.appendChild(abstractTspan);

		let nameTspan = document.createElementNS(NS, "tspan");
		nameTspan.setAttribute("x", "79.5");
		nameTspan.setAttribute("dy", "20");
		nameTspan.setAttribute("id", "className-" + classId);
		nameTspan.appendChild(textNode);
		className.appendChild(nameTspan);
	} else {
		className.appendChild(textNode);
	}

	/**
	 * Create the attributes rectangle
	 */
	const attributesBoxHeight = 30 + attributes.length * 15;
	// const attributesBoxHeight = 45;
	let path2 = document.createElementNS(NS, "path");
	path2.setAttribute(
		"d",
		`M 0 26 L 0 ${attributesBoxHeight} L 160 ${attributesBoxHeight} L 160 26`
	); //Changes the attributes rectangle height
	path2.setAttribute("fill", "white");
	path2.setAttribute("stroke", "rgb(0, 0, 0)");
	path2.setAttribute("stroke-miterlimit", "10");
	path2.setAttribute("pointer-events", "none");
	g.appendChild(path2);

	/**
	 * TODO: Create attributes text box
	 */

	if (attributes.length > 0) {
		let gPath = document.createElementNS(NS, "g");
		gPath.setAttribute("fill", "rgb(0, 0, 0)");
		gPath.setAttribute("font-family", "Helvetica");
		// gPath.setAttribute("pointer-events", "all");
		gPath.setAttribute("font-size", "12");
		g.appendChild(gPath);

		attributes.forEach((attribute, index) => {
			let y = 40 + index * 15;
			let type = types
				.find((type) => type._id === attribute.type)
				.eClass.split("CD")[1];

			let attributeName = document.createElementNS(NS, "text");
			attributeName.setAttribute("id", "attribute-" + attribute._id);
			attributeName.setAttribute("x", "5.5");
			attributeName.setAttribute("y", `${y}`);
			attributeName.setAttribute("editable", "true");
			attributeName.setAttribute("pointer-events", "all");
			gPath.appendChild(attributeName);

			var attributeText = document.createTextNode(
				`${type}: ${attribute.name}`
			);
			attributeName.appendChild(attributeText);
		});
	}

	/**
	 *  TODO: Create the methods Text box
	 */

	/**
	 * Create the method rectangle for the class
	 */

	// let path4 = document.createElementNS(NS, "path");
	// path4.setAttribute("d", "M 0 30 L 160 30");
	// path4.setAttribute("fill", "none");
	// path4.setAttribute("stroke", "rgb(0, 0, 0)");
	// path4.setAttribute("stroke-miterlimit", "10");
	// path4.setAttribute("pointer-events", "none");
	// g.appendChild(path4);
}

function createAssociation(
	svg,
	className1,
	className2,
	end1,
	end2,
	classes,
	coordinates
) {
	const class1 = classes.find((Class) => {
		return Class.name === className1;
	});
	const class1Id = class1._id;
	const coord1 = coordinates.find((coord) => {
		return coord.key === class1Id;
	}).value;

	const class2 = classes.find((Class) => {
		return Class.name === className2;
	});
	const class2Id = class2._id;
	const coord2 = coordinates.find((coord) => {
		return coord.key === class2Id;
	}).value;

	const newCoord = getAdjustedCoordinates(
		coord1.x,
		coord1.y,
		coord2.x,
		coord2.y,
		class1.attributes?.length ? class1.attributes.length : 0,
		class2.attributes?.length ? class2.attributes.length : 0
	);

	let line = document.createElementNS(NS, "line");
	line.setAttribute("x1", `${newCoord.x1}`);
	line.setAttribute("y1", `${newCoord.y1}`);
	line.setAttribute("x2", `${newCoord.x2}`);
	line.setAttribute("y2", `${newCoord.y2}`);
	line.setAttribute("stroke", "black");
	line.setAttribute("strokeWidth", "2");
	svg.appendChild(line);
}

function getAdjustedCoordinates(x1, y1, x2, y2, numOfAtt1, numOfAtt2) {
	let newX1 = x1;
	let newY1 = y1;
	let newX2 = x2;
	let newY2 = y2;

	let corners1 = {
		c1: { x: x1, y: y1 },
		c2: { x: x1 + 160, y: y1 },
		c3: { x: x1, y: y1 + (30 + numOfAtt1 * 15) },
		c4: { x: x1 + 160, y: y1 + 30 * numOfAtt1 * 15 },
	};
	let corners2 = {
		c1: { x: x2, y: y2 },
		c2: { x: x2 + 160, y: y2 },
		c3: { x: x2, y: y2 + (30 + numOfAtt2 * 15) },
		c4: { x: x2 + 160, y: y2 + 30 * numOfAtt2 * 15 },
	};

	/**
	 * 	These are the diff points where a line can connect to the class
	 *  To make it easier and add the line to predermined classes
	 *
	 *  Top1 = (x+5, y)
	 *  Top2 = (x+80, y)
	 *  Top3 = (x+119, y)
	 *
	 *  Left1 = (x, y+5)
	 * 	Left2 = (x, y + (30 + attributes.length * 15) / 2)
	 * 	Left3 = (x, y + (30 + attributes.length * 15) - 5)
	 *
	 * 	Right1 = (x+160, y+5)
	 * 	Right2 = (x+160, y + (30 + attributes.length * 15) / 2)
	 *  Right3 = (x+160, y + (30 + attributes.length * 15) - 5)
	 *
	 *  Bottom1 = (x+5, y + (30 + attributes.length * 15))
	 *  Bottom2 = (x+80, y + (30 + attributes.length * 15))
	 *  Bottom3 = (x+119, y + (30 + attributes.length * 15))
	 */

	/**
	 * Calculate the new coordinates for the association
	 * If the first class has a smaller x value than the second class
	 */
	if (x1 < x2) {
		//Right 2 (middle) for first class
		newX1 = x1 + 160;
		newY1 = y1 + (30 + numOfAtt1 * 15) / 2;

		//Left 2 (middle) for second class
		newX2 = x2;
		newY2 = y2 + (30 + numOfAtt2 * 15) / 2;
	} else {
		//Left 2 (middle) for first class
		newX1 = x1;
		newY1 = y1 + (30 + numOfAtt1 * 15) / 2;

		//Right 2 (middle) for second class
		newX2 = x2 + 160;
		newY2 = y2 + (30 + numOfAtt2 * 15) / 2;
	}

	/**
	 * Check if x of the second class has is between the x of the corners of the first class
	 *
	 */
	if (x2 >= x1 && x2 <= corners1.c2.x) {
		if (y2 >= y1) {
			//Bottom 2 (middle) for first class
			newX1 = x1 + 80;
			newY1 = y1 + (30 + numOfAtt1 * 15);

			//Top 2 (middle) for second class
			newX2 = x2 + 80;
			newY2 = y2;
		} else {
			//opposite
			//Top 2 (middle) for first class
			newX1 = x1 + 80;
			newY1 = y1;

			//Bottom 2 (middle) for second class
			newX2 = x2 + 80;
			newY2 = y2 + (30 + numOfAtt2 * 15);
		}
	} else if (x2 >= corners1.c3.x && x2 <= corners1.c4.x) {
		//opposite
		if (y2 >= y1) {
			//Bottom 2 (middle) for first class
			newX1 = x1 + 80;
			newY1 = y1 + (30 + numOfAtt1 * 15);

			//Top 2 (middle) for second class
			newX2 = x2 + 80;
			newY2 = y2;
		} else {
			//opposite
			//Top 2 (middle) for first class
			newX1 = x1 + 80;
			newY1 = y1;

			//Bottom 2 (middle) for second class
			newX2 = x2 + 80;
			newY2 = y2 + (30 + numOfAtt2 * 15);
		}
	}

	return { x1: newX1, y1: newY1, x2: newX2, y2: newY2 };
}

function createEnumeration(svg, name, enumId, x, y, literals) {
	/**
	 * Create SVG group
	 */
	let g = document.createElementNS(NS, "g");
	g.setAttribute("transform", `translate(${x}, ${y})`);
	g.setAttribute("name", name);
	g.setAttribute("id", "class-" + enumId); //? This is the id of the class
	// g.setAttribute("pointer-events", "all");
	svg.appendChild(g);

	/**
	 * Create the class Name rectangle
	 */

	let path1 = document.createElementNS(NS, "path");
	path1.setAttribute("d", "M 0 26 L 0 -20 L 160 -20 L 160 26");
	path1.setAttribute("fill", "rgb(255, 255, 255)");
	path1.setAttribute("stroke", "rgb(0, 0, 0)");
	path1.setAttribute("stroke-miterlimit", "10");
	path1.setAttribute("pointer-events", "none");
	g.appendChild(path1);

	let path3 = document.createElementNS(NS, "path");
	path3.setAttribute("d", "M 0 26 L 160 26");
	path3.setAttribute("fill", "none");
	path3.setAttribute("stroke", "rgb(0, 0, 0)");
	path3.setAttribute("stroke-miterlimit", "10");
	path3.setAttribute("pointer-events", "none");
	g.appendChild(path3);

	/**
	 * Create the class name text box for the first rectangle
	 */

	let g2 = document.createElementNS(NS, "g");
	g2.setAttribute("fill", "rgb(0, 0, 0)");
	g2.setAttribute("font-family", "Helvetica");
	g2.setAttribute("font-weight", "bold");
	g2.setAttribute("pointer-events", "none");
	g2.setAttribute("font-size", "12");
	g2.setAttribute("text-anchor", "middle");
	g.appendChild(g2);

	let className = document.createElementNS(NS, "text");
	className.setAttribute("id", "className-" + enumId);
	className.setAttribute("x", "79.5");
	className.setAttribute("y", "17.5");
	className.setAttribute("pointer-events", "all");
	g2.appendChild(className);

	let abstractTspan = document.createElementNS(NS, "tspan");
	abstractTspan.setAttribute("x", "79.5");
	abstractTspan.setAttribute("y", "-1");
	abstractTspan.appendChild(document.createTextNode("<<enumeration>>"));
	className.appendChild(abstractTspan);

	let nameTspan = document.createElementNS(NS, "tspan");
	nameTspan.setAttribute("x", "79.5");
	nameTspan.setAttribute("dy", "20");
	nameTspan.setAttribute("id", "enumeration-" + enumId);
	nameTspan.appendChild(document.createTextNode(name));
	className.appendChild(nameTspan);

	/**
	 * Create the attributes rectangle
	 */
	const attributesBoxHeight = 30 + literals.length * 15;
	let path2 = document.createElementNS(NS, "path");
	path2.setAttribute(
		"d",
		`M 0 26 L 0 ${attributesBoxHeight} L 160 ${attributesBoxHeight} L 160 26`
	); //Changes the enumaration rectangle height
	path2.setAttribute("fill", "white");
	path2.setAttribute("stroke", "rgb(0, 0, 0)");
	path2.setAttribute("stroke-miterlimit", "10");
	path2.setAttribute("pointer-events", "none");
	g.appendChild(path2);

	/**
	 * TODO: Create attributes text box
	 */

	if (literals?.length > 0) {
		let gPath = document.createElementNS(NS, "g");
		gPath.setAttribute("fill", "rgb(0, 0, 0)");
		gPath.setAttribute("font-family", "Helvetica");
		// gPath.setAttribute("pointer-events", "all");
		gPath.setAttribute("font-size", "12");
		g.appendChild(gPath);

		literals.forEach((literal, index) => {
			let y = 40 + index * 15;

			let literalName = document.createElementNS(NS, "text");
			literalName.setAttribute("id", "attribute-" + literal._id);
			literalName.setAttribute("x", "5.5");
			literalName.setAttribute("y", `${y}`);
			literalName.setAttribute("editable", "true");
			literalName.setAttribute("pointer-events", "all");
			gPath.appendChild(literalName);

			var literalText = document.createTextNode(`${literal.name}`);
			literalName.appendChild(literalText);
		});
	}
}
