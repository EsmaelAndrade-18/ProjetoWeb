// Liga a tag header ao código js
const header = document.querySelector('header');

// Liga a tag html ao código js
const html = document.querySelector('html');

// Liga a tag modo ao código js
const modo = document.querySelector('#modo');

// monitora o evento de scroll pelo no html
window.addEventListener('scroll', () => {

    //se a posição do scroll for maior que zero: 
    //adiciona ao elemento header a classe evento_header_scroll
    //senao: remove do elemento header a classe evento_header_scroll
    if(window.scrollY > 0){
        header.classList.add('evento_header_scroll');
    }else{
        header.classList.remove('evento_header_scroll');
    }
})


//monitora o evento de click do botao modo para fazer a troca entre as classes
//para trocar entre o modo escuro e o mode clara
modo.addEventListener('click', () => {
    
    //alterna a cor do botao modo
    modo.classList.toggle('claro');

    //se SE O ATRIBUTO modo for igual a claro: 
    //troca para escuro e vice-versa
    if(html.getAttribute('modo') === 'claro'){
        html.setAttribute('modo', 'escuro');
        localStorage.setItem('modo', 'escuro'); // armazena a escolha do usuário
    }else if(html.getAttribute('modo') === 'escuro'){
        html.setAttribute('modo', 'claro');
        localStorage.setItem('modo', 'claro'); // armazena a escolha do usuário
    }
})
// verifica se o modo foi armazenado no localStorage
const modoArmazenado = localStorage.getItem('modo');
if (modoArmazenado) {
    html.setAttribute('modo', modoArmazenado); // aplica a escolha do usuário em todas as páginas
}