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
//InitBooks()

async function readBooks(){
    try{
        const data=await fs.readFile(file,'utf-8')
        const booksArray=JSON.parse(data)
        const books=booksArray.map(book=>new Book(book.name, book.type, book.borrowed))
        return books
    }
    catch(error){
        console.log(error.message);
        return null
    }
}

function print(...books) {
    for (let i = 0; i < books.length; i++) {
        console.log(books[i].toString());
    }
}
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

module.exports={Book,borrowBook:borrow,printBook:print,InitBooks,readBooks}








