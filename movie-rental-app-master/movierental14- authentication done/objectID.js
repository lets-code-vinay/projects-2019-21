// // objectID--
//   while we save any object id is saved in 24 characters id
//   like  _id: 5a72552qb85437957541e6a
                //this id is not created bby mongodb it is created by mongodb driver
//   24 characters
//   2 characters = 1 byte
//   12 byte
//   fisrt 4 bytes - time stamps
//   next 3 bytes : machine identifier
//   next 2 bytes: process identifier
//   last 2 bytes: counter

// 1 byte= 8bit
// bit= 0,1
// 2^8 = 256 == in one byte we store 256 numbers
// how many number can be store in 3 bytes == 2 ^ 24 = 16M


//Driver => MongoDB
// this is mongodb is highly scalable
// Driver creates any id using above bytes(parts)

// To know object id
const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();
console.log("here is the id"+" "  +id);

//To know time stamp
console.log(id.getTimestamp())  //another format
console.log("Here is the timestamp",""+ id.getTimestamp());
 //To know id valid or not
const isValid = mongoose.Types.ObjectId.isValid('5ea6a5a0cc221ddc') //any random input
console.log(isValid)
