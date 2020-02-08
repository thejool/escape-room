import React, { useState, useEffect } from 'react'
import Amplify, { API } from 'aws-amplify';

const Treasure = ({ teamName, teamID }) => {
  const [correctResponses, setCorrectResponses] = useState([])
  const [value, setValue] = useState()

  useEffect(() => {
    const getSavedValues = () => {
      API.get('escapeRoom', '/competitions/object?id=' + teamID).then(response => {
        // Add your code here
        console.log('response')
        console.log(response)
      }).catch(error => {
        console.log('error')
        console.log(error)
      });
    }

    getSavedValues()
  }, [teamID])


  const saveValue = () => {
    let data = {
      body: {
        id: teamID,
        teamName: teamName,
        scores: [value]
      }, 
    }

    API.put('escapeRoom', '/competitions', data).then(response => {
      // Add your code here
      console.log(response)
    }).catch(error => {
      console.log(error.response)
    });
  }

  return (
    <div className="treasure">
      <div>
        <div className="treasure--input">
          <input onChange={setValue} placeholder="Code here.." />

          <button onClick={saveValue}>Save</button>
        </div>
        
        {correctResponses.map(((response, i) => (
          <div class="correct">
            {response}
          </div>
        )))}
      </div>
    </div>
  )
}

export default Treasure