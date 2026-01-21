let Str = "Bharath";

console.log("Original String:", Str);
console.log("Length of String:", Str.length);
console.log("Uppercase String:", Str.toUpperCase());
console.log("Lowercase String:", Str.toLowerCase());
console.log("Character at index 2:", Str.charAt(2));
console.log("Substring from index 1 to 4:", Str.substring(1, 4));
console.log("Index of 'a':", Str.indexOf('a'));

let reverseString = "";
for(let i = 0; i < Str.length; i++) {
    reverseString = Str.charAt(i) + reverseString;
}
console.log("Reversed String:", reverseString);