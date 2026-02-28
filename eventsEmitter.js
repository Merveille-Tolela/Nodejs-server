import {eventEmitter} from 'events'

const myEmitter = new eventEmitter()

function greetHandler (name) {
    console.log('Hello World'+ name);
}

function goodbyeHandle(name) {
    console.log('Goodbye world');
}

// register event

myEmitter.on('greet', greetHandler);
myEmitter.on('goodbye', goodbyeHandle);


// Emit events

myEmitter.emit('greet','john');
myEmitter.emit('goodbye','john')