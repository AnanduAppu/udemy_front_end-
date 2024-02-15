
import ReactPlayer from 'react-player'

function Videoplayer() {
 
  return (
   <>
   <ReactPlayer controls={true} url='https://www.youtube.com/watch?v=LXb3EKWsInQ' height="500px" width="750"/>
   </>
  )
}

export default Videoplayer