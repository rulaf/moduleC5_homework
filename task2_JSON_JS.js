const jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;

const data = JSON.parse(jsonString);
const list = data.list;

const personList = [];
for (let person of list){
  const nameOfPerson = person.name;
  const ageOfPerson = person.age;
  const profOfPerson = person.prof
  const personObject = {
    name: nameOfPerson,
    age: Number(ageOfPerson),
    prof: profOfPerson,
  };
  personList.push(personObject);
};
const result = {
  list: personList,
};

console.log("result", result);