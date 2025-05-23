import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useState ,useEffect } from "react";
import axios from "axios";
import Current from "./components/current";
import React from "react";

const App = () => {

    const [city , setCity] = useState();

    const [citySuggestion , setCitySuggestion] = useState([]);

    const [ CurrentWeather , setCurrent] = useState();

    const [ forecast , setForecast] = useState();

    const [ location  , setLocation] = useState();
    
    const autoCompURL ="https://api.weatherapi.com/v1/search.json?key=de8b2e4164194020961133828241410&q=";

    const WeatherURL = (city) =>`https://api.weatherapi.com/v1/forecast.json?key=de8b2e4164194020961133828241410&q=${city}&days=7&aqi=no&alerts=no`;

     useEffect(()=>{
        if (city && city.length >3) {
        fetchAutoCompURL();
    }
     },[city]);

     const fetchAutoCompURL = async () => {
        try{
            const response = await axios.get (autoCompURL+city);
        const resp = response.data;
        console.log('api call',resp);
        const cityData = resp.map((data)=>{
            return (`${data.name},${data.region},${data.country}`)
        });
        setCitySuggestion(cityData);

        }catch(e){
            console.log('error',e);
        }
     };

     const handleSelectedCity = (city) =>{
        console.log('clicked city',city);
        fetchWeatherAPI(city);
        setCitySuggestion([])
     };

     const fetchWeatherAPI = async (city) =>{
        try{
            const response = await axios.get(WeatherURL(city));
            const resp = response.data;
            //console.log(resp);
           setCurrent(resp.Current);
           setForecast(resp.forecast);
           setLocation(resp.location);
           
           console.log('current',resp.current);
           console.log ('forecast',resp.forecast);
           console.log('location',resp.location);

        } catch (e) {
            console.log(" Weather API Error",e);
        }
     }

    return(
    <div className="container bg-success p-5 mt-5 rounded">
        <input type="text" 
        className="form-control"
         placeholder="Enter City Name"
         onChange={(e)=>{setCity(e.target.value)}}
         />
       {/* {city && <h3>{city}</h3>}*/}
       
       {citySuggestion && 
       citySuggestion.map((data) => {
        return (
            
                 
                 <div
                   className="text-center bg-info rounded p-1 bg-opacity-10 border border-info border-opacity-25 text-white"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSelectedCity(data)}
                    >
                  
                 {data}
               </div>

        );
       }

       )

       }

       {CurrentWeather && <Current CurrentWeather={CurrentWeather} location={location}/>}
    </div>
    );
}


export default App ;
        
