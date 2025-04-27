let visitCount = 0;  // מספר הביקורים
let requestList = [];  // רשימת הבקשות

// יצירת שרת
const http = require('http'); // לא לשכוח לייבא את המודול http

const server = http.createServer((req, res) => {
    const method = req.method; // שיטת הבקשה (GET, POST, וכו')
    const path = req.url; // הנתיב (URL) של הבקשה

    // אם הכתובת היא /request, נחזיר את מספר הביקורים
    if (path === '/request') {
        visitCount++; // הגדלת מספר הביקורים
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' }); // הגדרת כותרות התגובה
        res.end(JSON.stringify({
            message: `מספר הביקורים בשרת: ${visitCount}`, // הדפסת מספר הביקורים
            requestHistory: requestList // החזרת היסטוריית הבקשות
        }));
    } else {
        // אחרת, נרשום את הבקשה ונדפיס את המענה
        requestList.push({ method, path }); // שמירת הבקשה ברשימה
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); // הגדרת כותרות התגובה
        res.end(`ברוך הבא לאתר שלנו! הפעלת מתודת ${method} לכתובת ${path}`); // שליחת תגובה עם מידע על הבקשה
    }
});

// הפעלת השרת בכתובת http://localhost:5050
server.listen(5050, () => {
    console.log('server is running at http://localhost:5050');
});
