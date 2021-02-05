
import { cloneDeep } from 'lodash';
import * as defaultLogic from 'testmastermind/src/mastermind'
import { LOST, WON, PENDING } from "testmastermind/src/gameProgress";
import * as colors from 'testmastermind/src/colors';
const { RED } = colors;

var roundCount = 0;

export function initialModel(logic = defaultLogic) {

    const randomCode = logic.generateCode(Math.random); 

    return {
        assumedColors: [RED, RED, RED, RED],
        rounds: [],
        code: randomCode,
        gamestate: [PENDING]
    }
}

export function createModel(model, setModel, logic = defaultLogic) {
    return {
      
        getAssumedColor: (index) => model.assumedColors[index],
        

        changeColor: (index) => {
          
            const newModel = cloneDeep(model)
            let colorList = Object.keys(colors)
            colorList = colorList.slice(0, colorList.length - 1)
            const colorIndex = colorList.findIndex((c) => { return model.assumedColors[index] === c })
            const newColorIndex = (colorIndex < colorList.length - 1) ? colorIndex + 1 : 0;

            newModel.assumedColors[index] = colorList[newColorIndex];
            setModel(newModel);
           
        },

        //click check button to clone the colors which were added before
        check: () => {
      
            const newModel = cloneDeep(model)
           

            newModel.rounds.push({
                round: roundCount = roundCount + 1,
                assumedColors: model.assumedColors,
                result: logic.checkCode(newModel.code, newModel.assumedColors)
            })

            setModel(newModel)
                      
        },

       

        newGame: () => {
            roundCount = 0;
            const randomCode = logic.generateCode(Math.random); 
            var newGame = {
                assumedColors: [RED, RED, RED, RED],
                rounds: [],
                code: randomCode,
                gamestate: [PENDING]
            }
            
            setModel(newGame);


        }

       
    }

}



