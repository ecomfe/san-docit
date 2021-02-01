module.exports = {
    'extends': [
        '@ecomfe/eslint-config',
        '@ecomfe/eslint-config/san'
    ],
    rules: {
        'comma-dangle': ['error', {
            'arrays': 'never',
            'objects': 'never',
            'imports': 'never',
            'exports': 'never',
            'functions': 'ignore'
        }]
    }
};
