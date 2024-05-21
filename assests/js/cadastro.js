
function cadastro(){
    const urlserver = 'http://192.168.100.8:8800/cadastro';
    const formulario = document.querySelector('#form');
    formulario.addEventListener('submit', function(e){
        e.preventDefault();

        const formData = new FormData(formulario);
        console.log(formData);
        const objForm = Object.fromEntries(formData.entries());
        
        axios.post(urlserver, {
            nome:objForm.nome,
            email:objForm.email,
            matricula:objForm.matricula,
            senha:objForm.senha
        })
        .then(()=>{
            alert('Cadastro criado com sucesso')
            window.location.href = "./home.html";
        })
        .catch((error)=>alert("Erro no cadastro"));

    })
    
}
cadastro();
