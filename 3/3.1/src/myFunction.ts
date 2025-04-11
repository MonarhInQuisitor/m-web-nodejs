// Напишіть функцію, яка приймає:
// 1) Деякі дані умовного типу Т, але не з усіма полями
// 2) функцію-доповнювач, яка приймає такі штуки як із п.1,
//     а повертає повноцінний об'єкт типу Т
// ... як ви зрозуміли, саму функцію писати не треба:)
// нас цікавить лише її сигнатура.

function a <T>(date : Partial<T>,fn : (date1:Partial<T>)=>T):T
{return fn(date)}

type User = {
    id :string
    name: string;
    age: number;
  };
  

  function b(date:Partial<User>):User{
    if(!date.age)date.age = 32
    if(!date.name)date.name = "Ivan"
    if(!date.id)date.id = "0"

    return date as User
  }
 const user= a<User>({ name: "Olga"},b)
  console.log(user); // { name: 'Olga', age: 25 }


// Більш складний варіант:
// Напишіть функцію, яка приймає:
// 1) Деякі дані умовного типу Т (у якого поле id: string),
//    але можливо без поля id
// 2) функцію-доповнювач, яка приймає такі штуки як із п.1,
//     а повертає повноцінний об'єкт типу Т
// ... як ви зрозуміли, саму функцію писати не треба:)
// нас цікавить лише її сигнатура.


// Останнє завдання:
// Напишіть сигнатуру функції, що приймає
// - якийсь клас
// - кількість
// ...а повертає масив екземплярів цього класу

class Rectangle {
  w!: number;
  h!: number;
}
class Circle {
  radius!: number;
}

// Зробіть норм сигнатуру тут.
// НІ, Rectangle | Circle це не варіант, треба зробити універсальну функцію
function наштампувати<T>(SOMECLASS:new ()=>T, count:number):T[] {
  let a = []
  for (let i = 0; i < count; i++)
     a.push(new SOMECLASS());
 
  return a ;
}

let a1: Rectangle[] = наштампувати(Rectangle, 10);
let b1: Circle[] = наштампувати(Circle, 20)
console.log(a1)
