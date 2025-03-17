const {borrowBook,printBook,InitBooks,readBooks}=require('./books')
const {borrowUser,printUser,InitUsers}=require('./users')

const main = async () => {
const [, ,codeUser,codeBook] = process.argv;

//InitUsers()
/*InitBooks()*/
   printUser()
   await printBook()

   const b=await borrowBook(Number(codeBook))
   const u=borrowUser(Number(codeUser))

if(b.type!==u.type&&b.borrowed=='no'&&u.borrowed=='no')
   {
      b.borrowed='yes';
      u.borrowed='yes';
      console.log("success");
   }
   else
      console.log("failure");
      

      console.log('trying wrong params')
      try {
         borrowBook(999);
       } catch (error) {
         console.error(error.message);
       }
       
       try {
         borrowUser(999);
       } catch (error) {
         console.error(error.message);
       }
}

main()