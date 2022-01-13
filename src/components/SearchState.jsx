import React from "react"
import { FetchTimelineData } from "../data/fetchtimeline";

const SearchState = () => {
    const [searchvalue, setsearchvalue] = React.useState()
    const data = FetchTimelineData()

    const search = (e) => {
        e.preventDefault()

        const value = document.forms["searchform"]["search"].value
        document.forms["searchform"]["search"].placeholder = value
        const filterstate = data.find(ele => ele.name === value)
        setsearchvalue(filterstate)
        document.forms["searchform"].reset()
    }
    console.log(searchvalue);
    const statedetails = searchvalue ? Object.keys(searchvalue).map(ele =>
        <div className={ele} key={ele} >
            <p>{ele.charAt(0).toUpperCase() + ele.slice(1)}</p>
            <h2>{searchvalue[ele].toLocaleString()}</h2>
        </div>
    ).splice(1,) : null
    return (

        <React.Fragment>
            <form name="searchform" onSubmit={search}>
                <input list="state" name="search" placeholder="Delhi" required autoFocus={true} />
                <p>Press enter to submit</p>
                <datalist id="state">
                    {
                        data.map(ele => <option key={ele.name} value={ele.name} />)
                    }
                </datalist>
            </form>

            {searchvalue ?
                <div className="displaysearch">
                    {statedetails}
                </div>
                : null
            }
        </React.Fragment>
    )
}

export default SearchState