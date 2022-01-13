import Home from "./Home"
import React from "react"
import { Context } from "./context"

const Main = () => {
    const [data, setdata] = React.useState()


    const covidfetch = async () => {

        try {

            const api = await fetch("https://data.covid19india.org/v4/min/data.min.json ")
            const data = await (await fetch(api.url)).json();
            setdata(data);
        } catch (error) {
            console.log(error.message);
        }

    }
    
    React.useEffect(() => {
        covidfetch()
    }, [])
    if (data ) {
        return (
            <Context.Provider value={data}>
                 <Home />
            </Context.Provider>
        )
    }

    return null
}

export default Main