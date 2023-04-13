import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';

import { Button } from 'reactstrap';
import Headers from './Headers'

const GetLocation = () => {
  let navigate = useNavigate();

  let Number=useLocation();
  let localnumber=localStorage.getItem('phonnumber')
  console.log("from localstorage ",localnumber)
  console.log("test otp for location ",Number.state)
  //  let [locationfile,setlocationfile]=useState({})
  let [locationfile,setlocationfile]=useState({
    phonNumber:localnumber,
    lat:'',
    long:''
   
  })

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let Lat = position.coords.latitude;
      let Long= position.coords.longitude;
      // let data={Lat,Long}
       setlocationfile({...locationfile,lat:Lat,long:Long});
      //  setlocationfile({...locationfile,long:Long});
      //  console.log(Lat,Long);
      //  setlocationfile(data)
       console.log("useState ===> +",locationfile);
       
   })
  },[])
  
  let locationFinder = async ()=>{
    console.log( "useState ",locationfile);
     try{
        let findLocation=await axios.post(
          "http://localhost:5000/api/getLocation",
          locationfile
        );
        if(findLocation.status === 200){
          console.log("Location getit ",findLocation)
          navigate('/home');
        }
     }catch(e){
      console.log("Error from Api", e);
     }
  }
  return (
   <>
   <div>
  <Button color="primary" className="btn center btn-dark w-50" onClick={locationFinder}>
    Click Me For  Your Location
  </Button>
</div>
   </>
  )
}

export default GetLocation
