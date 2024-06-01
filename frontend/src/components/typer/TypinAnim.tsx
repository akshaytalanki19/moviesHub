import React from 'react'
import { TypeAnimation } from 'react-type-animation';
const typinganimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'welcome movies list',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'you can find different types of movies here',
        1000,
        'you can save add them to your list',
        1000,
        'sharing your list is also possible',
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em',color:"white", display: 'inline-block', textShadow:"1px 1px 20px #000" }}
      repeat={Infinity}
    />
  )
}

export default typinganimation
