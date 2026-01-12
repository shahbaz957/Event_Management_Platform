"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
// import { Event } from '@/types'

function Register() {
    const {id} = useParams();
    const [event , setEvent] = useState(null);
    const [count , setCount] = useState<number>(0);
    const {user} = useUser();

    // console.log(id)
    const handleInc = () => {
        setCount((prev) => prev+1)
    }
    const handledec = () => {
        if (count <= 0 ){
            return ;
        }
        setCount((prev) => prev-1)
    }
    useEffect(() => {
        async function loadEvent(id: string) {
          try {
            const res = await fetch(`/api/events/${id}`);
            const data = await res.json();
            console.log(data);
            setEvent(data);
          } catch (error) {
            console.log("Error occured : ", error);
          }
        }
        loadEvent(id);
      }, [id]);
    // console.log(id);
      const handleRegister = async () => {
        try {
            const res = await fetch(`/api/event/${id}` , {
                method : "POST" , 
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    seatsBooked :  count ,
                    userId : user?.id
                })
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log("ERROR : " , error)
        }
      }

    if (event === null){
        return <div>Loading ...</div>
    }
  return (
    <div>
        <div>
            <h1>Select the Number of Seats</h1>
            <p><button onClick={handledec}>➖</button></p>
            <h2>{count}</h2>
            <p><button onClick={handleInc}>➕</button></p>
            <h3>Seats Left : {event.rem_seats}</h3>
        </div>

        <div>
            <button onClick={handleRegister}>
                Register
            </button>
        </div>
    </div>
  )
}

export default Register