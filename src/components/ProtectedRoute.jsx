import React from 'react'; 
import {Route} from 'react-router-dom';

const ProtectedRoute = ({Component, ...args }) => (

    <Route
       exact component={Component}
      {...args}
    />
  );

export default ProtectedRoute; 
