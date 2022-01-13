import React from "react"
import { Context } from "./context"
import { states } from "./states";



const StateWise = () => {



  const [overall] = React.useState(React.useContext(Context))
  const statewise = []
  Object.keys(overall).map(ele =>

    statewise.push({
      state: states[ele] ? states[ele] : ele,

      confirmed: overall[ele]['total']['confirmed'],
      recovered: overall[ele]['total']['recovered'],
      deceased: overall[ele]['total']['deceased'],
      tested: overall[ele]['total']['tested'],
      active: function () {
        return (this.confirmed - (this.recovered + this.deceased))
      },
      recoveryrate: function () {
        return ((this.recovered / this.confirmed) * 100).toFixed(2)
      },
      activerate: function () {
        return ((this.deceased / this.confirmed) * 100).toFixed(2)
      }
    })
  )
  statewise.sort((a, b) => b.confirmed - a.confirmed)

  const rows = statewise.map(ele =>
    <tr key={ele.state}>
      <td>{ele.state}</td>
      <td className="number">{ele.confirmed}</td>
      <td className="number"><span className="active">↑{ele.activerate()}</span><br />{ele.active()}</td>
      <td className="number"><span className="recovery">↑{ele.recoveryrate()}</span><br />{ele.recovered}</td>
      <td className="number">{ele.deceased}</td>
      <td className="number">{ele.tested}</td>
    </tr>
  )


  return (
    <table>
      <thead>
        <tr>
          <th>State/UT</th>
          <th>Confirmed</th>
          <th>Active</th>
          <th>Recovered</th>
          <th>Deceased</th>
          <th>Tested</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

export default StateWise
