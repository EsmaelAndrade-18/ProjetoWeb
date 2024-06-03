import mysql from "mysql"

const BD = mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"",
    database:"projetweb"
})

BD.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log('MYQL Conexão realizada com sucesso')
    }
})
export default BD;