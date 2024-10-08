"use strict"
console.log("this===module "+(this===module.exports))
//function asd(){return 7}
let a={
    asd(){return 8},
    sum(x){return this.asd()+x
}}


    function c(func){
        let count=0;
       // console.log("this===a1 "+(this===a))
     //   console.log(this)
return function(x){
    count++;
    console.log(count)
    console.log(this)
    console.log(func.call(this,x))
  //  console.log(func.call(this, 1))
  //  console.log(this.sum(x))
  console.log("this===a "+count+(this===a))

    let b =func.call(a,x)
   // console.log("this===a "+count+(this===a))
     return  b
    
       }
     }

a.sum=c(a.sum)

console.log(a.sum(1))
console.log("this===module "+(this===module.exports))

//console.log(b());

//console.log(a.a());
//console.log(this===module.exports);


