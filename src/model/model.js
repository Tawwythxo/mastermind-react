
import { cloneDeep } from 'lodash';
import * as defaultLogic from 'testmastermind/src/mastermind'
import { FITS, PARTIALLY, WRONG } from "testmastermind/src/hints";
import * as colors from 'testmastermind/src/colors';
const { RED } = colors;

var roundsnr = 0;

export function initialModel(logic = defaultLogic) {

    const randomCode = logic.generateCode(Math.random); 

    return {
        assumedColors: [RED, RED, RED, RED],
        rounds: [],
        code: randomCode,
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
            //Object object
            const newModel = cloneDeep(model)
         
            newModel.rounds.push({
                round:  1,
                assumedColors: model.assumedColors,
                result: logic.checkCode(newModel.code, newModel.assumedColors)
            })

            //console.log(newModel.round + " ! " + newModel.assumedColors + " ? " + newModel.result)
            
            //object object newModel in function setModel
            setModel(newModel)
          
        },

        getRounds: () => {
        }


    }
}
