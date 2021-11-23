const LogInForm = ({ logIn, logInInfos, setLogInInfos }) => {
  const updateInfo = (e, infoToUpdate) => {
    setLogInInfos({ ...logInInfos, [infoToUpdate]: e.target.value });
  };

  return (
    <form onSubmit={logIn}>
      <div>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => updateInfo(e, "email")}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => updateInfo(e, "password")}
        />
      </div>
      <button>Se connecter</button>
    </form>
  );
};

export default LogInForm;
