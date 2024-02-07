import { useState } from 'react';

function Card({id,name,info,image,price,removeTour}){
    const [readmore,setReadmore] = useState(false);

    // readmore ture : readmore is clicked : show full information;
    const description = readmore ? info : `${info.substring(0,200)}...`;

    function readMoreHandler(){
        setReadmore(!readmore);
    }

    return (
        <div className='card'>
            <img src={image}  className='image'></img>

            <div className='tour-info'>
                <div className='tour-details'>
                    <div className='tour-price'>{price}</div>
                    <div className='tour-name'>{name}</div>
                </div>

                <div className='description'>
                    {description}
                    <span className='read-more' onClick={readMoreHandler}>
                        {readmore ? `Show less` : `Read more`}
                    </span>
                </div>
            </div>

            <button className='btn-red' onClick={() => removeTour(id)}>
                Not Interested
            </button>
        </div>
    );
}

export default Card;