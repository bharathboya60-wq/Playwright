class Person {
    constructor(name, age) {    
        this.name = name;    
        this.age = age;    
    }

    GetDetails() {    
        return `Name: ${this.name}, Age: ${this.age}`;    
    }
}
const p1 = new Person("Alice", 30);
console.log(p1.GetDetails());
export default Person;