import logo from './logo.svg';
import './App.css';
import Pin from './Pin/Pin'
import { RED, GREEN, YELLOW, BLUE, PURPLE, ORANGE, PINK, BROWN } from "testmastermind/src/colors"
import { useState } from 'react';
import { initialModel, createModel } from './model/model';

function App() {
    const [model, setModel] = useState(initialModel())
    const {getAssumedColor, changeColor} = createModel(model, setModel)

    return (

        <div>
            <Pin color={getAssumedColor(0)} change={() => changeColor(0)}></Pin>
            <Pin color={getAssumedColor(1)} change={() => changeColor(1)}></Pin>
            <Pin color={getAssumedColor(2)} change={() => changeColor(2)}></Pin>
            <Pin color={getAssumedColor(3)} change={() => changeColor(3)}></Pin>

        </div>
    );
    }
    
    export default App;
