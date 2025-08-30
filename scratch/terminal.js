const user_pattern = /username (\w+)/; // Define the pattern as a regex
let string = "usernmoris";

// Now use the regex to match against the string
let result = string.match(user_pattern);

console.log(result);
