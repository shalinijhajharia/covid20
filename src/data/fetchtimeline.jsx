import React from "react"
import { states } from "../components/states"


export const FetchTimelineData = () => {
    const [timeline, settimeline] = React.useState()

    const fetchtimelinedata = async () => {
        try {

            const api = await fetch("https://data.covid19india.org/v4/min/timeseries.min.json")
            const data = await (await fetch(api.url)).json();
            settimeline(data);
        } catch (error) {
            console.log(error.message);
        }

    }
    React.useEffect(() => {
        fetchtimelinedata()
    }, [])

    const data = []
    if (timeline) {
        Object.keys(timeline).forEach((ele) => {
            if (ele !== "UN") {
                const name = states[ele] ? states[ele] : ele
                let confirmed = 0
                let recovered = 0
                let deceased = 0
                const date = Object.values(timeline[ele]["dates"]).splice(Object.values(timeline[ele]["dates"]).length - 30, Object.values(timeline[ele]["dates"]).length)
                date.forEach(ele => {
                    const keys = Object.keys(ele['total'])
                    confirmed += keys.includes("confirmed") ? ele["total"]["confirmed"] : 0
                    recovered += keys.includes("recovered") ? ele["total"]["recovered"] : 0
                    deceased += keys.includes("deceased") ? ele["total"]["deceased"] : 0
                });
                data.push({
                    name: name,
                    confirmed: confirmed,
                    active: (confirmed - (recovered + deceased)),
                    recovered: recovered,
                    deceased: deceased,
                });
            }



        });
    }
    return data

}