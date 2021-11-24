import PostsList from "./components/PostsList";
import { useContext } from "react";
import CreatePostForm from "./components/CreatePostForm";
import LogInForm from "./components/LogInForm";
import SignUpForm from "./components/SignUpForm";
import WelcomeMessage from "./components/WelcomeMessage"
import ConnexionButtons from "./components/ConnexionButtons"
import MyContext from "./store/global";

function App() {
  const ctx = useContext(MyContext)
  const {token, showNewPostForm, signUpFormVisible, logInFormVisible, newPostVisible} = ctx

  return (
    <>
      <ConnexionButtons />

      {signUpFormVisible && <SignUpForm/>}
      {logInFormVisible &&  <LogInForm />}

       <WelcomeMessage  />

      {token && <small className="token">{token}</small>}
      {token && <button onClick={showNewPostForm}>New Post</button>}

      {newPostVisible &&  <CreatePostForm /> }

      <PostsList  />
    </>
  );
}

export default App;
