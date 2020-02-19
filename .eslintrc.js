module.exports = {
  parser:  '@typescript-eslint/parser', 
  extends: [ 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint'],
  env: {                          
    browser: true,
    node: true,
  }                               
}

