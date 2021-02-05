import { initialModel, createModel } from './model/model';
import './App.css';
import Pin from './Pin/Pin'
import { useState } from 'react';


function App() {
    const [model, setModel] = useState(initialModel())
    const {getAssumedColor, changeColor, check} = createModel(model, setModel)
    return (
        <div>
            <div className="row">
                <Pin color={getAssumedColor(0)} change={() => changeColor(0)}></Pin>
                <Pin color={getAssumedColor(1)} change={() => changeColor(1)}></Pin>
                <Pin color={getAssumedColor(2)} change={() => changeColor(2)}></Pin>
                <Pin color={getAssumedColor(3)} change={() => changeColor(3)}></Pin>
                <button className="checkButton" onClick={check}> Check </button>
            </div>
            
            {model.rounds.map((round) => {

                return (<div>
              
                    <Pin color={round.assumedColors[0]} change={() => { }}></Pin>
                    <Pin color={round.assumedColors[1]} change={() => { }}></Pin>
                    <Pin color={round.assumedColors[2]} change={() => { }}></Pin>
                    <Pin color={round.assumedColors[3]} change={() => { }}></Pin>


                    <div className="hints">
                    </div>
                </div>)
            })}
         
        </div>
    );
 }
    
    export default App;
