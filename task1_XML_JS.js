const parser = new DOMParser();

const xmlString = `
  <list>
   <student>
      <name lang="en">
       <first>Ivan</first>
       <second>Ivanov</second>
      </name>
      <age>35</age>
      <prof>teacher</prof>
    </student>
    <student>
      <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
      </name>
      <age>58</age>
      <prof>driver</prof>
    </student>
  </list>
  `;
const xmlDOM = parser.parseFromString(xmlString, "text/xml");
const studentNodes = xmlDOM.querySelectorAll("student");

let studentList = [];
for (const studentNode of studentNodes) {
  const studentNameNode = studentNode.querySelector("name");
  const studentNamelangAttr = studentNameNode.getAttribute("lang");
  const studentFirstNameNode = studentNameNode.querySelector("first");
  const studentSecondNameNode = studentNameNode.querySelector("second");
  const studentAgeNode = studentNode.querySelector("age");
  const studentProfName = studentNode.querySelector("prof");
  const student = {
    name: `${studentFirstNameNode.textContent} ${studentSecondNameNode.textContent}`,
    age: Number(studentAgeNode.textContent),
    prof: studentProfName.textContent,
    lang: studentNamelangAttr,
  };
  studentList.push(student);
};

const result = {
  list:studentList, 
};


console.log("result", result);
