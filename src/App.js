
import './App.css';
import React,{useContext}from 'react';
import Header from './components/Header';
import {ThemeContext} from './context/ThemeContextDarkMode';
import Main from './components/Main';
import MoreInfoCountry from './components/MoreInfoContry';
import { Route, Redirect} from 'react-router-dom'
import {CSSTransition} from 'react-transition-group';
import FavoritesCountries from './components/FavoritesCountries';
const routes = [
  {path: '/home', Component: Main}, 
   {path:'/moreDataCountry/:country', Component: MoreInfoCountry},
   {path:'/favoritesCountries', Component: FavoritesCountries},
   ]
function App() {
   const{darkMode} = useContext(ThemeContext); 
  
  return (
    <div className= {`${darkMode? 'App bg-app-light':'App bg-app-dark'}`}>
      <Header/>
      <Route exact path="/" children={<Redirect to='/Home'/>}></Route>
   {routes.map(({path, Component}) =>{
       return(<Route key={path} 
        exact path={path}
        children ={
          ({match})=>(
            <CSSTransition
              in={match!==null}
              classNames='page'
             timeout={500}
             unmountOnExit >
               <Component/>
             </CSSTransition>
           )
        }>
        
        </Route>)
   })}
   
    </div>
  );
}

export default App;
