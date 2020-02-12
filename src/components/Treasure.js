import React, { useState, useEffect, useCallback } from 'react'
import Amplify, { API } from 'aws-amplify';

const Treasure = ({ teamName, teamID, onEscapeRoom }) => {
  const [correctResponses, setCorrectResponses] = useState([])
  const [loading, setLoading] = useState()
  const [value, setValue] = useState()
  const challenges = [
    'Snake',
    'Fizz Buzz',
    'Swagger',
    'Paint',
    'QR KOD',
    'Blue Screen',
    'Question',
    'Tower',
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
  const getSavedValues = useCallback((onLoad) => {
    setLoading(true)

    API.get('escapeRoom', '/competitions/' + teamID).then(response => {
      const result = getChallengeItems(response[0])
      if(!onLoad && result.length === correctResponses.length) {
        alert('Invalid code')
      }
      setValue('')
      setCorrectResponses(result)
      setLoading(false)
    }).catch(error => {
      setValue('')
      setLoading(false)
    });
  }, [correctResponses.length, teamID])

  useEffect(() => {
    getSavedValues(true)
  }, [getSavedValues])


  const saveValue = () => {
    let data = {
      body: {
        id: teamID,
        teamName: teamName,
        scores: [...correctResponses.map(item => item.value), value]
      }, 
    }

    API.put('escapeRoom', '/competitions', data).then(() => {
      getSavedValues()
    }).catch(() => {
      setValue('')
    });
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className={'treasure' + (loading ? ' treasure--loading' : '')}>
      <div>
        <div className="treasure__input">
          <input type="text" onChange={handleChange} value={value} placeholder="Code here.." />

          <button onClick={() => saveValue()} disabled={loading || value === ''}>Save</button>
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