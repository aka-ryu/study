import React, {useContext} from 'react';
import {tabContext} from "../App.js"


function Content(props) {

    const tab = useContext(tabContext);
    console.log(tab);
    

    if (tab === 'all') {
        return(
            <div className='content'>
                {
                    props.exercise.map(function(a,i){
                        return (
                            <div className='card'>
                                <a href={props.exercise[i].namuwiki} target="_blank">
                                    <div className='card_explanation'>
                                        <p className='card_explanation_p'>나무위키로 이동 </p>
                                    </div>
                                </a>
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
                                    <a href={props.exercise[i].namuwiki} target="_blank">
                                        <div className='card_explanation'>
                                            <p className='card_explanation_p'>나무위키로 이동 </p>
                                        </div>
                                    </a>
                                    <img src={'img/' + (props.exercise[i].img) + '.jpg'} className='card_img'></img>
                                    <p className='card_p'>{props.exercise[i].title}</p>
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