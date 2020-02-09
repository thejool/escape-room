import React, { useRef, useState } from 'react'

import Storage from '@aws-amplify/storage'
import Predictions from '@aws-amplify/predictions'

import CanvasDraw from "react-canvas-draw"
import { getImageByteData, canvasToImage } from '../helpers'
import uuid from 'uuid/v1'

const Paint = (props) => {
  const ref = useRef(null)

  const saveDrawing = () => {
    const arrayBuffer = getImageByteData("canvas", 0.5)
    const file = `doodles/${uuid()}.jpg`

    uploadToS3(file, arrayBuffer)
  }

  const labelPainting = (key) => {
    Predictions.identify({
      labels: {
        source: {
          key: key,
          level: 'public', //optional, default is the configured on Storage category
        },
        type: "LABELS",
      }
    }).then(response => {
        const { labels } = response
        let correct = false
        console.log(labels)
        labels.forEach(object => {
          const { name, metadata } = object
          if(name === 'Face' && metadata.confidence > 80) {
            correct = true
            alert('Wow, you painted Per beautifully! Here is your code: 1093')
          }
        })

        if(!correct && labels.length >= 0) {
          alert('Hmm it looks like you painted a ' + labels[0].name)
        }
    }).catch(err => console.log('fel', err))
  }

  const uploadToS3 = (file,data) => {
    Storage.put(file, data)
    .then (result => {
      console.log(result)
      labelPainting(result.key)
    })
    .catch(err => {
      window.alert("Failed to upload doodle: ", err)
      console.log(err)
    })
  }

  return (
    <div className="paint">
      <button onClick={saveDrawing}>Save</button>
      <button onClick={() => ref.current.clear()}>Clear</button>
      <button onClick={() => ref.current.undo()}>Undo</button>
      <CanvasDraw 
        ref={ref} 
        // canvasWidth={791} 
        canvasWidth="100%"
        canvasHeight={462} 
        lazyRadius={0} 
        hideGrid={true}
        brushRadius={4}
      />
    </div>
  )
}

export default Paint