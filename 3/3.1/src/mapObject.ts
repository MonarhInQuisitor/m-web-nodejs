

function mapObject<I extends string|number|symbol,P>(
    object:Record<I,P>,
    fn: (value: P) => boolean
)   :Record<string,boolean>
{
    
 let newObject = Object.keys(object).reduce((acc,curr)=>{acc[curr]=fn(object[curr as I]);
    return acc;
 },{} as Record<string,boolean> )
     console.log(newObject)
    return newObject;
}
const object = { "roma" : 5, "vasya": 2 }

function int(int : number):boolean{
  return int > 2 
}

mapObject(object,int)

