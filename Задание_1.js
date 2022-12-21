// 9.2. JSON vs XML Задание 1.

// Исходные данные

let xmlString = `
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

const parser = new DOMParser();

// Преобразование строки в массив записей

xmlString = xmlString.replace("<list>","");
xmlString = xmlString.replace("</list>","");
let arrXmlString = xmlString.split("</student>", 2);

let n = 0;
let list = [];

// Перебор массива

arrXmlString.forEach(function(string) {
  string = string + "</student>";
  
  // Парсинг XML
  
  const xmlDOM = parser.parseFromString(string, "text/xml");

  // DOMnodes

  const nameNode = xmlDOM.querySelector("name");
  const firstNode = nameNode.querySelector("first");
  const secondNode = nameNode.querySelector("second");
  const ageNode = xmlDOM.querySelector("age");
  const profNode = xmlDOM.querySelector("prof");

  // Данные из атрибутов

  const langAttr = nameNode.getAttribute('lang');
  
  // Консолидированный объект

  list[n] = {
    name: firstNode.textContent + " " + secondNode.textContent,
    age: ageNode.textContent,
    prof: profNode.textContent,
    lang: langAttr,
  };
  
  n++;
});

result = {list};
console.log(result);
