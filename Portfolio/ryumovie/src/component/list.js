import React, { useContext } from 'react';
import {connect} from 'react-redux';
import {useState} from 'react';


function List(props){

    
    
    
    return(
        <div className='list-contents'>
            <div>
            <div className='contents'>
                <p className='contents-title'>모든 영화들</p>
                <div className='movie-list'>
                {
                    props.movie.map(function(a,i) {
                        
                        return(
                            <div>
                                <div className='movie-box'>
                                    <img className='movie-img' src={'../img/' + (props.movie[i].img) + '.jpg'} />
                                    <div className='movie-detail'>
                                        <p className='movie-title'>{props.movie[i].title}</p>
                                        <p className='movie-detaileddescription'>{props.movie[i].content}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    
                    }
                    
                    )
                }
                </div>
            </div>
            </div>
        </div>
    )
}

function movie(state){
    return {
        movie : state
    }
}

export default connect(movie)(List);