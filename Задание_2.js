// 9.2. JSON vs XML Задание 2.
// Исходные данные
let jsonStr = `
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
// Парсинг JSON
let data = JSON.parse(jsonStr);
console.log(data);
