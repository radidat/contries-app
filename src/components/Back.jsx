import React,{ useContext} from 'react'; 
import {Link} from 'react-router-dom';
import {ThemeContext} from '../context/ThemeContextDarkMode';


function Back(){ 
    const {darkMode} = useContext(ThemeContext);
    return(
        <Link to="/home" className={`back-main-page${darkMode ? ' light': ' dark'}`}>
        <div className="text-back">
          <img src="/left-arrow.png" className="arrow" alt='left-arrow'/>
          <p>Back</p>
        </div>
      </Link>
    )
}
export default Back; 