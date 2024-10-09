let obj={
    asd(){return 8},
    sum(x){return this.asd()+x
}}
let a=[1,2,3,4,5,6,7,8,8,9]
let b= "sdf"
let c= 45
let v ="sdfgf"
let n= "bmjk,kj."
function g(a,s,d,f,g){
    console.log(arguments)
    console.log("----------------------------------")
    console.log([].join.call(arguments))
    console.log("----------------------------------")
    console.log([...arguments].join())
    //let cd = ...arguments;
   // console.log(...arguments.join())
}
g(a,b,c,v,n)
//console.log(...a)
//console.log(a)
