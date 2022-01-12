import React, {useContext}from "react";
import {ThemeContext} from '../context/ThemeContextDarkMode';


function Header() {



  const {darkMode, onChangeMode}= useContext(ThemeContext)
  return (<div className={`header${darkMode ?' light': ' dark'}`}>
    <p style={darkMode ?  colorPlight:  colorPdark}>Where in the world</p>
    <p className= {`color-mode${darkMode? ' light': ' dark'}`} onClick={(e)=>onChangeMode(e)}>
      <img src='/lune.svg' className={ `colorMoon${darkMode ? ' light': ' dark'}`} style={{width:15, height:15}} alt='moon'/>
     <span style={{marginLeft: "15px", marginTop:"30spx"}}>Dark mode</span> 
      </p>
  
  </div>);
}

export default Header;


const colorPlight={
  color : "black"
}
const colorPdark={ 
  color: '#fff',
}
