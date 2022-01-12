import React, {useState, useContext} from "react";
import {ThemeContext} from '../context/ThemeContextDarkMode';
import {useLikeContries} from '../context/LikeContext';
import{Link} from 'react-router-dom'
const Card = ({country})=>{ 
  const {darkMode} = useContext(ThemeContext);
  const [like, setLike] = useState(true);
 const  {state, dispatch} = useLikeContries();

const countryData = country ? Object.assign({}, country) : '';
 const onLike =(e)=>{ 
     e.preventDefault();
        
    setLike(!like); 
    
       if(like ===true){
        window.localStorage.setItem(countryData.name, JSON.stringify(like));
         dispatch({type:'addCountryLike', payload : {countryData : countryData, like: like}});
       }
    
    if(like ===false){
      window.localStorage.setItem(countryData.name, JSON.stringify(like));
      dispatch({type:'removeCountryLike', payload:countryData.name})
    }
   
  }

          let likeCountry = JSON.parse(window.localStorage.getItem(countryData.name))
    return(
        <div>
      
         <div className={`card${darkMode ? ' light': ' dark'}`} >
         <Link to={`/moreDataCountry/${countryData.name}`} className='card-link'>
        <img src={countryData.flag} className="card-img-top" alt="flag_germany"/>
        <div className="card-body">
          <h5 className='country-name'>{countryData.name}</h5>
          <p>Population :<span className='data-country'>{countryData.population}</span></p>
          <p>Region :<span className='data-country'>{countryData.region}</span></p>
          <p>Capital :<span className='data-country'>{countryData.capital}</span></p>
        </div>
        </Link>
        <img onClick={onLike} src ={likeCountry ?'/like-red.png':'/like.png' } 
        alt={like ? '/like.png':'/like-red.png'} width='25'
         height='25' style={{marginTop: '12px', marginLeft:'150px', cursor:'pointer'}} ></img>
      </div> 
      
      
        </div>
 
       
    )
}


export default Card;