/** @see https://stylelint.io/user-guide/rules */
/** @type {import('stylelint').Config} */

export default {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
	plugins: ['stylelint-order'],
	rules: {
		'declaration-block-single-line-max-declarations': 1,
	},
	overrides: [
		{
			files: ['./src/styles/**/*.scss'],
			customSyntax: 'postcss-scss',
		},
	],
};
