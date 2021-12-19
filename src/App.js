import './App.css';
import {useState,useEffect} from 'react'
import SingleCard from './Component/SingleCard';


//inital array
const imageData=[
  {src:'img/sword-1.png',matched:false},
  {src:'img/helmet-1.png',matched:false},
  {src:'img/potion-1.png',matched:false},
  {src:'img/ring-1.png',matched:false},
  {src:'img/scroll-1.png',matched:false},
  {src:'img/shield-1.png',matched:false}
]

function App() {
  const [cards,setCards]=useState(null)
  const [turns,setTurns]=useState(0)
  const [choiceOne,setChoiceOne]=useState(null)
  const [choiceTwo,setChoiceTwo]=useState(null)
  const [flipped,setFlipped]=useState(false)
  const [disabled,setDisabled]=useState(false)


  //create a new random sorted array and reset states
  const arraySort=()=>{
    const shuffledArray=([...imageData,...imageData]).sort(()=>Math.random()-0.5).map(eachCard=>({...eachCard,id:Math.random()}))
    setCards(shuffledArray)
    setTurns(0)
    setChoiceOne(null)
    setChoiceTwo(null)
  }
  
  function compareFunction(card){
    choiceOne?setChoiceTwo(card):setChoiceOne(card);
  }

  //run when state changes
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src===choiceTwo.src && choiceOne.id !==choiceTwo.id){
        setCards(prevCards=>prevCards.map(eachCard=>{
          if(choiceOne.src===eachCard.src){
            return({...eachCard,matched:true});
          }else{
            return eachCard;
          }
        }))
      }
      setTurns(prevTurns=>prevTurns+1)
      setTimeout(()=>resetChoices(),1000) 
    }
  },[choiceOne,choiceTwo])

  //initial run
  // useEffect(()=>{
  //   arraySort()
  // },[])

  //resets when cards dont match
  function resetChoices(){
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
  }
  return (
    <div className="App">
      <h1>Memory Game!</h1>
      <button onClick={arraySort} className='newGame'><i className="fas fa-chevron-right"></i> New Game <i className="fas fa-chevron-left"></i></button>
      <div className={cards?'cardsGrid':'startGame'}>
        {cards?cards.map(eachImage=>{
          return(
            <SingleCard 
              key={eachImage.id} 
              eachImage={eachImage}
              compareFunction={compareFunction} 
              flipped={eachImage===choiceOne || eachImage===choiceTwo ||eachImage.matched} 
              disabled={disabled}
            />
          )
        }):<div>Click on the button to start a new game!</div>}
      </div>
      {cards?<div className='turns'>Turns:{turns}</div>:null}
    </div>
  );
}


export default App;
