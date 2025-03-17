class User{
    id;
    name;
    type;
    borrowed;
    static count=0;
    constructor(name, type, borrowed) {
        this.id = User.count++;
        this.name = name;
        this.type = type;
        this.borrowed = borrowed;
    } 

    toString() {
    return `id: ${this.id}, name:${this.name}, type: ${this.type}, borrowed:${this.borrowed}`
}
}

let users2 = [
    new User('noa', 'drama', 'no'),
    new User('tzipi', 'exciting', 'no'),
    new User('yael', 'tension', 'no')
]
const fs = require('fs');
const file = './users.json';
function InitUsers(){
    const data=JSON.stringify(users2,null,2)
    fs.writeFileSync(file,data)
    console.log('Users data has been saved to books.json')
}
//InitUsers()

function readUsers(){
    try{
        const data=fs.readFileSync(file,'utf-8')
        const usersArray=JSON.parse(data)
        return usersArray
    }
    catch(error){
        console.log(error.message);
        return null
    }
}


function print() {
    const users=readUsers()
    for (let i = 0; i < users.length; i++) {
        console.log(
            `ID: ${users[i].id}, Name: ${users[i].name}, Favorite Type: ${users[i].type}, Borrowed: ${users[i].borrowed}`
        );
    }
}
function borrow(id){
    const users=readUsers()

    try{
        u=users.find(x=>x.id==id)
        if(u!=null)
          return u
        else 
         throw new Error ("errorUser")    
    }
    catch(error){
        console.log(error.message)
         return null
    }

}



module.exports={User,borrowUser:borrow,printUser:print,InitUsers}










