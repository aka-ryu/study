import React from 'react';


function Content(props) {
    return(
        <div className='content'>
            {
                props.exercise.map(function(a,i){
                  return (
                    <div className='card'>
                      <img src={'img/' + (props.exercise[i].img) + '.jpg'}></img>
                      <p className='card_p'>{props.exercise[i].title}</p>
                    </div>
                  )
                })
            }
      </div>
    )   
}




export default Content;