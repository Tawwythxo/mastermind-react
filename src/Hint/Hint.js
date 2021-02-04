import PropTypes from "prop-types"
import * as hints from "testmastermind/src/hints"

export default function Hint({ color }) {
    const hintColor = color.toLowerCase();
    const classes = ["Hint"].concat(["Hint--" + hintColor])
    return (<button className={classes.join(" ")}></button>)
}

Hint.propTypes = {
    color: PropTypes.oneOf(Object.keys(hints)),
}