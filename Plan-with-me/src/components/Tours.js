import Card from './Card';

function Tours({tours , removeTour}){
    return(
        <div className='container'>
            <div className='title'>
                <h1>Ram Ram Bhai Sarya Ne!</h1>
            </div>
            <div className='cards'>
            {
                // for every element of tour it returns a card;
                tours.map( (tour) => {
                    // good rule of thumb : whenever we use map on an array we should pass a unique key with every element
                    return <Card {...tour} key = {tour.id} removeTour = {removeTour}></Card>
                } )
            }
            </div>
        </div>
);

/*
const array1 = [1, 4, 9, 16];

// const x = (elem) => return elem*2;

// Pass a function to map
const map1 = array1.map((x) => return x * 2);

console.log(map1);
// Expected output: Array [2, 8, 18, 32]
*/
}

export default Tours;