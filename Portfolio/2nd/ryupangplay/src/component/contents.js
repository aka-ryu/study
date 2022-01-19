import { connect } from 'react-redux';

function Contents(props) {
    
    console.log(props.movie[0].img);
    
    
    
    
    return (
        <div className='contents'>
            <p className='Contents-title'>모든 영화들</p>
            <div className='movie-list'>
            {
                props.movie.map(function(a,i) {
                    return(
                        <div>
                            <div className='movie-box'>
                                <img className='movie-img' src={'img/' + (props.movie[i].img) + '.jpg'} />
                                <div className='movie-detail'>
                                    <p className='movie-title'>{props.movie[i].title}</p>
                                    <p className='movie-detaileddescription'>{props.movie[i].content}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

function movie(state){
    return {
        movie : state
    }
}

export default connect(movie)(Contents)

//export default Contents;