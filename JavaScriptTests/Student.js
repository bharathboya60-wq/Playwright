import person from './Person.js';

class Student extends person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
    GettudentDetails() {
        return `${super.GetDetails()}, Grade: ${this.grade}`;
    }
}

const s1 = new Student("Bob", 20, "A");
console.log(s1.GettudentDetails());


export default Student;