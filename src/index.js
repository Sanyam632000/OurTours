import React, { useEffect, useState,useContext } from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const PersonContext = React.createContext();           // For useContext to avoid PropDrilling

function OurTour(){
  
  const url  = 'https://course-api.com/react-tours-project'
  const [loading,setLoading] = React.useState(true);
  const [tours,setTours] = React.useState([]);

 const removeTour =(id) =>{
   let newTour = tours.filter((tour) => tour.id !== id);
   setTours(newTour);
 }

  const fetchTour = async() =>{
    setLoading(true);

    try {
      setLoading(false);
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
      
    } 
    
    catch (error) {
      setLoading(false);
      console.log('Error')
    }
  
    
  }  

  useEffect(() =>{
    fetchTour();
  },[])

  

  if(loading){
    return(
      <Loading/>
    )
  }

  if(tours.length === 0){
    return<>
    <h2 style={{textAlign:'center',marginTop:50}}>No Tours Left</h2>
    <div style={{textAlign:'center',marginTop:50}}>
    <button className='btn btn-primary' onClick={()=>fetchTour()}>Refresh</button>
    </div>
    </>
  }

  return(
    <PersonContext.Provider value={{removeTour}}>                           {/* For useContext to avoid PropDrilling*/} 

    <Header/>
    <Tours tours={tours} />

    </PersonContext.Provider>

  )
   
  
 

}

const Loading =() =>{
  return(
    <h1>Loading...</h1>
  )
}

const Tours =({tours})=>{
return <>
  {tours.map((tour) =>{
    return <Tour key={tour.id} {...tour} ></Tour>
  })}
  </>
}

const Tour =({id,image,info,name,price}) =>{
  
  const [readMore,setReadMore] = useState(false);
  const {removeTour} = useContext(PersonContext);                     //For useContext to avoid PropDrilling

  return <div className='container'>

    <img src={image} alt=''></img>
     <footer>
      <div className='tour-info'>
        <h3 className='name'>{name}</h3>
        <h4 className='price'>${price}</h4>

        <p>{readMore? info : `${info.substring(0,200)}...`}
        <button className='readmore' onClick={() =>{setReadMore(!readMore)}}> {readMore?'show less':'read more'} </button>
        </p> 

        <br></br>
        <button className='btn btn-danger not-interested' onClick={() => removeTour(id)}>Not Interested</button>
                
      </div>
      <br></br>
    </footer>
    
  
  </div>
}




ReactDOM.render(<OurTour/>,document.getElementById('root'));



