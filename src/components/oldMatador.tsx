import React from "react";
import "./matadorStyle.css"

interface matadorProps {
    applause?: number,
    setMatarodPosition?: React.Dispatch<React.SetStateAction<number>>,
    matadorPosition?: number
}

class OldMatador extends React.Component<matadorProps> {
    handler = (event: Event) => {
            const arrPositions = [0,1,2,3,4,5,6,7,8];
            const customEvent = event as CustomEvent<{ position: number }>;
            if(customEvent.detail.position === this.props.matadorPosition) {
                arrPositions.splice(customEvent.detail.position, customEvent.detail.position);
                let newPosition = 0;
                setTimeout(() => {
                    this.props.setMatarodPosition!(newPosition = arrPositions[Math.floor(Math.random() * arrPositions.length)])
                    console.log(`Old Matador is moving from ${customEvent.detail.position} to ${newPosition}`)
                }, 1000)
            }
        }
    componentDidMount() {
       document.addEventListener("bullRun", this.handler);
    }
    componentWillUnmount() {
        document.removeEventListener("bullRun", this.handler);
    }
    componentDidUpdate(prevProps: matadorProps) {
       if (prevProps.applause !== this.props.applause) {
            const audioObj = new Audio(`/src/assets/applause${prevProps.applause}.mp3`);
            audioObj.play(); 
        }
    }
    render() {
        return <div className="oldMatador"></div>;
    }
}

function compareProps(prevProps: matadorProps, nextProps: matadorProps) {
    if(nextProps.applause === 3 && prevProps.applause !== 3) {
        console.log("current applause: ", nextProps.applause, " previous applause: ", prevProps.applause);
        return false;
    }   
    return true;
}

export default React.memo(OldMatador, compareProps);