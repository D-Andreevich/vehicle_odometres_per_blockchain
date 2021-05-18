import React from "react"
import { AccountData } from "@drizzle/react-components";

const ShowAccount = props => {

  return (
      <div className="section">
          <h2>Active Account</h2>
          <AccountData
              accountIndex={0}
              units="ether"
              precision={3}
          />
          <hr/>
      </div>
  )
}

export default ShowAccount