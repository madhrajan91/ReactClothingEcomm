
import './App.css';

import Home from "./routes/home/home.component"
import {Routes, Route} from 'react-router-dom'

import  Navigation from './routes/navigation/navigation.component'
import  Authentication from "./routes/authentication/authentication.component"


const Shop = () => {
    return (
      <div>
        <h1> Shop </h1>  
      </div>
    )

}

const App = () => {
  // home/shope will not be enough without an outlet in the parent(HOME)
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index={true} element={<Home/>} />
        <Route path="shop" element={<Shop/>} /> 
        <Route path="authenticate"  element={<Authentication/>} />
      </Route>
      
    </Routes>
  );
}

export default App;
