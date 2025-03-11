const {borrowBook,printBook,InitBooks,readBooks}=require('./books')
const {borrowUser,printUser,InitUsers}=require('./users')

const [, ,codeUser,codeBook] = process.argv;

//InitUsers()
/*InitBooks()
    .then(() => console.log('InitBooks started'))
    .catch(error => console.error('Error in initBooks:', error.message))*/
    
    readBooks().then(()=>b=borrowBook(codeBook))
    .then(()=>u=borrowUser(codeUser))

console.log(u);
console.log(b);

if(b.type!==u.type&&b.borrowed=='no'&&u.borrowed=='no')
   {
      b.borrowed='yes';
      u.borrowed='yes';
      console.log("success");
   }
   else
      console.log("failure");
      
      console.log(u);
      console.log(b);
   



