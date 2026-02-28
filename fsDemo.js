// import fs, { writeFile } from 'fs'
import fs from 'fs/promises'

// fs.readFile ('./test.txt', 'utf8', (err, data)=> {
 //   if (err) throw err;
    // console.log(data);
// });

// readFileSync() - synchronous version

// const data = fs.readFileSync('./test.txt', 'utf8')
// console.log(data)

//readFile()-Promise .then()

fs.readFile ('./test.txt', 'utf8')
.then((data) => console.log(data))
.catch ((err) => console.log(err));


//readFile()-Promist asyn/wait

const readFile = async () => {
    try{
        const data = await fs.readFile('./test.txt', 'utf8');
        console.log(data)
    } catch (error) {
        console.log(error)
    }
};

//

const writeFile = async ()=> {

    try { 
    await fs.writeFile('./test.txt', 'Hello, I am writing to this file');
    console.log('File wrotten to...');
    } catch (error) {
        console.log(error);
    }

};

// appendFile()

const appendFile = async () => {

    try {
    await fs.appendFile('./test.txt', '\ni am adding this text now');
    console.log('file appended to...')

} catch (error) {
    console.log(error)

}

};

writeFile();
appendFile();
readFile();