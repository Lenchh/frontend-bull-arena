import React, { useEffect} from "react";
import "./matadorStyle.css"

interface matadorProps {
    applause?: number,
    setMatarodPosition?: React.Dispatch<React.SetStateAction<number>>,
    matadorPosition?: number
}

const Matador = ({ applause, setMatarodPosition, matadorPosition }: matadorProps) =>{
useEffect(() => {
    const handler = (event: Event) => { 
    const arrPositions = [0,1,2,3,4,5,6,7,8];
    const customEvent = event as CustomEvent<{ position: number }>;
    if(customEvent.detail.position === matadorPosition) {
        arrPositions.splice(customEvent.detail.position, customEvent.detail.position);
        let newPosition = 0;
        setTimeout(() => {setMatarodPosition!( newPosition = arrPositions[Math.floor(Math.random() * arrPositions.length)])
        console.log(`Matador is moving from ${customEvent.detail.position} to ${newPosition}`)
    }, 1000) }}
    document.addEventListener("bullRun", handler);
    return () => {
    document.removeEventListener("bullRun", handler);
  };
}, []);

useEffect(() => {
    const audioObj = new Audio(`/src/assets/applause${applause}.mp3`);
    audioObj.play(); 
}, [applause]);

    return <div className="youngMatador"></div>
} 

function compareProps(prevProps: matadorProps, nextProps: matadorProps) {
    if(nextProps.applause === 3 && prevProps.applause !== 3) {
        console.log("current applause: ", nextProps.applause, " previous applause: ", prevProps.applause);
        return false;
    }   
    return true;
}

export default React.memo(Matador, compareProps);