import { generateCode } from 'testmastermind/src/mastermind'
import { initialModel, createModel } from "./model"
import { RED, GREEN, YELLOW, BLUE, PURPLE, ORANGE, PINK, BROWN } from "testmastermind/src/colors"
import { LOST, WON, PENDING } from "testmastermind/src/gameProgress";

import { FITS, PARTIALLY, WRONG } from "testmastermind/src/hints"


describe('Model', () => {

    describe('initialModel', () => {

        it('should have assumedColors', () => {
            expect(initialModel()).toEqual(expect.objectContaining({assumedColors: [RED, RED, RED, RED]}))
        })

        it('should have rounds', () => {
            expect(initialModel()).toEqual(expect.objectContaining({ rounds: [] }))
        })
        
        it('should have code', () => {
            expect(initialModel()).not.toBe(expect.objectContaining({ code: [RED, RED, RED, RED] }))
        })

        it('should have gameState', () => {
            expect(initialModel()).not.toBe(expect.objectContaining({ gamestate: [PENDING] }))
        })

        it('should have code with 4 random colors', () => {
            const logic = { generateCode: jest.fn(() => [RED, GREEN, BLUE, YELLOW]) };
            
            expect(initialModel(logic)).not.toBe(expect.objectContaining({ code: [RED, GREEN, BLUE, YELLOW] }))
        })

    
        
    })

    describe('createModel', () => {
        
        let setModelSpy, logicSpy;
        function init(model, result) {
            setModelSpy = jest.fn()
            logicSpy = jest.createMockFromModule('testmastermind/src/mastermind');
            logicSpy.checkCode.mockReturnValueOnce(result);
            return createModel(model, setModelSpy, logicSpy)
        }

        describe('get assumedColors', () => {
            it('should extract color by index', () => {
                const { getAssumedColor } = init({ assumedColors: [RED, BLUE, GREEN, YELLOW] })
                expect(getAssumedColor(0)).toEqual(RED)
            })

            it('should extract color by index', () => {
                const { getAssumedColor } = init({ assumedColors: [RED, BLUE, GREEN, YELLOW] })
                expect(getAssumedColor(1)).toEqual(BLUE)
            })

            it('should extract color by index', () => {
                const { getAssumedColor } = init({ assumedColors: [RED, BLUE, GREEN, YELLOW] })
                expect(getAssumedColor(2)).toEqual(GREEN)
            })

            it('should extract color by index', () => {
                const { getAssumedColor } = init({ assumedColors: [RED, BLUE, GREEN, YELLOW] })
                expect(getAssumedColor(3)).toEqual(YELLOW)
            })
        })


        describe('changeColors', () => {
            

            const defaultModel = { assumedColors: [RED, RED, RED, RED] };

            [

                { index: 0, resultModel: { assumedColors: [GREEN, RED, RED, RED] } },
                { index: 1, resultModel: { assumedColors: [RED, GREEN, RED, RED] } },
                { index: 2, resultModel: { assumedColors: [RED, RED, GREEN, RED] } },
                { index: 3, resultModel: { assumedColors: [RED, RED, RED, GREEN] } },

            ].forEach(({ index, resultModel }) => {
                it('should change color of index' +  index, () => {
                    const { changeColor } = init(defaultModel)
                    changeColor(index)
                    expect(setModelSpy).toHaveBeenCalledWith(resultModel)
                })
            });


            [

                { startingColor: { assumedColors: [RED, RED, RED, RED] }, resultModel: { assumedColors: [GREEN, RED, RED, RED]} },
                { startingColor: { assumedColors: [GREEN, RED, RED, RED] }, resultModel: { assumedColors: [YELLOW, RED, RED, RED] } },
                { startingColor: { assumedColors: [YELLOW, RED, RED, RED] }, resultModel: { assumedColors: [BLUE, RED, RED, RED] } },
                { startingColor: { assumedColors: [BLUE, RED, RED, RED] }, resultModel: { assumedColors: [PURPLE, RED, RED, RED] } },
                { startingColor: { assumedColors: [PURPLE, RED, RED, RED] }, resultModel: { assumedColors: [ORANGE, RED, RED, RED] } },
                { startingColor: { assumedColors: [ORANGE, RED, RED, RED] }, resultModel: { assumedColors: [PINK, RED, RED, RED] } },
                { startingColor: { assumedColors: [PINK, RED, RED, RED] }, resultModel: { assumedColors: [BROWN, RED, RED, RED] } },
                { startingColor: { assumedColors: [BROWN, RED, RED, RED] }, resultModel: { assumedColors: [RED, RED, RED, RED] } },

            ].forEach(({ startingColor, resultModel }) => {
                it('should change from color1 to color2', () => {
                    const { changeColor } = init(startingColor)
                    changeColor(0)
                    expect(setModelSpy).toHaveBeenCalledWith(expect.objectContaining(resultModel))
                })
            })

            
        })

        describe('check', () => {

            const expectedResult = [FITS, FITS, WRONG, PARTIALLY];


            beforeEach(() => {
                const { check } = init(initialModel(), expectedResult )
                check()

            })
            it('should call setModel', () => {

                expect(setModelSpy).toHaveBeenCalled()
            })



            describe('round', () => {
                
                it('should contain a round number', () => {

                    expect(setModelSpy.mock.calls[0][0].rounds[0]).toEqual(expect.objectContaining({ round: 2 }))
                })
               

                it('should contain a copy of assumed colors', () => {

                    expect(setModelSpy.mock.calls[0][0].rounds[0]).toEqual(expect.objectContaining({ assumedColors: [RED, RED, RED, RED] }))
                })

                it('should contain result', () => {

                    expect(setModelSpy.mock.calls[0][0].rounds[0]).toEqual(expect.objectContaining({ result: expectedResult }))
                })

                it('should call checkCode with code and guess', () => {
                    const { check } = init({
                        assumedColors: [RED, RED, RED, RED],
                        rounds: [],
                        code: [RED, GREEN, BLUE, YELLOW],
                        result: [WRONG, WRONG, WRONG, WRONG]

                    })
                    check()
                    expect(logicSpy.checkCode).toHaveBeenCalledWith([RED, GREEN, BLUE, YELLOW], [RED, RED, RED, RED] )
                })

                it('should call checkCode with code and guess', () => {
                    const { check } = init({
                        assumedColors: [RED, RED, RED, RED],
                        rounds: [{ round: 1, assumedColors: [RED, RED, RED, RED], result: [WRONG, WRONG, WRONG, WRONG] }],
                        code: [RED, GREEN, BLUE, YELLOW],
                        result: [WRONG, WRONG, WRONG, WRONG]

                    })
                    check()
                    expect(setModelSpy.mock.calls[0][0].rounds.length).toEqual(2)
                })

            })


        })



        describe('newGame', () => {

            it('should have assumedColors', () => {
                expect(initialModel()).toEqual(expect.objectContaining({ assumedColors: [RED, RED, RED, RED] }))
            })

            it('should have rounds', () => {
                expect(initialModel()).toEqual(expect.objectContaining({ rounds: [] }))
            })

            it('should have code', () => {
                expect(initialModel()).not.toBe(expect.objectContaining({ code: [RED, RED, RED, RED] }))
            })

            it('should have gameState', () => {
                expect(initialModel()).not.toBe(expect.objectContaining({ gamestate: [PENDING] }))
            })

            it('should have code with 4 random colors', () => {
                const logic = { generateCode: jest.fn(() => [RED, GREEN, BLUE, YELLOW]) };

                expect(initialModel(logic)).not.toBe(expect.objectContaining({ code: [RED, GREEN, BLUE, YELLOW] }))
            })
        })
      




    })
})