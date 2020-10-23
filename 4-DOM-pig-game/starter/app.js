/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,roundScore, activePlayer, oldDice, dice,isGamePlaying

init()

document.querySelector('.btn-roll').addEventListener('click',function()
{  if(isGamePlaying)
    {
        
        dice = Math.floor(Math.random() * 6) + 1
        console.log(oldDice,dice)
        
        var diceDOM = document.querySelector('.dice')
        
        diceDOM.style.display = 'block'
        diceDOM.src = 'dice-'+ dice + '.png'
        if(oldDice === 6 && dice ===6)
        {
            scores[activePlayer] = 0
            document.getElementById('score-' + activePlayer).textContent = '0'
            switchToNextPlayer();
        }   
        else if(dice !== 1 )
        {
            roundScore += dice
            document.getElementById('current-'+ activePlayer).textContent = roundScore
        }
        
        else{
            switchToNextPlayer() 
        }
        oldDice = dice
    }
})
var winScore

document.querySelector('.btn-hold').addEventListener('click', function(){
  if(isGamePlaying)
  {
    scores[activePlayer] += roundScore

    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]

    var inputScore = document.querySelector('.final-score').value

    if(inputScore)
    {
        winScore = inputScore
    }
    else
    {
        winScore = 100
    }
     
    if(scores[activePlayer] > winScore)
    {
        document.getElementById('name-' + activePlayer).textContent  = 'WINNER !' 
        document.querySelector('.dice').style.display = 'none'
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
        isGamePlaying = false
    }

    else{
          
        switchToNextPlayer()
    }

  }
})


function switchToNextPlayer()
{
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    
    document.querySelector('.dice').style.display = 'none'
}

document.querySelector('.btn-new').addEventListener('click',init)

function init()
{
    scores = [0,0]
    roundScore = 0
    activePlayer = 0
    isGamePlaying =true

    document.getElementById('score-0').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    
    document.querySelector('.dice').style.display = 'none'

    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')

    document.querySelector('.player-0-panel').classList.add('active')

}
/* 
var x = document.querySelector('#score-' + activePlayer).textContent
console.log(x) */
