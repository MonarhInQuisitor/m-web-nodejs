const TEXT = `44.38,34.33,Алушта,3140040,\n49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575\n49.54,28.49,Бердичіва,8447575,
44.38,34.33,Вінниця,314403,\n49.46,30.17,Білая Церква,2001,
49.54,28.49,Бердичйййів,575\n49.54,28.49,Берд,8475,
44.38,34.33,Алуштавввввв,314403000,\n49.46,30.17,Білаяп Церква,299001,
44.38,34.33,Алуштавввв,31\n49.46,30.17,Білаяпк Церква,29900,\n #некоммен`
/**
 * 
 * @param {String} CSV text
 * @returns function that replace cities on new text
 */
function first(CSV) {
    let regExp = /^\d+\.\d+,\d+\.\d+,[\wа-яА-ЯіІїЇєЄ ]+,\d+,$/;
    let cities = CSV.split(/\n/).filter(el => el.match(regExp)).map(el => {
        let sub = el.split(",")
        return { x: sub.shift(), y: sub.shift(), name: sub.shift(), population: sub.shift() } // sub.shift() also return the element
    }).sort((a, b) => b.population - a.population).slice(0, 9).reduce((sum, curr, index) => {
        let name = curr.name
        sum[name] = { population: curr.population, rating: index + 1 };
        return sum
    }, {});
console.log(cities)
     
    return (text) => {
        let reg = new RegExp(Object.keys(cities).join('|'),"g") //regulat expresssion include names of all cities
        return text.replace(reg, (city) => {
            if (cities[city]) {
                return `Місто ${city} з населенням ${cities[city].population} осіб і рейтингом ${cities[city].rating}`;
            }
            //if a city doesn't be found will return just name of city
            return city;
        });
    }


}
console.log(first(TEXT)("Біла Церква чи Вінниця є найкращим містом?"))