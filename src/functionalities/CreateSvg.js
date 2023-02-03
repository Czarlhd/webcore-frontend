import {
	ONE_CLASS,
	TWO_CLASSES_WITH_ASSOCIATION,
	TEST,
	ONE_CLASS_ONE_ATTRIBUTE,
} from "../assets/CDM_details";

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
					json.types
				);

				//TODO Create Associations
				//"?." checks if association exists
				if (json?.associations) {
					json.associations.forEach((association) => {
						if (association.name !== "_" + Class.name) return; //? This is to avoid creating creating an association from both classes between each other

						var coordinates = values.find((value) => {
							return value.key === association._id;
						}).value; //Coordinates of the association
						createAssociation(
							svg,
							Class._id,
							association._id,
							coordinates.x,
							coordinates.y
						);
					});
				}
			});
		}
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
	svg.style.backgroundColor = "grey";
	// document.body.appendChild(svg);
	return svg;
}

function createClassBox(svg, name, classId, x, y, attributes, types) {
	/**
	 * Create SVG group
	 */
	let g = document.createElementNS(NS, "g");
	g.setAttribute("transform", `translate(${x}, ${y})`);
	g.setAttribute("name", name);
	g.setAttribute("id", "class-" + classId); //? This is the id of the class
	svg.appendChild(g);

	/**
	 * Create the class Name rectangle
	 */

	let path1 = document.createElementNS(NS, "path");
	path1.setAttribute("d", "M 0 26 L 0 0 L 160 0 L 160 26");
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

	var textNode = document.createTextNode(name);
	className.appendChild(textNode);

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
		gPath.setAttribute("pointer-events", "all");
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
			gPath.appendChild(attributeName);

			var attributeText = document.createTextNode(
				`${type}: ${attribute.name}`
			);
			attributeName.appendChild(attributeText);
		});

		// let attributeNam = document.createElementNS(NS, "text");
		// attributeNam.setAttribute("id", "attribute-" + 11);
		// attributeNam.setAttribute("x", "5.5");
		// attributeNam.setAttribute("y", "55");
		// gPath.appendChild(attributeNam);

		// var attributeText2 = document.createTextNode(
		// 	"int" + attributes[0].name
		// );
		// attributeNam.appendChild(attributeText2);
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

function createAssociation(svg, classId, associationId, x, y) {
	//? Ask how to get lines because we only have the start coordinates of the association and what is dashed line
	// console.log(svg.getElementById("class-" + classId));
}
