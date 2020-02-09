import React, { useState, useEffect, useCallback } from 'react'
import Amplify, { API } from 'aws-amplify';

const Treasure = ({ teamName, teamID, onEscapeRoom }) => {
  const [correctResponses, setCorrectResponses] = useState([])
  const [value, setValue] = useState()
  const challenges = [
    'Snake',
    'Fizz Buzz',
    'Swagger',
    'Paint',
    'QR KOD',
    'Blue Screen',
  ]

  useEffect(() => {
    if(correctResponses.length === challenges.length) {
      onEscapeRoom()
    }
  }, [correctResponses, challenges, onEscapeRoom])

  const getChallengeItems = (attributes) => {
    const values = Object.values(attributes).filter(key => key !== 'id' && key !== 'teamName')
    const result = []
    Object.keys(attributes).forEach((key, i) => {
      if(key !== 'id' && key !== 'teamName') {
        result.push({
          type: key,
          value: values[i]
        })
      }
    })
    return result
  }
  const getSavedValues = useCallback(() => {
    API.get('escapeRoom', '/competitions/' + teamID).then(response => {
      const result = getChallengeItems(response[0])
      setValue('')
      setCorrectResponses(result)
    }).catch(error => {
      setValue('')
      console.log(error)
    });
  }, [teamID])

  useEffect(() => {
    getSavedValues()
  }, [getSavedValues])


  const saveValue = () => {
    let data = {
      body: {
        id: teamID,
        teamName: teamName,
        scores: [...correctResponses.map(item => item.value), value]
      }, 
    }

    API.put('escapeRoom', '/competitions', data).then(response => {
      getSavedValues()
    }).catch(console.log);
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className="treasure">
      <div>
        <div className="treasure__input">
          <input type="text" onChange={handleChange} placeholder="Code here.." />

          <button onClick={() => saveValue()}>Save</button>
        </div>
        
        <div className="treasure__completed-challenges">
          {correctResponses.length }/{challenges.length}
        </div>
        {correctResponses.map((({type}) => (
          <div className="treasure__correct" key={type}>
            {type}
          </div>
        )))}
      </div>
    </div>
  )
}

export default Treasure