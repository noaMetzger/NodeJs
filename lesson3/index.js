const fs = require("fs");
const colors = require("colors");
let products = fs.readFileSync("products.txt", "utf8");
products = products.split("\n");
const myColors = ["red", "yellow", "green", "white", "black"];
for (let i = 0; i < products.length; i++) {
  console.log(products[i][myColors[i]]);
}
colors.setTheme({
  myTheme: ["green", "underline"],
});
console.log("hello world".myTheme);