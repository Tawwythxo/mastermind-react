import { initialModel, createModel } from "./model"
import { RED, BLUE, YELLOW, GREEN, PURPLE, ORANGE, PINK, BROWN } from "testmastermind/src/colors"


describe('Model', () => {
    describe('initialModel', () => {
        it('should have assumedColors', () => {
            expect(initialModel()).toEqual(expect.objectContaining({assumedColors: [RED, RED, RED, RED]}))
        })
        
    })
    describe('createModel', () => {
        function init(model) {
            return createModel(model)
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
    })
})