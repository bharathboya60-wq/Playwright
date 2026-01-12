import { type Page } from "@playwright/test";

var Age: number = 45; 

console.log("Age is: " + Age);


var Name: string = "John";
Name = "Doe";
console.log("Name is: " + Name);

var IsStudent: boolean = true;
IsStudent = false;
console.log("Is Student: " + IsStudent);

var Scores: number[] = [90, 85, 88];
Scores.push(92);
console.log("Scores are: " + Scores);


var Person: { firstName: string; lastName: string; age: number } = { firstName: "Jane", lastName: "Smith", age: 30 };
Person.age = 31;
console.log("Person is: " + Person.firstName + " " + Person.lastName + ", Age: " + Person.age);


function greet(name: string): string {
    return "Hello, " + name + "!";
}

console.log(greet("Alice"));






