const xlsx = require('xlsx');

class Book {
    id;
    name;
    type;
    borrowed;
    static count = 0;
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

async function InitBooks() {
    const data = JSON.stringify(books2, null, 2)
    try {
        await fs.writeFile(file, data)
        console.log('Books data has been saved to books.json')
    }
    catch (err) {
        console.log('error', err.message)
    }

}

async function readBooks() {

    try {
        const data = await fs.readFile(file, 'utf-8')
        const booksArray = JSON.parse(data)
        return booksArray
    }
    catch (error) {
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


const writeBooksToExcel = async (borrowed) => {
    const filePath = "Books.xlsx";
    let workbook;

    // נסיון לקרוא את הקובץ אם הוא קיים
    try {
        workbook = xlsx.readFile(filePath);  // אם הקובץ קיים, קרא אותו
    } catch (error) {
        workbook = xlsx.utils.book_new();  // אם לא קיים, צור חדש
    }

    const worksheet = xlsx.utils.json_to_sheet(borrowed);  // המרת הספרים לדף אקסל
    const sheetName = "books";  // שם הגיליון

    // אם כבר יש גיליון בשם 'books', עדכן אותו
    if (workbook.Sheets[sheetName]) {
        const existingData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        const updatedData = existingData.concat(borrowed);  // הוספת נתונים חדשים
        const updatedWorksheet = xlsx.utils.json_to_sheet(updatedData);
        workbook.Sheets[sheetName] = updatedWorksheet;  // עדכון הגיליון
    } else {
        // אם אין גיליון בשם 'books', הוסף חדש
        xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
    }

    // שמירה מחדש של הקובץ עם הנתונים המעודכנים
    xlsx.writeFile(workbook, filePath);
}

async function borrow(id, usId) {
    try {
        const books = await readBooks()
        b = books.find(x => x.id == id)
        if (b != null) {
            const borrowed = [{ userId: usId, bookId: id, date: new Date().toISOString() }]
            await writeBooksToExcel(borrowed)
            return b
        }
        else
            throw new Error("errorBook")
    }
    catch (error) {
        console.log(error.message)
        return null
    }
}

module.exports = { Book, borrowBook: borrow, printBook: print, InitBooks, readBooks, cb: printCB }








