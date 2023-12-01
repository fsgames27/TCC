const songName = document.getElementById('SongName')
const bandname = document.getElementById('Band-name')
const song = document.getElementById('audio');
const play = document.getElementById('play')
const cover = document.getElementById('cover')
const next = document.getElementById('avançar')
const previous = document.getElementById('Voltar')
const barra = document.getElementById('barrinha_que_anda')
const barraoAndante = document.getElementById('BARRAO')
const shufflerbtn = document.getElementById('shuffler')
const repeatBtn = document.getElementById('Repetir')
const songTime = document.getElementById('song-time')
const totalTime = document.getElementById('Total-time')
const likeButtom = document.getElementById('like')



//Apresentar os dados no player
const trueDamege = {
    songName : 'Giant',
    artist : 'True Damege',
    file : 'True_Damage',
    liked : false
};

const alceu = {
    songName : ' La Belle de Jou',
    artist : 'Alceu Valença',
    file : 'Alceu_Valença_ La_Belle_de_Jou',
    liked : false
};

const luizGonzaga = {
    songName : 'O Chéro Da Carolina',
    artist : 'Luiz Gonzaga',
    file : 'Luiz_Gonzaga_O_Chéro_Da_Carolina',
    liked : false 
};

 const originplaylist = JSON.parse(localStorage.getItem('playlist'))?? [trueDamege,alceu,luizGonzaga];
 let sortedPlalist = [...originplaylist];
 let index = 0;

 function looadsong(){
    cover.src = `img/${sortedPlalist[index].file}.jpg`;
    song.src = `songs/${sortedPlalist[index].file}.mp3`;
    songName.innerText = sortedPlalist[index].songName;
    bandname.innerText = sortedPlalist[index].artist;
    likeButtomRender();
  
    
    


 }

 looadsong();
//fim


// Funcionamento do btn play
let isPlaying = false;

function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle');
    play.querySelector('.bi').classList.add('bi-pause-circle');
    song.play();
    isPlaying = true;

}

function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle');
    play.querySelector('.bi').classList.remove('bi-pause-circle');
    song.pause();
    isPlaying = false;

}

function PlayerPauserDecider(){
    if(isPlaying === true) {
        pauseSong();
    }else {
        playSong();
    }
}
play.addEventListener('click',PlayerPauserDecider)
//Final


//Função de avançar e retroceder player
previous.addEventListener('click',previousSong)
next.addEventListener('click',NextSong)

function previousSong(){
    if(index === 0){
        index = sortedPlalist.length -1;
    } else{
        index-=1;
    }
    looadsong();
    playSong();
}

function NextSong(){
    if(index === sortedPlalist.length - 1){
            index = 0
    } else{
        index += 1;
    }
    looadsong();
    playSong();
}

//FIM


//Barrinha de Progreçao da musica
barraoAndante.addEventListener('click', jumpTo);
song.addEventListener('timeupdate', updateProgress);

function updateProgress(){

    const barWidth =(song.currentTime/song.duration)*100;
    barrinha_que_anda.style.setProperty('--progress', `${barWidth}%`)
    songTime.innerText = to00m00s(song.currentTime);
}


function jumpTo(event){
    const width = barraoAndante.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)*song.duration; 
    song.currentTime = jumpToTime;

}
//fim

//Embaralhamento da playelist
let isShuffler = false;
shufflerbtn.addEventListener("click",shufflerBtnClick)

function suffleArray(preShuffArray){
    let size = preShuffArray.length;
    let currentIndex = size - 1; 
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random()*size)
        let aux = preShuffArray[currentIndex];
        preShuffArray[currentIndex] = preShuffArray[randomIndex];
        preShuffArray[randomIndex] = aux;
        currentIndex -=1;


    }

}

function shufflerBtnClick(){
    if(isShuffler === false){
        isShuffler = true;
        suffleArray(sortedPlalist);
        shufflerbtn.classList.add('btn-active')
    } else{
        isShuffler = false;
        suffleArray(...originplaylist);
        shufflerbtn.classList.remove('btn-active')
    }
}
//fim


//repetidor
let repeaton = false
song.addEventListener('ended' ,nextOrRepeat)
repeatBtn.addEventListener('click',repeatBtnclicked)

function nextOrRepeat(){
    if(repeaton === false){
        NextSong();
        repeatBtn.classList.add('btn-active')
    } else{
        playSong();
        repeatBtn.classList.remove('btn-active')
    }
}

function repeatBtnclicked(){
    if(repeaton === false) {
        repeaton = true;
        repeatBtn.classList.add('btn-active')
    }else{
        repeaton === false;
        repeatBtn.classList.remove('btn-active')
    }
    }

//fim

//contagem do tempo da musica (Song-time)
 
song.addEventListener('loadedmetadata', updateTotalTime)

function updateCurrentTime(){
    songTime.innerText = to00m00s(song.currentTime);
}

function updateTotalTime(){
    
    totalTime.innerText = to00m00s(song.duration);
}

function to00m00s(originalNumber){
    let hours = Math.floor(originalNumber/3600);
    let min = Math.floor((originalNumber - hours * 3600)/60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return ` ${min.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
}
//fim

// Btn coraçaozinho
function likeButtomRender(){
    if(sortedPlalist[index].liked === true){
        likeButtom.querySelector('.bi').classList.remove('bi-heart');
        likeButtom.querySelector('.bi').classList.add('bi-hearts');
        likeButtom.classList.add('coraçãozinho');
    }else{
        likeButtom.querySelector('.bi').classList.add('bi-heart');
        likeButtom.querySelector('.bi').classList.remove('bi-hearts');
        likeButtom.classList.remove('coraçãozinho');
    }
}

likeButtom.addEventListener('click',likeBtnclicked)

function likeBtnclicked(){
    if(sortedPlalist[index].liked === false){
        sortedPlalist[index].liked = true;
    } else{
        sortedPlalist[index].liked = false;
    }
    likeButtomRender();
    localStorage.setItem('playlist', JSON.stringify(originplaylist));
   
}