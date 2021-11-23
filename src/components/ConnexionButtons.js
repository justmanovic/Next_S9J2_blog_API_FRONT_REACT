const ConnexionButtons = ({showSignUp, showLogIn, logOut, token }) => {
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
