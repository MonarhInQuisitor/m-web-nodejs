"use strict";
// Є функція. Вона приймає якийсь об'єкт А, який має поля зі значеннями
// - або undefined
// - або об'єкт з одним полем cvalue, який
//     або undefined
//     або по типу рівний
//         або рядку,
//         або числу,
//         або посиланню на об'єкт за своєю структурою/описом подібний до описаного об'єкта А.
// ...Функція повинна повернути суму "значень" поля cvalue всіх полів об'єкта, до того ж,
// - якщо у чергового елемента поле сvalue - це число,
//   то просто додаємо це число.
// - якщо у чергового елемента поле сvalue - це рядок,
//   то просто конвертуємо рядок у число і додаємо.
// - якщо у чергового елемента поле cvalue - це об'єкт подібний до кореневого,
//   то додаємо суму його полів (привіт рекурсія)
// - якщо ми натикаємося на undefined, або якщо cvalue був рядком який за фактом не був адекватним числом -
// тоді значенням буде 2022.
function summ(a) {
    console.log(a);
    const x = Object.keys(a).map((k) => {
        const elem = a[k];
        if (typeof elem === "undefined")
            return 2022;
        if (typeof elem.cvalue === 'string')
            return +elem.cvalue || 2022;
        if (typeof elem.cvalue === "object")
            return summ(elem.cvalue);
        return elem.cvalue || 2022;
    });
    let sum = 0;
    console.log(x);
    for (let i = 0; i < x.length; i++) {
        sum += x[i];
        console.log(sum);
    }
    return sum;
}
console.log(summ({ hello: { cvalue: 1 }, world: { cvalue: { yay: { cvalue: "2" } } } }));
// Успіхів знайти всі баги!
// Тут може бути найпростіше все з нуля написати, але завдання не про це.
// А про те, як знаходити помилки, не напружуючись.
// І про type narrowing:
// - про guards: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards
// - про truthiness narrowing: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#truthiness-narrowing
// - про control flow analysis: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#control-flow-analysis
// Дайте знати @roman про результати.
