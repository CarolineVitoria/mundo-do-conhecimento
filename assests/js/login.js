const user =[];
function login(){
    const urlserver = 'http://192.168.100.8:8800/login';
    const formulario = document.querySelector('form');
    
    formulario.addEventListener('submit', function(e){
        e.preventDefault();

        const formData = new FormData(formulario);
        console.log(formData);
        const objForm = Object.fromEntries(formData.entries());
        
        axios.post(urlserver, {
            email:objForm.email,
            senha:objForm.senha
        })
        .then((res)=>{
            salvaUser(res);
            user.push(res);
            console.log(user);
            alert(user);
            window.location.href = "./home.html";
            
        })
        .catch((error)=>alert("Erro no login"));

    })
    
}
login();

function salvaUser(res){
    console.log("uhu");
    console.log(user);
    localStorage.clear();
    localStorage.setItem("autor", res.data.usucod);
    console.log(localStorage.getItem("autor"));
    
}
function salvaNota(){
    const urlserver = 'http://192.168.100.8:8800/cadastro';
    const formulario = document.querySelector('#formNotas');
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
export default user;