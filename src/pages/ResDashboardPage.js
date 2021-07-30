import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { Button } from 'react-bootstrap'
import firebase from 'firebase'

const ResDashboardPage = () => {


  return (
    <div >
      <br /> <br />
      <div>
        <h3 style={{"text-align":"left"}}>Dashboard</h3>
      </div>
      <iframe width="1500" height="2000" src="https://datastudio.google.com/embed/reporting/bf0a739c-5a10-4689-a2aa-917398b74da9/page/ZbpWC" frameborder="0"  allowfullscreen></iframe>
      {/* <iframe width="1500" height="2000" src="https://datastudio.google.com/embed/reporting/3532cedc-04b9-4352-93ca-ba9082191b0f/page/ftnWC" frameborder="6" allowfullscreen></iframe>     */}
    </div>
  )
}

export default ResDashboardPage
