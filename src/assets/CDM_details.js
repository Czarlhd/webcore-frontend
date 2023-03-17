export const ONE_CLASS = {
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
};

export const TWO_CLASSES_WITH_ASSOCIATION = {
	eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//ClassDiagram",
	_id: "null",
	name: "2CLASSES_WITH_ASSOCIATION",
	classes: [
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//Class",
			_id: "1",
			name: "A",
			associationEnds: [
				{
					_id: "2",
					name: "myA",
					assoc: "15",
					lowerBound: 1,
				},
				{
					_id: "3",
					name: "myA",
					assoc: "15",
					lowerBound: 1,
				},
			],
			attributes: [
				{
					_id: "23",
					name: "Dog",
					type: "5",
				},
				{
					_id: "24",
					name: "month",
					type: "8",
				},
				{
					_id: "25",
					name: "day",
					type: "7",
				},
			],
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//Class",
			_id: "4",
			name: "B",
			attributes: [
				{
					_id: "26",
					name: "Name",
					type: "14",
				},
				{
					_id: "27",
					name: "Age",
					type: "12",
				},
				{
					_id: "28",
					name: "Address",
					type: "11",
				},
			],
		},
	],
	types: [
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDVoid",
			_id: "5",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDAny",
			_id: "6",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDBoolean",
			_id: "7",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDDouble",
			_id: "8",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDInt",
			_id: "9",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDLong",
			_id: "10",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDString",
			_id: "11",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDByte",
			_id: "12",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDFloat",
			_id: "13",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDChar",
			_id: "14",
		},
	],
	associations: [
		{
			_id: "15",
			name: "_A",
			ends: ["2", "3"],
			associationClass: "4",
		},
	],
	layout: {
		_id: "16",
		containers: [
			{
				_id: "17",
				key: "null",
				value: [
					{
						_id: "18",
						key: "1",
						value: {
							_id: "19",
							x: 254.49988,
							y: 352.0001,
						},
					},
					{
						_id: "20",
						key: "4",
						value: {
							_id: "21",
							x: 624.0,
							y: 357.0,
						},
					},
					{
						_id: "22",
						key: "15",
						value: {
							_id: "23",
							x: 624.0,
							y: 207.0,
						},
					},
				],
			},
		],
	},
};

export const ONE_CLASS_ONE_ATTRIBUTE = {
	eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//ClassDiagram",
	_id: "null",
	name: "1CLASS_WITH_ATTRIBUTE",
	classes: [
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//Class",
			_id: "1",
			name: "X",
			attributes: [
				{
					_id: "2",
					name: "year",
					type: "7",
				},
				{
					_id: "17",
					name: "month",
					type: "8",
				},
				{
					_id: "18",
					name: "day",
					type: "7",
				},
			],
		},
	],
	types: [
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDVoid",
			_id: "3",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDAny",
			_id: "4",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDBoolean",
			_id: "5",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDDouble",
			_id: "6",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDInt",
			_id: "7",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDLong",
			_id: "8",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDString",
			_id: "9",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDByte",
			_id: "10",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDFloat",
			_id: "11",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDChar",
			_id: "12",
		},
	],
	layout: {
		_id: "13",
		containers: [
			{
				_id: "14",
				key: "null",
				value: [
					{
						_id: "15",
						key: "1",
						value: {
							_id: "16",
							x: 408.5,
							y: 117.0,
						},
					},
				],
			},
		],
	},
};
export const TEST = {
	eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//ClassDiagram",
	_id: "null",
	name: "TEST",
	classes: [
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//Class",
			_id: "14",
			name: "Class1",
			dataType: true,
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//Class",
			_id: "16",
			name: "Class2",
		},
	],
	types: [
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDVoid",
			_id: "1",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDAny",
			_id: "2",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDBoolean",
			_id: "3",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDDouble",
			_id: "4",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDInt",
			_id: "5",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDLong",
			_id: "6",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDString",
			_id: "7",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDByte",
			_id: "8",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDFloat",
			_id: "9",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDChar",
			_id: "10",
		},
	],
	layout: {
		_id: "11",
		containers: [
			{
				_id: "12",
				key: "null",
				value: [
					{
						_id: "15",
						key: "14",
						value: {
							_id: "null",
							x: 254.49988,
							y: 352.0001,
						},
					},
					{
						_id: "17",
						key: "16",
						value: {
							_id: "null",
							x: 624.0,
							y: 357.0,
						},
					},
				],
			},
		],
	},
};

export const ONE_ASSOCIATION = {
	eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//ClassDiagram",
	_id: "null",
	name: "TEST",
	classes: [
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//Class",
			_id: "14",
			name: "Class1",
			abstract: true,
			associationEnds: [
				{
					_id: "21",
					name: "myClass1",
					assoc: "23",
					lowerBound: 1,
				},
				{
					_id: "29",
					name: "myClass1",
					assoc: "28",
					lowerBound: 1,
				},
			],
			attributes: [
				{
					_id: "20",
					name: "attribute2",
					type: "6",
				},
				{
					_id: "19",
					name: "attribute1",
					type: "6",
				},
			],
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//Class",
			_id: "16",
			name: "Class2",
			associationEnds: [
				{
					_id: "22",
					name: "myClass2",
					assoc: "23",
					lowerBound: 1,
				},
			],
			attributes: [
				{
					_id: "18",
					name: "attribute1",
					type: "6",
				},
			],
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//Class",
			_id: "24",
			name: "Class3",
			associationEnds: [
				{
					_id: "25",
					name: "myClass3",
					assoc: "28",
					lowerBound: 1,
				},
			],
			attributes: [
				{
					_id: "26",
					name: "attribute1",
					type: "6",
				},
			],
		},
	],
	types: [
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDVoid",
			_id: "1",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDAny",
			_id: "2",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDBoolean",
			_id: "3",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDDouble",
			_id: "4",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDInt",
			_id: "5",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDLong",
			_id: "6",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDString",
			_id: "7",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDByte",
			_id: "8",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDFloat",
			_id: "9",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDChar",
			_id: "10",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDEnum",
			_id: "29",
			name: "SecondEnum",
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDEnum",
			_id: "30",
			name: "FirstEnum",
		},
	],
	associations: [
		{
			_id: "23",
			name: "Class1_Class2",
			ends: ["21", "22"],
		},
		{
			_id: "28",
			name: "Class1_Class3",
			ends: ["25", "29"],
		},
	],
	layout: {
		_id: "11",
		containers: [
			{
				_id: "12",
				key: "null",
				value: [
					{
						_id: "15",
						key: "14",
						value: {
							_id: "null",
							x: 300.0,
							y: 70.0,
						},
					},
					{
						_id: "17",
						key: "16",
						value: {
							_id: "null",
							x: 56.0,
							y: 73.0,
						},
					},
					{
						_id: "27",
						key: "24",
						value: {
							_id: "null",
							x: 356.0,
							y: 473.0,
						},
					},
					{
						_id: "31",
						key: "29",
						value: {
							_id: "null",
							x: 100.0,
							y: 300.0,
						},
					},
					{
						_id: "32",
						key: "30",
						value: {
							_id: "null",
							x: 100.0,
							y: 300.0,
						},
					},
				],
			},
		],
	},
};
