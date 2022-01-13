import React from "react"

import { Context } from "./context"

const Overall = () => {
    const [overall] = React.useState(React.useContext(Context))

    const [tested, settested] = React.useState(0)
    const [testeddate, settesteddate] = React.useState(0)
    if (overall && tested === 0) {
        const confirm = Object.keys(overall).map(ele => {
            return overall[ele]['total']['tested']
        }).reduce((prev, ele) => prev + ele)
        settested(confirm)
        const date = Object.keys(overall).map(ele => {
            return overall[ele]['meta']['tested']['date']
        })
        settesteddate([...new Set(date)][0])
    }

    return (
        <React.Fragment>
            <div>
                <h1>India</h1>
                <p>Last Updated on {new Date(testeddate).toDateString()}</p>
            </div>
            <div>
                <p>Tested</p>
                <h4><strong>{tested.toLocaleString()}</strong></h4>
                <p>As of {new Date(testeddate).toDateString()} per source </p>
            </div>
        </React.Fragment>
    )
}

export default Overall