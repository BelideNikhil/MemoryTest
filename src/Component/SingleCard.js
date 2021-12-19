import './SingleCard.css'
export default function SingleCard({eachImage,compareFunction,flipped,disabled}) {
    const clickHandler=(card)=>{
       if(!disabled){
        compareFunction(card)
       }
    }
    return (
        <div className='card'>
            <div className={flipped?"flipped":""}>
                <img src={process.env.PUBLIC_URL + "/img/cover.jpg"} alt="cover" onClick={()=>clickHandler(eachImage)}  className='coverImg'/>
                <img src={eachImage.src} alt="main" className='actualImg'/>
            </div>
        </div>
        
    )
}
