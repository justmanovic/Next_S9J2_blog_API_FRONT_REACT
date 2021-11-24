import { useContext } from "react";
import MyContext from "../store/global";

const SignUpForm = () => {

  const ctx = useContext(MyContext)
  const {signUp, signUpInfos, setSignUpInfos} = ctx

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
