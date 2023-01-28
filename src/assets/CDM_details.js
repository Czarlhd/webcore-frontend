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
		},
		{
			eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//Class",
			_id: "4",
			name: "B",
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

export const TEST = {
        eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//ClassDiagram",
        _id: "null",
        name: "TEST",
        classes: [
            {
                eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//Class",
                _id: "14",
                name: "Class1",
                dataType: true
            },
            {
                eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//Class",
                _id: "16",
                name: "Class2"
            }
        ],
        types: [
            {
                eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDVoid",
                _id: "1"
            },
            {
                eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDAny",
                _id: "2"
            },
            {
                eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDBoolean",
                _id: "3"
            },
            {
                eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDDouble",
                _id: "4"
            },
            {
                eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDInt",
                _id: "5"
            },
            {
                eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDLong",
                _id: "6"
            },
            {
                eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDString",
                _id: "7"
            },
            {
                eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDByte",
                _id: "8"
            },
            {
                eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDFloat",
                _id: "9"
            },
            {
                eClass: "http://cs.mcgill.ca/sel/cdm/1.0#//CDChar",
                _id: "10"
            }
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
                                y: 352.0001
                            }
                        },
                        {
                            _id: "17",
                            key: "16",
                            value: {
                                _id: "null",
                                x: 624.0,
                                y: 357.0
                            }
                        }
                    ]
                }
            ]
        }
    }
