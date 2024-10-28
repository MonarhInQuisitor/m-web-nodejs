"use strict";
//1--------------------------------------------------
/*
        fetch("https://api.ipify.org?format=json")
        .then(resp=>resp.json())
        .then(resp=> console.log( resp ))
        .catch(error=>console.log(error))
       */
//2--------------------------------------------------------------
/*
async function getID() : Promise<undefined> {
 await fetch("https://api.ipify.org?format=json")
    .then(resp=>resp.json())
    .then(resp=>console.log(resp.ip))
    .catch(error=>console.log(error))
}
getID()
*/
//3.1-----------------------------------------------------------------
/*
 async function getName():Promise<string>{
  return  await fetch("https://random-data-api.com/api/name/random_name")
    .then(resp=>resp.json())
    .then(resp=>resp.name)
    .catch(()=>"error")
 }

async function getNames(){
 const names = await Promise.all([getName(),getName(),getName()])
 names.forEach(name=>console.log(name))
}
getNames()
*/
//3.2-----------------------------------------------------------------
/*
async function getName():Promise<string>{
return  await fetch("https://random-data-api.com/api/name/random_name")
.then(resp=>resp.json())
.then(resp=>resp.name)
.catch(()=>"error")

}
async function getNames(){
    const names = [getName(),getName(), getName()]
    names.forEach(name=>name.then(el=>console.log(el)))
}
getNames()
*/
//3.3-----------------------------------------------------------------
/*
function getName() : Promise<string>{
   return  fetch("https://random-data-api.com/api/name/random_name")
    .then(resp=>resp.json())
    .then(resp=>resp.name)
    .catch(()=>"error")
}

function getNames(){
const arrPr : Promise<string>[]= [getName(),getName(),getName()]
let arr =  arrPr.map(el=>el.then(el=>console.log(el)))
}
getNames()
*/
//4.1-----------------------------------------------------------------
let counter = 0;
function woman() {
    counter++;
    console.log(counter);
    return fetch("https://random-data-api.com/api/users/random_user")
        .then(resp => resp.json())
        .then(resp => {
        console.log(resp.gender);
        if (resp.gender === "Female") {
            return resp;
        }
        woman();
    }).catch(() => woman());
}
woman().then(resp => console.log(`  знайти жінку ${resp} зайняло ${counter} спроб`));
//4.2-----------------------------------------------------------------
/*
let counter = 0 ;
async function woman() :Promise<Record<string,any>>{
    counter++;
    try{
        const response =  await fetch("https://random-data-api.com/api/users/random_user")
        const woman=await response.json()
        if(woman.gender!=="Female"){
            return  woman()
        }
        return woman
    }catch(error){
      return woman()
    
    }
}
woman().then(resp=>console.log(`  знайти жінку ${resp.first_name} зайняло ${counter} спроб`))
*/
//5-------------------------------------------------------------------
/*
const IP : string="https://api.ipify.org?format=json"
async function f1(func:(ip:string)=>string) : Promise<string> {
  const response = await fetch(IP).then(rs=>rs.json()).then(rs=>rs.ip)
  return func(response)
}


async function f2():Promise<void>{
     const ip = await f1((ip:string)=>`ваше ip ${ip}`)
     console.log(ip)
}

f2()
*/
//6-------------------------------------------------------------------
/*
const IP : string="https://api.ipify.org?format=json"
async function f1() : Promise<string> {
    return await fetch(IP).then(rs=>rs.json()).then(rs=>rs.ip)
  }

  async function f2(func:(ip:string)=>string):Promise<void>{
      const ip =  await f1()
      console.log(func(ip))
  }
  f2((ip)=>`ваш іп ${ip}`)
  */ 
