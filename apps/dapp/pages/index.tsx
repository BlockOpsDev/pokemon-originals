import { useState, useEffect } from 'react'
import { Button } from '@acme/ui'
import { matchingTextColor, randomColor } from '@acme/utils'

export default function Index() {
  const [bgColor, setBgColor] = useState('')
  const [textColor, setTextColor] = useState('')
  const changeColor = () => {
    const bg = randomColor()
    setBgColor(bg)
    setTextColor(matchingTextColor(bg))
  }

  useEffect(changeColor, [])

  return (
    <div>
      {bgColor && textColor && (
        <>
          <div className='h-12 bg-black text-white flex justify-center items-center'>Test</div>
          <Button
            className='hover:bg-blue-500'
            style={{
              backgroundColor: bgColor,
              color: textColor,
            }}
            onClick={changeColor}
          >
            Change Color
          </Button>
        </>
      )}
    </div>
  )
}