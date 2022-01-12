import React from 'react'; 
import Back from './Back'; 
import {useLikeContries} from '../context/LikeContext';
import Card from './Card';

function FavoritesCountries(){

    // const { state} = useLikeContries()
      let countriesLike =JSON.parse(window.localStorage.getItem('countriesLike'));

      console.log(countriesLike);
      
    return(
        <div>
            <Back></Back>
            <div>
            <div className="container-card">
      {countriesLike && countriesLike.map(country =>{
        return <Card key={country.name} country={country} />
      })}
    </div>
            </div>
        </div>
    )
}
export default FavoritesCountries;