var stars = document.querySelectorAll(".star-icon");

      document.addEventListener("click", function (e) {
        let classStar = e.target;
        /* console.log(classStar) */
        if (!classStar.classList.contains("ativo")) {
            let removeClass = document.querySelector('.ativo')
            removeClass.classList.remove('ativo')
            classStar.classList.add('ativo');            
        }
    });