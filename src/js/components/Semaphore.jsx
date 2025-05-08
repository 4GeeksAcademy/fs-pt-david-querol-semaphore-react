import React from "react";
import { useState, useEffect } from "react";

export const Semaphore = () => {

    //array with semaphore object lights.
    const semaphoreElements = [
        {color:"red", status: false} ,
        {color: "yellow", status: false},
        {color: "green", status: false}
    ];

    //State of semaphore objects.
    const [lightColors, setLightColors] = useState(semaphoreElements);
    //State of active light index.
    const [activeLight, setActiveLight] = useState(0);
    //State of purple light is active.
    const [isPurple, setIsPurple] = useState(false);

    //Loading Page and renew with activeLight changes.
    useEffect(() => {
        
        const updateElements = lightColors.map((item, i) => ({
            ...item,
            status: i === activeLight
        }));

        setLightColors(updateElements);
        
        //testing in console the state of activeLight
        //console.log("Estado actual del indice:", activeLight, "La luz encendia es:", lightColors[activeLight].color);
    
    }, [activeLight]);
    
    //Function actives another light changing an index of the activeLight useState.

    const toggleLight = (i) => {          
            if (i === activeLight){
                return;
            }
            setActiveLight(i); 
        };
    
    //Function adds a new purple light on the semaphore.
    const addPurple = () => {

            const newPurpleObject = {
                color: "purple",
                status: false
            }

            if (!isPurple) {

                setLightColors(               
                    (prev) => [...prev, newPurpleObject]
            );
                setIsPurple(true);
                return;
            }
            if (isPurple) {
                    setActiveLight(0);
                    setLightColors(
                        (prev) => (prev.filter((_, i) => i !== prev.length -1 )));
                    setIsPurple(false);
            }
    };   


return(

    <>

    <div className="semaphoreTop shadow"></div>
    <div className="semaphoreBody d-flex flex-column align-items-center py-4 shadow">

        {lightColors.map ((item, index) => (

            <div 
                key={index} 
                className={`light ${item.color} ${ item.status ? "lighted" : "" }`} 
                onClick={() => toggleLight(index)}
            >      
            </div>

        ))}
        
    </div>
    <br></br>
    <div className="d-flex">
        
        <button 
            type="button" 
            className={`btn btn-secondary m-2 shadow buttonSelCol ${lightColors[activeLight].color}`} 
            onClick={() => toggleLight(activeLight < lightColors.length - 1 ? activeLight + 1 : 0)}
        >Cambia de luz
        </button>

        <button 
            type="button" 
            className="btn btn-secondary m-2 shadow buttonSelCol purple" 
            //style= {{display: isPurple ? 'none' : ''}} 
            onClick={() => addPurple()}
        >{isPurple ? "Quitar Púrpura" : "Añadir Púrpura"}
        </button>

    </div>
     
    </>
 );

};