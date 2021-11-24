import MyContext from "../store/global"
import { useContext } from "react"

const WelcomeMessage = ({token}) => {
  const ctx = useContext(MyContext)
  console.log(ctx)
  return (
    <>
      {token &&<p> Connecté en tant que <b>{localStorage.getItem('email')}</b></p> || <p>Vous n'êtes pas connecté</p>}
      <h1>{ctx.customDetails}</h1>
      </>
  )
}

export default WelcomeMessage
