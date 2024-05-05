import { parse } from "json2csv";
import * as fs from "fs";

// Sample JSON data
const jsonData = [
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "Los Angeles" },
  { name: "Doe", age: 40, city: "Chicago" },
];

// Convert JSON to CSV
const csvData = parse(jsonData);

// Write CSV data to file
fs.writeFileSync("output.csv", csvData);

console.log("CSV file created successfully.");
