function readPackage(pkg, context) {

	if (pkg.name === 'lineup') {
		const problemDeps = {
			// for @wordpress/babel-preset-env
			'@babel/runtime': '^7.16.0',
		};
		pkg.devDependencies = { ...pkg.devDependencies, ...problemDeps }

		context.log(`¡adding deps to lineup! ${ Object.keys(pkg.devDependencies).join(', ') }`);
	}

	return pkg
}

module.exports = {
	hooks: {
		readPackage
	}
}
