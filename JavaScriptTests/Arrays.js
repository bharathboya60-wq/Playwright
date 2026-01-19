let Array = ["Apple", "Banana", "Orange", "Mango", "Grapes"];

console.log(Array);
Array.push("Pineapple");
console.log("After Push:", Array);


Array.pop();
Array.pop();
console.log("After Pop:", Array);


Array.shift();
console.log("After Shift:", Array);
Array.shift();
console.log("After another Shift:", Array);


Array.unshift("Strawberry");
console.log("After Unshift:", Array);
Array.unshift("Blueberry");
console.log("After another Unshift:", Array);
Array.push("Kiwi", "Watermelon");
console.log("After adding multiple fruits with Push:", Array);



const SliceArray = Array.slice(1, 4);
console.log("After Slice (1,4):", SliceArray);


Array.splice(2);
console.log("After Splice (2,2,'Papaya','Peach'):", Array);