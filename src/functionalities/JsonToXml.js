import React from "react";
import exportFromJSON from "export-from-json";

export default function JsonToXml() {
	const data = [
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//ClassDiagram",
			_id: "null",
			name: "1CLASS",
			classes: [
				{
					eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//Class",
					_id: "1",
					name: "X",
				},
			],
			types: [
				{
					eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDVoid",
					_id: "2",
				},
				{
					eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDAny",
					_id: "3",
				},
				{
					eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDBoolean",
					_id: "4",
				},
				{
					eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDDouble",
					_id: "5",
				},
				{
					eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDInt",
					_id: "6",
				},
				{
					eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDLong",
					_id: "7",
				},
				{
					eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDString",
					_id: "8",
				},
				{
					eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDByte",
					_id: "9",
				},
				{
					eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDFloat",
					_id: "10",
				},
				{
					eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDChar",
					_id: "11",
				},
			],
			layout: {
				_id: "12",
				containers: [
					{
						_id: "13",
						key: "null",
						value: [
							{
								_id: "14",
								key: "1",
								value: {
									_id: "15",
									x: 365.5,
									y: 80.0,
								},
							},
						],
					},
				],
			},
		},
	];

	const fileName = "download";
	const exportType = "xml";
	//This const is used to map the data to the correct format
	const fieldsAsObjects = {
		eClass: "eclass header",
		_id: "_id",
		name: "name",
		classes: "classes",
		types: "types",
		layout: "layout",
		containers: "containers",
		key: "key",
		value: "value",
		x: "x",
		y: "y",
	};

	// console.log(fieldsAsObjects);
	let fields = fieldsAsObjects ? fieldsAsObjects : [];

	function download() {
		exportFromJSON({ data, fileName, fields, exportType });
	}

	return (
		<div>
			<div>jsonToXml</div>
			<button onClick={download}>Download</button>
		</div>
	);
}
