import React, {useState, useContext, useEffect} from "react";
import {ThemeContext} from "../context/ThemeContextDarkMode";
import Filter from "./Filter";
import Card from "./Card";
import { Link } from "react-router-dom";
import Loading from './Loading';
function Main() {
  const [inputValue, setInputValue] = useState("");
  const [dataCountry, setDataCountry] = useState([]);
  const [ currentPage, setCurrentPage]= useState(1);
  const [filterData, setFilterData] = useState([]);
  const [limitPage, setLimitPage] = useState(5);
  const [maxLimitPage, setMaxLimitPage] = useState(5); 
  const [miniLimitPage, setMinLimitPage] = useState(0);
  const [loading,setLoading ] =useState(false);
  useEffect(() => {
     setLoading(true); 
    fetch("https://restcountries.eu/rest/v2/all")
    .then(response => response.json())
    .then(data =>{
       setDataCountry(dataCountry.concat(data))
       setFilterData(filterData.concat(data))
      }
       );
       setLoading(false);
  }, []);

  let copyDataCountry =filterData.slice();
  const dataRegion =['All region', "Asia", "Europe", "Africa", "Oceania", "Americas", "Polar"]; 

  /*get unique region*/

  let onFilterByRegion = (e, region)=>{ 
    e.preventDefault(); 
    e.stopPropagation();

     switch(region){ 
       case 'All region':
         return  setFilterData(dataCountry);
         case 'Asia':
           copyDataCountry =dataCountry.filter(country =>country.region ===region) ; 
          return setFilterData(copyDataCountry)
           case 'Europe':
            copyDataCountry =dataCountry.filter(country =>country.region ===region) ; 
            return setFilterData(copyDataCountry)
             case 'Africa':
              copyDataCountry =dataCountry.filter(country =>country.region ===region) ; 
              return setFilterData(copyDataCountry);
         case 'Oceania':
          copyDataCountry =dataCountry.filter(country =>country.region ===region) ; 
          return setFilterData(copyDataCountry)
           case 'Americas':
            copyDataCountry =dataCountry.filter(country =>country.region ===region) ; 
          return setFilterData(copyDataCountry)
             case 'Polar':
              copyDataCountry =dataCountry.filter(country =>country.region ===region) ; 
          return setFilterData(copyDataCountry)

         default: 
         setFilterData(dataCountry);
     }
  }
  /* paginate */
  const itemPerPage = 8;

  const totalPage = Math.ceil(copyDataCountry.length / itemPerPage);

  let numberPage = [];
      let maxItems = currentPage * itemPerPage; 
       let minItems = maxItems - itemPerPage;

  for (let i = 1; i <= totalPage; i++) {
    numberPage.push(i);
  }
  const {darkMode} = useContext(ThemeContext);
  const changeValue = e => {
    let value = e.target.value;
    let lowerCaseValue = value.toLowerCase().trim(); 
    let filterByCountryName = dataCountry.filter(country => country.name.toLowerCase().startsWith(lowerCaseValue))

setFilterData(filterByCountryName);
    setInputValue(value);
  };
let itemsDisplay = copyDataCountry.slice(minItems, maxItems);
let limitedPages = numberPage.slice(miniLimitPage, maxLimitPage);
const nextItems = (currentNumberPage)=>{ 
    setCurrentPage(currentNumberPage);
    

}
const nextPages = ()=>{
  if( totalPage > maxLimitPage){ 
     setMaxLimitPage(maxLimitPage + limitPage); 
  setMinLimitPage(miniLimitPage + limitPage )
  }

}
const prevPages = ()=>{
  if(maxLimitPage > 5){ 
     setMaxLimitPage(maxLimitPage - limitPage);
     setMinLimitPage(miniLimitPage - limitPage);
  }


}

    if(loading){ 

      return <Loading/>
    }

  return (<div className="main-container">
    <div className=" search-data">
      <input type="text" value={inputValue} onChange={changeValue} className={`search-country${darkMode
          ? " light"
          : " dark"}`} placeholder="search for country"></input>
        <Link to='/favoritesCountries'className={`favorites-countries ${darkMode ? 'light': 'dark'}`} ><h1>Mes pays favories</h1></Link>
      <Filter dataRegion ={dataRegion}onFilterByRegion={onFilterByRegion} />
    </div>
    <div className="container-card">
      {itemsDisplay && itemsDisplay.map(country =>{
        return <Card key={country.name} country={country} />
      })}
    </div>
    <div className='pagination-container'>
    <nav aria-label="Page navigation example">
    <ul className="pagination">

      <li className="page-item">
        <button className={`page-link${darkMode? ' light' : ' dark'}`}
          disabled ={currentPage === 1 & maxLimitPage === limitPage? true : false}
           onClick = {()=>{
             console.log(currentPage);
             setCurrentPage(currentPage -1);
            if ((currentPage - 1) % limitPage == 0) {
              setMaxLimitPage(maxLimitPage - limitPage);
              setMinLimitPage(miniLimitPage - limitPage);
            }
            }}
         >Prècedent</button>
      </li>
      { maxLimitPage  > limitPage &&
       <li className="page-item" onClick={()=>prevPages()}>
       <a className={`page-link${darkMode ? ' light' : ' dark'}`} >....</a>
     </li>
        }
      {
        limitedPages && limitedPages.map(page => {
          return <Page key={page.toString()} page={page} nextItems={nextItems} />;
        })
      }
       { maxLimitPage >limitPage &&
          <li className="page-item" onClick={()=>nextPages()}>
       <a className={`page-link${darkMode ? ' light' : ' dark'}`} >....</a>
     </li>
        }
      <li className="page-item">
        <button className={`page-link${darkMode ? ' light' : ' dark'}`} 
         disabled ={ currentPage >= totalPage?true : false}
         onClick = {()=>{
           setCurrentPage(currentPage +1); 
           if(currentPage +1 > maxLimitPage){ 
            setMaxLimitPage(maxLimitPage + limitPage); 
            setMinLimitPage(miniLimitPage + limitPage );
          }
          }}
        >Suivant</button>
      </li>
    </ul>
  </nav>
    </div> 
  </div>);
}



function Page({page, nextItems}) {
  const {darkMode} = useContext(ThemeContext);

  return (<li className="page-item" onClick={()=>nextItems(page)}>
    <a className={`page-link${darkMode ? ' light' : ' dark'}`}>{page}</a>
  </li>);
}
export default Main;