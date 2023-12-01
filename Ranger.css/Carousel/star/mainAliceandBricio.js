var star = document.querySelectorAll('.star-icon');

document.addEventListener("click", function (e){
    let classpicas = e.target;

    if(!classpicas.classList.contains('ativo')){
        let removepica = document.querySelector('.ativo')
        removepica.classList.remove('ativo')
        classpicas.classList.add('ativo');
    }
});