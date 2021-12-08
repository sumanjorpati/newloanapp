
import  React, { useState , useEffect } from 'react'

export const DateTime = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <>
        <div>
            <p> Time : {date.toLocaleTimeString()}</p>
            <p> Date : {date.toLocaleDateString('en-US',{dateStyle:"full",timeZone:"America/Chicago"},)}</p>

        </div><div>
            <p>Nep Time : {date.toLocaleTimeString()}</p>
            <p>Nep Date : {date.toLocaleDateString('en-US',{timeZone:"America/Chicago",timeZoneName:'short'})}</p>

        </div>
        </>
        
    )
}

export default DateTime