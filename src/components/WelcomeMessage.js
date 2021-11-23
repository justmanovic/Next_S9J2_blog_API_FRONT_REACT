const WelcomeMessage = ({token}) => {
  return (
      token &&<p> Connecté en tant que <b>{localStorage.getItem('email')}</b></p> || <p>Vous n'êtes pas connecté</p>
  )
}

export default WelcomeMessage
