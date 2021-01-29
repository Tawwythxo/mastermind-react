import { fireEvent, render } from '@testing-library/react';
import { RED, BLUE, YELLOW, GREEN, PURPLE, ORANGE, PINK, BROWN} from "testmastermind/src/colors"
import Pin from "./Pin"

describe('Pin', () => {
    describe('Color', () => {
        it('should be red when property color is red', () => {
            const {container} = render(<Pin color={RED} />)
            expect(container.querySelector(".Pin--red")).not.toBeNull()
        })

        it('should be blue when property color is blue', () => {
            const { container } = render(<Pin color={BLUE} />)
            expect(container.querySelector(".Pin--blue")).not.toBeNull()
        })

       /* it('should be yellow when property color is yellow', () => {
            const { container } = render(<Pin color={YELLOW} />)
            expect(container.querySelector(".Pin--yellow")).not.toBeNull()
        })

        it('should be green when property color is green', () => {
            const { container } = render(<Pin color={GREEN} />)
            expect(container.querySelector(".Pin--green")).not.toBeNull()
        })

        it('should be purple when property color is purple', () => {
            const { container } = render(<Pin color={PURPLE} />)
            expect(container.querySelector(".Pin--purple")).not.toBeNull()
        })

        it('should be orange when property color is orange', () => {
            const { container } = render(<Pin color={ORANGE} />)
            expect(container.querySelector(".Pin--orange")).not.toBeNull()
        })

        it('should be pink when property color is pink', () => {
            const { container } = render(<Pin color={PINK} />)
            expect(container.querySelector(".Pin--pink")).not.toBeNull()
        })

        it('should be brown when property color is brown', () => {
            const { container } = render(<Pin color={BROWN} />)
            expect(container.querySelector(".Pin--brown")).not.toBeNull()
        })
        */
        it('should warn when property color is black', () => {
            jest.spyOn(console, "error").mockImplementation(() => { })
            const { container } = render(<Pin color={"BLACK"} />)
            expect(console.error).toHaveBeenCalled()
        })


    })
    describe('Change', () => {
        it('should allow to take a function', () => {
            jest.spyOn(console, "error").mockImplementation(() => { })
            render(<Pin color={RED} change = "null"/>)
            expect(console.error).toHaveBeenCalled()
        })
        it('should evaluate change on click', () => {
            const spy = jest.fn()
            const { container } = render(<Pin color={RED} change={spy} />)
            fireEvent.click(container.querySelector(".Pin"))
            expect(spy).toHaveBeenCalled()
        })
    })


})