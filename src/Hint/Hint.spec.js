import { fireEvent, render } from '@testing-library/react';
import { RED, BLUE, YELLOW, GREEN, PURPLE, ORANGE, PINK, BROWN } from "testmastermind/src/colors"
import Hint from "./Hint"
import { FITS, PARTIALLY, WRONG } from "testmastermind/src/hints";

describe('Hint', () => {
    describe('color', () => {
      
        it('should be FITS when the colors position FITS', () => {
            const { container } = render(<Hint color={FITS} />)
            expect(container.querySelector(".Hint--fits")).not.toBeNull()
        })

        it('should be PARTIALLY when color is placed PARTIALLY right', () => {
            const { container } = render(<Hint color={PARTIALLY} />)
            expect(container.querySelector(".Hint--partially")).not.toBeNull()
        })

        it('should be WRONG when color is placed WRONG', () => {
            const { container } = render(<Hint color={WRONG} />)
            expect(container.querySelector(".Hint--wrong")).not.toBeNull()
        })

        it('should warn when property color is something else', () => {
            jest.spyOn(console, "error").mockImplementation(() => { })
            const { container } = render(<Hint color={"UNDEFINED STATE"} />)
            expect(console.error).toHaveBeenCalled()
        })
    })

})