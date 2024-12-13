import mysql from 'mysql2/promise';




const connection1 = async function () {
 const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0710199607Qwer!',
  });

  console.log('Connected!');
  await connection.query('CREATE DATABASE IF NOT EXISTS BaseForLearning');
  await connection.query('USE BaseForLearning');
  await connection.query(`CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL
  );`
  );
  
  await connection.query(`CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    checked VARCHAR(255) NOT NULL
  );`
  );



return connection
}
const connection = connection1()

export default connection 
