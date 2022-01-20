import { Carousel } from 'react-bootstrap';
import React from 'react';


function Slide() {
    return (
        <div className='Caorusel'>
            <Carousel className='Caorusel-container'>
                <Carousel.Item>
                <div className='kk'>
                    <img className='kk-img' src="https://img.coupangstreaming.com/titles/18227a79-1a8a-4698-acc9-d2ab0fda6471/title-treatment/c0b5fcf4-cfad-48fa-89a5-c7c7594ea6cd.png?imwidth=640&imscalingMode=aspectFit"></img>
                    <p>
                        인생의 가장 부끄러운 순간을 함께 한<br></br>
                        동갑내기 세 친구의 자체발광 코미디
                    </p>
                    <button>▶  재생하기</button>
                </div>
                    <Carousel.Caption>
                        
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <div className='ll'>
                    <img src="https://img.coupangstreaming.com/titles/b7c2ae45-e31f-493a-a182-421a97fcfff7/title-treatment/cb7fdd25-4e7a-47e6-b5f7-4de939f9ab35.png?imwidth=640&imscalingMode=aspectFit"></img>
                    <p>
                        1997년, 국가부도 위기 앞에<br></br>
                        서로 다른 선택을 했던 사람들의 이야기
                    </p>
                    <button>▶  재생하기</button>
                </div>
                    <Carousel.Caption>
                   
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <div className='ii'>
                    <img src="https://img.coupangstreaming.com/titles/dfee2746-afb1-4434-90a3-03ba0c45372a/title-treatment/a9d5b6ab-b3da-4609-8da0-eeae7cd8bf06.png?imwidth=640&imscalingMode=aspectFit"></img>
                    <p>
                    늘 차이는 교사 준수에게는<br></br>
                    쿨한 18년 지기 기상캐스터 현우가 있다.<br></br>
                    편하지만 묘하게 끌리는,<br></br>
                    그렇지만 사귀는 사이는 아닌 묘한 감정을 가진 두 사람.
                    </p>
                    <button>▶  재생하기</button>
                </div>
                    <Carousel.Caption>
                   
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Slide
;