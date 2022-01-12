import React, {createContext, useReducer, useContext} from'react'; 


const LikeContext = createContext(); 

const initialState ={
    countriesLike:[],
}

function reducer(state, action){ 
    
      switch(action.type){ 

        case 'addCountryLike': 
         if (action.payload.like === true){ 
            return {...state, countriesLike: [...state.countriesLike, action.payload.countryData]}; 
         }
      
     case 'removeCountryLike': 
                   if(state.countriesLike.length > 0){
                    return{...state, countriesLike: state.countriesLike.filter(country => country.name !== action.payload)} 
                   }
               break;
          default: 
           return state; 
      }

}
function LikeProvider({children}){

    const [state, dispatch] = useReducer(reducer, initialState); 

     let countriesLikes = state.countriesLike.slice(); 
            if(countriesLikes.length > 0){ 
                window.localStorage.setItem('countriesLike',JSON.stringify( countriesLikes))
            }
           
    return (
        <LikeContext.Provider value={{state,dispatch}}>
            {children}
        </LikeContext.Provider>
    )

   
}
export const useLikeContries=()=>{ 

    return useContext(LikeContext);
}


export default LikeProvider;