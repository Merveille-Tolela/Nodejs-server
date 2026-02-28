import {createServer} from 'http';

const PORT = process.env.PORT

 const users = [
    { id: 1, name: 'john Doe'},
    { id: 2, name: 'jane Doe'},
    { id: 3, name: 'jim Doe'}
 ];

 // logger middleware

 const logger = (req, res, next) => {
     console.log(`${req.method} ${req.url}`);
    next();
 }

 //JSON middleware
const jsonMiddleware =(req,res, next)=> {
    res.setHeader('Content-Type', 'application/json');
    next();
} 

//Route handler for GET /api/user
const getUserHandler = (req, res) => {
    res.write(JSON.stringify(users));
    res.end(); 
}

//Route handler for GET /api/user/:id
const getUserByIdhandler = (req, res) => {
    const  id = req.url.split('/')[3];
    const user = users.find((user) => user.id === parseInt(id));

if (user) {
        res.write(JSON.stringify(user));
        
    } else {
        res.writeHead(404, {'Content-Type':'application/json'})
        res.write(JSON.stringify({message: 'User Not Found'}));
    }
    res.end();
}

const createUserHandle =(req, res) => {
    let body ='';
    //Listen for data
    req.on('data',(chunk)=> {
        body += chunk.toString();
    });

    req.on('end', ()=> {
        const newUser = JSON.parse(body);
        users.push(newUser)
        res.statusCode = 201;
        res.write(JSON.stringify(newUser));
        res.end();
    })
}

// Not found handle
const notFoundHandler =(req,res)=>{
    res.writeHead(404, {'Content-Type':'application/json'})
        res.write(JSON.stringify({message: 'Route not found'}));
        res.end();

}


 const server = createServer((req, res) => {
    logger(req,res, ()=> {

       jsonMiddleware(req,res, ()=> {
        if (req.url=== '/api/users' && req.method === 'GET'){
            getUserHandler(req,res);
        } else if (req.url.match(/^\/api\/users\/([0-9]+)$/) && req.method ==='GET'){
            getUserByIdhandler(req,res);
        } else if (req.url === '/api/users' && req.method === 'POST'){
            createUserHandle(req,res);

        }else {
            notFoundHandler(req,res);

        }
    });
       });

 });

 server.listen (PORT, () => {
    console.log (`Server running on port ${PORT}`)
 })