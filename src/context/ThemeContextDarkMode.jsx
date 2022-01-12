import React, {createContext, useState} from "react";

 export const ThemeContext = createContext();

const ThemeContextDarkMode = ({children}) => {
  const [changeMode, setChangeMode] = useState(true);

  
  const onChangeMode = e => {
    e.preventDefault();
    setChangeMode(!changeMode); 
   
    window.localStorage.setItem('darkMode', changeMode);
  };
  let darkMode =JSON.parse( window.localStorage.getItem('darkMode'));
  return <ThemeContext.Provider value={{ darkMode,changeMode, onChangeMode}}>
      {children}
      </ThemeContext.Provider>;
};

 
export default ThemeContextDarkMode;
