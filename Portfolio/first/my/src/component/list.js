import React,{ useState } from "react";

function List(props) {

    
    
    
    return(
        <div className="main_container">
            
                <h4 className="list_title">신체 별 운동방법</h4>
                <ul className="list_list">
                    <li><button className={`li_btn ${props.tab === 'all' ? 'active' : ''}`}
                        onClick={() => props.setTab('all')}>모두</button></li>
                    <li><button className={`li_btn ${props.tab === 'chest' ? 'active' : ''}`}
                        onClick={() => props.setTab('chest')}>가슴</button></li>
                    <li><button className={`li_btn ${props.tab === 'back' ? 'active' : ''}`}
                        onClick={() => props.setTab('back')}>등</button></li>
                    <li><button className={`li_btn ${props.tab === 'shoulder' ? 'active' : ''}`}
                        onClick={() => props.setTab('shoulder')}>어깨</button></li>
                    <li><button className={`li_btn ${props.tab === 'arm' ? 'active' : ''}`}
                        onClick={() => props.setTab('arm')}>팔</button></li>
                    <li><button className={`li_btn ${props.tab === 'leg' ? 'active' : ''}`}
                        onClick={() => props.setTab('leg')}>하체</button></li>
                </ul>

        </div>
    )
}
export default List;