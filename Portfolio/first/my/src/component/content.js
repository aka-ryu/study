import React, {useContext} from 'react';
import {tabContext} from "../App.js"


function Content(props) {

    const tab = useContext(tabContext);
    

    if (tab === 'all') {
        return(
            <div className='content'>
                {
                    props.exercise.map(function(a,i){
                        return (
                            <div className='card'>
                                <div className='card_explanation'></div>
                                <img src={'img/' + (props.exercise[i].img) + '.jpg'} className='card_img'></img>
                                <p className='card_p'>{props.exercise[i].title}</p>
                            </div>
                        )
                    })
                }
        </div>
        )

    } else {

        return(
            <div className='content'>
                {  
                    props.exercise.map(function(a,i){
                        if (tab === props.exercise[i].kinds) {
                            return (
                                <div className='card'>
                                    <div className='card_explanation'>
                                        <img src={'img/' + (props.exercise[i].img) + '.jpg'} className='card_img'></img>
                                        <p className='card_p'>{props.exercise[i].title}</p>
                                    </div>
                                </div>
                            )
                        }
                     })
                }
        </div>
        )
    }
}




export default Content;