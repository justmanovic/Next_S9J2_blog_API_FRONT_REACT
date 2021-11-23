const SignUpForm = ({ signUp, signUpInfos, setSignUpInfos }) => {
  const updateInfo = (e, infoToUpdate) => {
    setSignUpInfos({ ...signUpInfos, [infoToUpdate]: e.target.value });
  };

  return (
    <form onSubmit={signUp}>
      <div>
        <input
          type="text"
          placeholder="Your name"
          onChange={(e) => updateInfo(e, "name")}
        />
      </div>
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
      <button>S'inscrire</button>
    </form>
  );
};

export default SignUpForm;
