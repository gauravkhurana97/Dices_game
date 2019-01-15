/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// var score1=0;
// var score2=0;

var scores=[0,0];
var round_score=0;
var activePLayer=0;
var gamestatus;
var dice1;
var dice2;
var pastvalue_dice;

init();

function hide_dice()
{
document.getElementById('dice_1').style.display="none";
document.getElementById('dice_2').style.display="none";
}

function init()
{

    scores=[0,0];
    round_score=0;
    activePLayer=0;
    gamestatus="playing";
    document.getElementById("score-0").textContent=0;
    document.getElementById("score-1").textContent=0;
    document.getElementById("current-0").textContent=0;
    document.getElementById("current-1").textContent=0;
    document.querySelector(`#name-0`).textContent="Player 1";
    document.querySelector(`#name-1`).textContent="Player 2";

    document.querySelector('.player-0-panel').classList.remove("winner");
    document.querySelector('.player-1-panel').classList.remove("winner");
    document.querySelector('.player-0-panel').classList.remove("active");
    document.querySelector('.player-0-panel').classList.add("active");
    document.querySelector('.player-1-panel').classList.remove("active");
    hide_dice();
}



document.querySelector(".btn-roll").addEventListener("click",()=>{
    if(gamestatus === "playing"){
    dice1=Math.floor(Math.random()*6)+1;
    dice2=Math.floor(Math.random()*6)+1;
    document.getElementById('dice_1').style.display="block";
    document.getElementById('dice_2').style.display="block";
    document.getElementById('dice_1').src= "dice-" + dice1 + ".png";   
    document.getElementById('dice_2').src= "dice-" + dice2 + ".png";   
    
     
    
    if(dice1!==1 && dice2!==1){
        round_score+=dice1+dice2;
        document.querySelector(`#current-${activePLayer}`).textContent=round_score;
    }
    else{
        document.querySelector(`#current-${activePLayer}`).textContent=0;
        nextPlayer();
    }
}
})


document.querySelector(".btn-hold").addEventListener("click",()=>{

        scores[activePLayer]+=round_score;
        round_score=0;
        document.querySelector(`#current-${activePLayer}`).textContent=0;
        var input=document.querySelector(`#score-${activePLayer}`).textContent=scores[activePLayer];
        var input=document.querySelector(".final_score").value;
        
        var winning_score;

        if(input){
            winning_score=input;
        }else{
            winning_score=100;
        }

        if(scores[activePLayer] >= winning_score){

        document.querySelector(`#name-${activePLayer}`).textContent="Winner!";
        document.querySelector(`.player-${activePLayer}-panel`).classList.add("winner");
        document.querySelector(`.player-${activePLayer}-panel`).classList.remove("active");
        hide_dice();
        document.getElementById("current-0").textContent=0;
        document.getElementById("current-1").textContent=0;
            
        gamestatus=false;
        return;
        
        }else{
            nextPlayer();
    }

})

function nextPlayer(){
    activePLayer===0?activePLayer=1:activePLayer=0;

        round_score=0;
        
        document.querySelector(`.player-0-panel`).classList.toggle("active");
        document.querySelector(`.player-1-panel`).classList.toggle("active");
        hide_dice();
    }

document.querySelector('.btn-new').addEventListener("click",init);

