const Students = [
    { name: "Bharath", Score:85},
    { name: "Alice", Score:92},
    { name: "Bob", Score:35},
    { name: "Diana", Score:88},
    { name: "Eve", Score:95},
    { name: "Frank", Score:67},
    { name: "Grace", Score:20},
    { name: "Heidi", Score:34},
    { name: "Ivan", Score:37},
]

const PassedStudents = Students.filter(student => student.Score >= 36)
console.log(PassedStudents);

const StudentNames = Students.map(student => {
    student.name = student.name.toUpperCase();
    student.grade = student.Score >= 36 ? 'Pass' : 'Fail';
    return student;
});
console.log(StudentNames);


const TotalScore  = PassedStudents.reduce((total, student) => {
    return total + student.Score;
}, 0);

console.log("Total Score of all students:", TotalScore);