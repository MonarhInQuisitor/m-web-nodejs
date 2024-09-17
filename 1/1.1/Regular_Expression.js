function Validator() {
        //check a validation of  an email address
  this.validateEmail = function (text) {
    return /^[\da-zA-Z][\da-zA-Z+-\.]{1,19}@[\w\.\!\$\%\&\'\*\+\/\=\?\^\-]{1,15}\.[a-zA-Z]{1,5}$/g.test(
      text
    );
  };  //check a validation  of a phone number
  this.validatePhone = function (text) {
    if (text.length <= 25) {
      return /^[- ]*(\+([- ]*\d){2})?[- ]*\(?([- ]*\d){3}\)?([- ]*\d){7}[- ]{0,}?$/g.test(
        text
      );
    } else return false;
  };   //check a validation of  a password
  this.validatePassword = function (text) {
   return  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)\w{8,}$/.test(text);
};
}
//
let validator = new Validator();
//console.log(validator.validateEmail("qwertyuio++++++fghjk@/''''a.ended"))
//console.log(validator.validateEmail("firstpart@.se.enddeded"))
//console.log(validator.validatePhone("+48 (099) 567 8901"));
//console.log(validator.validatePassword("no_nu1Ters"));
/*first-part@.se=cond@part.end
-firstpart@.se=cond%.enddeded
firs_tpart@.se.en

firstpart@.se.enddeded*/
const emails = [
    /* Valid */
    "firstpart@secondpart.end", "fi@secondpart.end", "first-part@.se=cond%p.art.end", "first.part@se=cond%part.r",
    /* Invalid */
 "f@secondart.end", "first-part@.se=cond@part.end",  "-firstpart@.se=cond%.enddeded", "firs_tpart@.se.en", "firstpart@.se.enddeded"
];
const phones = [
    /* Valid */
    "+38 (099) 567 8901",   "+38 099 5 6 7 8 9  01",  "(09-9) 567-890-1",  "--  (099) 567 890-1",
    /* Invalid */
    "+38 (099) 567 8901 0", "+38 099 a0000000", "38 (0989) 567 8901",  "+48 (0989) 567 8901"
];

const passwords = [
    /* Valid */
    "C00l_Pass",  "SupperPas1",
    /* Invalid */
    "Cool_pass",  "C00l"
];
emails.forEach(el=>console.log(validator.validateEmail(el)))
console.log("-------------------")
phones.forEach(el=>console.log(validator.validatePhone(el)))
console.log("-------------------")
passwords.forEach(el=>console.log(validator.validatePassword(el)))
