import React, { useRef, useState } from 'react'

import Storage from '@aws-amplify/storage'
import Predictions from '@aws-amplify/predictions'

import CanvasDraw from "react-canvas-draw"
import { getImageByteData, canvasToImage } from '../helpers'
import uuid from 'uuid/v1'

const Paint = (props) => {
  const [src, setSrc] = useState()
  const ref = useRef(null)

  const saveDrawing = () => {
    const arrayBuffer = getImageByteData("canvas", 0.5)
    const file = `doodles/${uuid()}.jpg`
    console.log(file, arrayBuffer)
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
        console.log(labels)
        labels.forEach(object => {
          const { name, metadata } = object
          if(name === 'Face' && metadata.confidence > 80) {
            alert('Perfect, you painted a face! Here is your code: 2046')
          }
        })
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
      <CanvasDraw 
        ref={ref} 
        // canvasWidth={791} 
        canvasWidth="100%"
        canvasHeight={417} 
        lazyRadius={0} 
        hideGrid={true}
        brushRadius={4}
      />
    </div>
  )
}

export default Paint