// 1. 

function getFirstWord(a : string) : number{
	return a.split(/ +/)[0].length;
}

// 2. 

function getUserNamings(a : {name : string, surname: string}) : {fullname : string,initials : string} {
  return { 
		fullname: a.name + " " + a.surname, 
		initials: a.name[0] + "." + a.surname[0] 
	};
}

// 3. 

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a : {products:[{name: string}] }  ) : string[] {
  return a?.products?.map(prod => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...
function hey(a : {name:any,cuteness? : number , coolness? : number}) :string{
    return "hey! i'm " + a.name();
}
hey({name: () => "roma", cuteness: 100})
hey({name: () => "vasya", coolness: 100})

// 4.2
abstract class Pet{
    #petName : string;;
    constructor(petName:string){
     this.#petName=petName
    }
    name():string{
        return this.#petName
    }
}
class Cat extends Pet{
    #speak:boolean
   constructor(petName:string,speak:boolean){
    super(petName)
    this.#speak=speak;
   }
}
class Dog extends Pet{
    #age:number
    constructor(petName:string,age : number){
     super(petName)
     this.#age=age
    }
 }
function hey1( abstractPet:Pet ) : string {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333)
hey1(a)
hey1(b)

// 4.3

function hey2(a:{name:any,type:string,cuteness?:number,coolness?:number}) : string {
    return "hey! i'm " + a.name()
		 + (a.type === "cat" ? ("cuteness: "+a.cuteness) : ("coolness: "+a.coolness))
}
hey2({name: () => "roma", type: "cat", cuteness: 100})
hey2({name: () => "vasya", type: "dog", coolness: 100})

// 5.

// google for Record type
function stringEntries(a:[]|Record<string,any>):string[]|Record<string,any> {
   return Array.isArray(a) ? a : Object.keys(a)
}

// 6.

// you don't know Promises and async/await yet. Or do you? 
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a:number) : Promise<string> {
    return "*".repeat(a)
}
const hello = async () => {
   return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))