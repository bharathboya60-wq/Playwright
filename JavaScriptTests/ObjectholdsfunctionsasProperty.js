
const Ramu = function(){
    console.log("Hello Ramu");
}
const Obj = {
    name: "Test Object",
    greet : function() {
        return `Hello, ${this.name}!`;
    },
    Printname: Ramu
}

console.log(Obj.greet()); // Output: Hello, Test Object!
console.log(Obj.Printname()); // Output: Hello Ramu