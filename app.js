
import express from "express"
import bodyParser from "body-parser";
import BD from "./BD/Base de Dados.js"
const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/login', (req, res) => {
  res.render('login')
})
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let sql = `select * from cadastro where email='${email}' and password='${password}'`;
  BD.query(sql, (err, result) => {
    if (err) return console.log("credencias nao encontradas");

    if (result.length > 0) {
      id_usuario = result[0].id;
      console.log("Usuario logado com sucesso")
      res.render('index',{usuario:result});
    } else {
      console.log("Não exite esse usuario porfavor se cadastre");
      res.render('cadastro');
    }
  });
});
app.get('/cadastro', (req, res) => {
  res.render('cadastro')
})
let id_usuario
app.post('/register', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const sql = `insert into cadastro (email,password) values ('${email}','${password}')`
  BD.query(sql, (erro, result) => {
    if (erro)
      console.log(erro)
    else {
      const sql2 = `select * from cadastro where email='${email}' and password='${password}'`
      BD.query(sql2, function (erro, result) {
        if (erro)
          console.log(erro)
        id_usuario = result[0].id
      })
    }
  })
  res.render('login')
})
app.get('/cadastro/upgrade', (req, res) => {
  res.render('actualiza')
})
app.post('/upgrade', (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
  const sql = `update cadastro set email='${email}', password='${senha}' where id=${id_usuario}`;
  BD.query(sql, (err, result) => {
    if (err) console.log(err);
    else {
      console.log("Usuario atualizado com sucesso");
      res.render('index');
    }
  });
});
app.get('/cadastro/delete', (req, res) => {
  res.render('deletar')
})
app.post('/delete', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sql = `delete from cadastro where email='${email}' and password='${password}'`;
  BD.query(sql, (err, result) => {
    if (err) console.log(err);
    if(email == email && password == password){
      console.log("Usuario deletado com sucesso");
      res.render('index');
    }
    else {
      console.log("Palavra passe e email invalido");
    
    }
  });
});
const isLoggedIn = (req, res, next) => {
  if (!id_usuario) {
    return res.redirect('/login');
  }
  next();
};

app.get('/pergunta', isLoggedIn, (req, res) => {
  res.render('perguntas');
});

app.post('/pergunta', isLoggedIn, (req, res) => {
  const perg = req.body.perg;
  const sql = `insert into pergunta (id_usuario,perg) values ('${id_usuario}','${perg}')`;
  BD.query(sql, (erro, result) => {
    if (erro) console.log(erro);
  });
  res.render('index');
});
app.get('/pergunta/upgrade', (req, res) => {
  res.render('upgradeperg')
})
app.post('/pergunta/upgrade', (req, res) => {
  const perg = req.body.perg;
  const sql = `update pergunta set perg='${perg}' where id=${id_usuario}`;
  BD.query(sql, (err, result) => {
    if (err) console.log(err);
    else {
      console.log("Atualizadas com sucesso");
      res.render('index');
    }
  });
});
app.get('/pergunta/delete', (req, res) => {
  res.render('deleteperg')
})
app.post('/pergunta/delete', (req, res) => {
  const perg = req.body.perg;
  const sql = `delete from pergunta  where perg='${perg}'`;
  BD.query(sql, (err, result) => {
    if (err) console.log(err);
    else {
      console.log("pergunta deletado com sucesso");
      res.render('index');
    }
  });
});

app.get('/comentario', isLoggedIn, (req, res) => {
  res.render('comentario');
});

app.post('/comentario', isLoggedIn, (req, res) => {
  const  coment = req.body.coment;
  const sql = `insert into comentario (id_usuario,coment) values ('${id_usuario}','${coment}')`;
  BD.query(sql, (erro, result) => {
    if (erro) console.log(erro);
 
  });
  res.render('index');
});
app.get('/comentario/upgrade', (req, res) => {
  res.render('updatecoment')
})
app.post('/coment/upgrade', (req, res) => {
  const coment = req.body.coment;
  const sql = `update comentario set coment='${coment}' where id=${id_usuario}`;
  BD.query(sql, (err, result) => {
    if (err) console.log(err);
    else {
      console.log("Atualizadas com sucesso");
      res.render('index');
    }
  });
});
app.get('/comentario/delete', (req, res) => {
  res.render('deletecoment')
})
app.post('/coment/delete', (req, res) => {
  const coment = req.body.coment;
  const sql = `delete from comentario where coment='${coment}'`;
  BD.query(sql, (err, result) => {
    if (err) console.log(err);
    else {
      console.log("Comentario deletado com sucesso");
      res.render('index');
    }
  });
});
app.get('/leideboyle', (req, res) => {
  res.render('leideboyle')
})
app.get('/leidecharles', (req, res) => {
  res.render('leidecharles')
})
app.get('/leidegaylussac', (req, res) => {
  res.render('leidegaylussac')
})
app.listen(4000, () => {
  console.log("servidor rodando no endereco http://localhost:" + 4000)
})