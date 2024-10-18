import Profile from '../components/Profile/Profile'
import MainLinks from '../components/MainLinks/MainLinks'
// import BackgroundVideoWithControls from '../components/VideoBackground/VideoBackground'

export default function Core() {
  const Video = '...'
  const mainUrl = 'https://core.kipoha.fun/'
  const meneroUrl = 'https://menero.kipoha.fun/'
  const sourceCodeUrl = 'https://github.com/kipoha/discord-profile'
  return (
    <>
      {/* <BackgroundVideoWithControls videoUrl={Video} /> */}
      <Profile/>
      <MainLinks mainUrl={mainUrl} meneroUrl={meneroUrl} sourceCodeUrl={sourceCodeUrl} /> 
    </>
  )
}
