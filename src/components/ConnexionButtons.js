import { useContext } from "react"
import MyContext from "../store/global"

const ConnexionButtons = () => {

  const ctx = useContext(MyContext)
  const {showSignUp, showLogIn, logOut, token} = ctx

  return (
    <>
      {!token && (
        <>
          <button onClick={showSignUp}>SIGNUP</button>
          <button onClick={showLogIn}>LOGIN</button>
        </>
      )}

{token && <button onClick={logOut} className="logout">LOG OUT</button>}
    </>
  )
}

export default ConnexionButtons
