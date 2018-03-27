module.exports = {
    verbose: true,
    testRegex: '__tests__/.*\\.test\\.(js|jsx)$',
    transform: {
        '.js': './node_modules/babel-jest',
    },
    setupTestFrameworkScriptFile: './__tests__/setup.js',
};
