let i = 0;

function direcao(e){
    var direcao = document.getElementById("slide");

    if(e == 1){
        //esquerda

        direcao.scrollLeft = direcao.scrollLeft - 200;
    } else if(e == 2){
        //direita
       
        let controle = document.querySelectorAll('.block').length;
        
        if (controle > 12) {

            if(i > 12) {
                i = 0;
            }
            const list = document.getElementById("slide");
            list.removeChild(list.firstElementChild);

            const div = document.createElement('div');
            div.className = 'block';
            const a = document.createElement('a');
            const img = document.createElement('img');
            
            a.appendChild(img);
            img.src = `img/foto${i+1}.jpg`;
            div.appendChild(a);
            
            const carousel = document.querySelector('#slide');
            carousel.appendChild(div);

            

            direcao.scrollLeft = direcao.scrollLeft + 200;
            i = i + 1;
            console.log(i)


        }else {
            const div = document.createElement('div');
            div.className = 'block';
            const a = document.createElement('a');
            const img = document.createElement('img');
            
            a.appendChild(img);
            img.src = `img/foto${controle+1}.jpg`;
            div.appendChild(a);
            
            const carousel = document.querySelector('#slide');
            carousel.appendChild(div);

            

            direcao.scrollLeft = direcao.scrollLeft + 200;
            controle++;
        }

        
    }
}
