function botaoNotas(){
    const botaoMais = document.querySelector('#div-nova-notas');
    const divCadastro = document.querySelector('#div-cadastro');
    botaoMais.addEventListener('click', function(){
    divCadastro.style.display = 'block';
})
}
botaoNotas();
function salvaNota(){
    
    const urlserver = 'http://192.168.100.8:8800/notas';
    const formulario = document.querySelector('form');
    formulario.addEventListener('submit', function(e){
        e.preventDefault();

        const formData = new FormData(formulario);
        console.log(formData);
        const objForm = Object.fromEntries(formData.entries());
        const user = localStorage.getItem("autor");
        console.log(user);
        
        axios.post(urlserver, {
            materia:objForm.materia,
            autor:user,
            conteudo:objForm.conteudo
        })
        .then(()=>{
            alert('Nota criada com sucesso')
            document.querySelector('#div-cadastro').style.display='none';
        })
        .catch((error)=>alert("Erro na nota"));

    })
    
}
salvaNota();
