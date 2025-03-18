class Book{
    id;
    name;
    type;
    borrowed;
    static count=0;
    constructor(name, type, borrowed) {
        this.id = Book.count++;
        this.name = name;
        this.type = type;
        this.borrowed = borrowed;
    } 

    toString() {
    return `id: ${this.id}, name:${this.name}, type: ${this.type}, borrowed:${this.borrowed}`
}
}
let books2 = [
    new Book('lol', 'drama', 'no'),
    new Book('nana', 'exciting', 'no'),
    new Book('blu blu', 'tension', 'no')
]

const fs = require('fs').promises;
const file = './books.json';

async function InitBooks(){
    const data=JSON.stringify(books2,null,2)
    try{
      await fs.writeFile(file,data)  
      console.log('Books data has been saved to books.json')     
    }
    catch(err){
        console.log('error',err.message)     
    }

}

async function readBooks(){

    try{
        const data=await fs.readFile(file,'utf-8')
        const booksArray=JSON.parse(data)
        return booksArray
    }
    catch(error){
        console.log(error.message);
        return null
    }
}
// פונקציה לקריאת הנתונים מהקובץ עם callback
function print(cb) {
    fs.readFile("books.json", "utf8")
        .then((data) => {
            const booksData = JSON.parse(data);
            cb(null, booksData); 
        })
        .catch((error) => {
            cb(error, null); 
        });
}

// פונקציית callback שמטפלת בתוצאה
function printCB(error, books) {
    if (error) {
        console.error("Error reading books:", error);
    } else {
        console.log("Books data:", books);
    }
}

// async function print() {
//     const books=await readBooks()
//     for (let i = 0; i < books.length; i++) {
//         console.log(
//             `ID: ${books[i].id}, Name: ${books[i].name}, Favorite Type: ${books[i].type}, Borrowed: ${books[i].borrowed}`
//         );
//     }
// }
async function borrow(id){
    try{
        const books=await readBooks()
        b=books.find(x=>x.id==id)
        if(b!=null)
          return b
        else 
         throw new Error ("errorBook")    
    }
    catch(error){
        console.log(error.message)
        return null
    }
}

module.exports={Book,borrowBook:borrow,printBook:print,InitBooks,readBooks,cb:printCB}








