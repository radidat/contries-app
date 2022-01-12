import React, {useState, useContext} from "react";
import { ThemeContext} from '../context/ThemeContextDarkMode';
function Filter({dataRegion,onFilterByRegion }) {
  const [showFilter, setShowFilter] = useState(false);
  const {darkMode} = useContext(ThemeContext);

const cutDataRegion = dataRegion.length > 7? dataRegion.slice(0,7): dataRegion;

  const onShowFilter = (e) => {
          e.preventDefault();
          e.stopPropagation();
    setShowFilter(!showFilter);
  };

  return (<div className="filter-container">
    <div className= {`filter${darkMode ? ' light': ' dark'}`} onClick={onShowFilter}>
      <p>Filter by region
      </p>
      <img src="/down-chevron.png" className="down-chevron" alt="down-chevron" width="10" height="10"/>
    </div>
    {showFilter && <ListContries changeMode={darkMode} cutDataRegion={cutDataRegion}onFilterByRegion={onFilterByRegion}/>}
  </div>);
}

const ListContries = ({changeMode, cutDataRegion,onFilterByRegion }) => {
  

  return (
  <> < ul className ={`country-filter${changeMode ? ' light': ' dark'}`} >
    {cutDataRegion.map(region =>{ 
      return <li onClick={(e)=>onFilterByRegion(e, region)} key={region}>{region}</li>
    })}
</ul> </>
    );
};
export default Filter;