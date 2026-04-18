/**
 * @file questions.js
 * @description This file contains programming exercises for Week 6 of the
 *              Mobile Application Development course. It includes a series of
 *              JavaScript challenges that focus regular expression and fetch API.
 *
 *              Students are expected to write their code solutions within this
 *              file in the designated sections for each exercise. The provided
 *              exercises are designed to enhance understanding of basic JavaScript
 *              syntax and problem-solving skills within the context of web and
 *              mobile app development.
 *
 * @author Larry Wen
 * @created [27/04/2024]
 *
 * INSTRUCTIONS:
 * - Follow the prompts for each exercise and write your code in the specified
 *   areas.
 * - Run the provided tests after completing the exercises to check your work.
 * - Do not modify the structure of the file or the provided code snippets.
 * - Seek assistance if you encounter difficulty understanding the exercises or
 *   implementing the solutions.
 */

// Question 1: Using Regular Expression Function: `.test()`
// Implement the following functions that utilize regular expressions:
// 1. containDigit - Check if the input string contains at least one digit.
// 2. containCapital - Check if the input string contains at least one uppercase letter.
// 3. validPlate - Check if the input string is a valid license plate with the format: Three uppercase letters followed by three digits.

function containDigit(str) {
  const pattern = /\d/
  // Can also use this:
  //const pattern = /[0-9]/;
  
  return pattern.test(str);
}

function containCapital(str) {
  const pattern = /[A-Z]/;
  return pattern.test(str);
}

function validPlate(str) {
  const pattern = /^[A-Z]{3}[0-9]{3}$/;
  return pattern.test(str);
}

// Question 2 Using Regular Expression Function `.match()`
// 1. findWordsWithVowels: Return all words containing vowels from a given string.
// 2. findWordsEndingWithDigit: Return all words that end with a digit.
// 3. findWordsWithPattern: Return words that start with [b, k, d, l] and end with 'e'
// [note]: All these questions are case-insensitive, and the returned words should be
// in lowercase. For instance, both "My" and "my" should return "my"
function findWordsWithVowels(str) {
  // Breakdown of Regex pattern:
  // \b --> matches start of the word
  // \w* --> matches zero or more word characters (letters/digits)
  // [aeiou] --> matches at least one vowel
  // \w* --> matches the rest of the word characters
  // \b --> matches the end of a word

  const pattern = /\b\w*[aeiou]\w*\b/gi;

  // || [] means if no matches found, return null empty array.
  return str.toLowerCase().match(pattern) || [];
}

function findWordsEndingWithDigit(str) {
  // Breakdown of Regex pattern
  // \b --> is the start word boundary. It ensures the engine starts looking at the very beginning of a word.
  // \w* --> Matches zero or more "word characters" (letters, digits, or underscores). Allows for words of any length (like "abc", "12" or a sole digit.)
  // \d --> this is the must have part. It forces the match to find a digit because it is placed right before the closing boundary.
  // \b --> another word boundary. This ensures that whatever digit was found is actually the end of the word.

  const pattern = /\b\w*\d\b/gi;
  return str.toLowerCase().match(pattern) || [];
}

function findWordsWithPattern(str) {
  const pattern = /\b[bkdl]\w*e\b/gi;

  return str.toLowerCase().match(pattern) || [];

}

// Question 3: Format an array of product strings into an array of objects with 'id' and 'title' properties.
// The 'id' should be a camel-cased, lowercase version of the product name with special characters removed.
// The 'title' should capitalize each word for display, making it human-readable.
// Usage of Array's map function and the replace method with regular expressions is mandatory.
// Example:
// Input: ['shoes', "women's cloth"]
// Output: [
//    { id: 'shoes', title: 'Shoes' },
//    { id: 'womensCloth', title: "Women's Cloth" }
// ]
function formatProductNames(products) {
  return products.map(item => {

    // Step 1: Create the ID where it is camelCase and lowercase. 
    // First, we will remove special characters using Regex.
    // Second, we will handle the camelCase by splitting and joining.

    const id = item
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(' ')
    .map((word, index) => {
      return index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');

    // Create the title capitalised
    const title = item
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

    return { id: id, title: title };
  });
}

// Question 4: Write an asynchronous function `getCategories` that retrieves a list of categories from the Fake Store API.
// The function should make a network request to 'https://fakestoreapi.com/products/categories' and return an array of category strings provided by the API.
// This function should use async/await for handling asynchronous operations.
// Note: you can find the api documents at: https://fakestoreapi.com/docs
async function getCategories() {
  const url = 'https://fakestoreapi.com/products/categories';
  
  try {
    const response = await fetch(url);
    
    // Check if the response is okay (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // This ensures the function returns the array
  } catch (e) {
    console.error("Error fetching categories:", e.message);
    return []; // Return an empty array or handle the error as needed
  }
}


// Question 5: Write an asynchronous function `getGoodProducts` that retrieves products from a specified category with a rating equal to or higher than a given minimum.
// This function should take two parameters: `category` (a string) and `minRate` (a number).
// Make a network request to 'https://fakestoreapi.com/products/' and filter the results to include only those products that match the category and have a rating greater or equal to `minRate`.
// The function should return an array of objects, each containing 'id', 'rate', 'title', and 'price' of the product.
// You should use high order array function map and filter.
// Note: you can find the api documents at: https://fakestoreapi.com/docs
async function getGoodProducts(category, minRate) {
  const url = 'https://fakestoreapi.com/products/';

  try {
    const response = await fetch(url);
    if (!response.ok)
    {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // Filter category and rating.
    const filteredProducts = data.filter(item => item.category === category && item.rating.rate >= minRate);

    // Map to the specific object structure requested in the question.
    const result = filteredProducts.map(item => ({
      id: item.id,
      rate: item.rating.rate,
      title: item.title,
      price: item.price
    }));

    return result;

  } catch (e) {
    console.error("Error fetching items:", e.message);
    return [];
  }
}

module.exports = {
  containDigit,
  containCapital,
  validPlate,
  findWordsWithVowels,
  findWordsEndingWithDigit,
  findWordsWithPattern,
  formatProductNames,
  getCategories,
  getGoodProducts,
};
