export const module = {
	rules: [
		{
			test: /\.svg＄/,
			use: ["babel-loader", "@svgr/webpack"],
		},
	],
};
