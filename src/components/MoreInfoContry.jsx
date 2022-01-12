import React, {useState, useContext, useEffect} from "react";
import {ThemeContext} from '../context/ThemeContextDarkMode';
import {Link, useParams} from "react-router-dom";
const MoreInfoCountry = () => {

   const {country} = useParams()
   const [dataCountry, setCurrentCountry]= useState({}); 
   const {darkMode} = useContext(ThemeContext);
   const [loading, setLoading] = useState(false);

   useEffect(()=>{
    setLoading(true);
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => response.json())
    .then(data => setCurrentCountry(data[0])).catch(e => console.log(e));
    setLoading(false);
   },[country])

   if(loading){
     return(<div>Loading data</div>);
   }
 
    
  return(<div>
    <Link to="/home" className={`back-main-page${darkMode ? ' light': ' dark'}`}>
      <div className="text-back">
        <img src="/left-arrow.png" className="arrow" alt='left-arrow'/>
        <p>Back</p>
      </div>
    </Link>
    <div className={`container-more-info-country${darkMode ? ' light': ' dark'}`}>
      <img src={`${dataCountry ?dataCountry.flag:''}`} alt="flag_united_statess" className="flag-country-info"/>
      <div className="more-info-data-country">
        <h5>{dataCountry ? dataCountry.name :''}</h5>
        <div className="info-data">
          <div>
            <p>
              Native Name :<span className="info-data-country">
                { dataCountry ? dataCountry.nativeName :''}</span>
            </p>
            <p>
              Population :<span className="info-data-country">
               {dataCountry ? dataCountry.population : ''}</span>
            </p>
            <p>
              Region :<span className="info-data-country">
                {dataCountry ? dataCountry.region :''}</span>
            </p>
            <p>
              Sub region :<span className="info-data-country">
              {dataCountry ? dataCountry.subregion :''}</span>
            </p>
            <p>
              Capital :<span className="info-data-country">
              { dataCountry ? dataCountry.capital :''}</span>
            </p>
          </div>
          <div className="spacing-data">
            <p>
                Top Level Domain :<span className="info-data-country">
                { dataCountry ? dataCountry.topLevelDomain :''}</span>
            </p>
            <p>
              Currencies :<span className="info-data-country">
              {dataCountry && dataCountry.currencies? dataCountry.currencies[0].code :''}</span>
            </p>
            <p>
              Languages :<span className="info-data-country">
                {dataCountry && dataCountry.languages ? dataCountry.languages[0].name :''}</span>
            </p>
          </div>
        </div>

        <div className={`border-countries${darkMode ? ' light': ' dark'}`}>
          <h5>Border countries</h5>
          { dataCountry && dataCountry.borders !==undefined ?  dataCountry.borders.map(borderCountry =>{
            return (<p key={borderCountry}>{borderCountry}</p>)
          }): ''}
        </div>
      </div>
    </div>
  </div>);
};
export default MoreInfoCountry;

