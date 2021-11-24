import PostsList from "./components/PostsList";
import { useState, useEffect, useContext } from "react";
import CreatePostForm from "./components/CreatePostForm";
import LogInForm from "./components/LogInForm";
import SignUpForm from "./components/SignUpForm";
import WelcomeMessage from "./components/WelcomeMessage"
import ConnexionButtons from "./components/ConnexionButtons"
import ContextProvider from "./store/ContextProvider";

function App() {
  const [newPostVisible, setNewPostVisible] = useState(false);
  const [signUpFormVisible, setSignUpFormVisible] = useState(false);
  const [logInFormVisible, setLogInFormVisible] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [postInfos, setPostInfos] = useState({
    newPostUser: "",
    newPostTitle: "",
    newPostContent: "",
  });
  const [logInInfos, setLogInInfos] = useState({ email: "", password: "" });
  const [signUpInfos, setSignUpInfos] = useState({ name:"", email: "", password: "" });
  const [articlesList, setArticlesList] = useState([]);


  const getArticles = async () => {
    const config = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    const res = await fetch("http://localhost:3000/articles", config);
    const data = await res.json();
    setArticlesList(data);
    console.log(data);
  };

  useEffect(() => {
    getArticles();
  }, []);


  const showSignUp = () => {
    setSignUpFormVisible(!signUpFormVisible);
  };

  const showLogIn = () => {
    setLogInFormVisible(!logInFormVisible);
  };

  const signUp = async (e) => {
    e.preventDefault();
    setToken("");
    setSignUpFormVisible(true);
    fetch("http://localhost:3000/users/", {
      body: JSON.stringify({
        user: {
          name:signUpInfos.name,
          email: signUpInfos.email,
          password: signUpInfos.password,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => {
        setLogInFormVisible(false);
        setSignUpFormVisible(false);
      })
      .catch((error) => console.error(error));
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setToken("");
  };

  const logIn = async (e) => {
    e.preventDefault();
    setToken("");
    fetch("http://localhost:3000/users/sign_in", {
      body: JSON.stringify({
        user: {
          email: logInInfos.email,
          password: logInInfos.password,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) =>
        response.headers.forEach((el) => {
          if (el.includes("Bearer")) {
            setLogInFormVisible(false);
            setSignUpFormVisible(false);
            localStorage.setItem('email',logInInfos.email)
            let token_jwt = el.split(" ")[1];
            setToken(token_jwt);
            localStorage.setItem("token", token_jwt);
          }
        })
      )
      .catch((error) => console.error(error));
  };

  const logOut = async () => {
    fetch("http://localhost:3000/users/sign_out", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((response) => {
     console.log(response) 
     clearLocalStorage();
    });
  };

  const showNewPostForm = () => {
    setNewPostVisible(!newPostVisible);
  };

  const createPost = async (e) => {
    e.preventDefault();

    const config = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user_id: postInfos.newPostUser,
        content: postInfos.newPostContent,
        title: postInfos.newPostTitle,
      }),
    };

    const res = await fetch("http://localhost:3000/articles", config);
    const data = await res.json();

    console.log(data);
  };

  return (
    <ContextProvider>
      <ConnexionButtons showSignUp={showSignUp} showLogIn={showLogIn} logOut={logOut} token={token} />

      {signUpFormVisible && (
        <SignUpForm
          signUp={signUp}
          signUpInfos={signUpInfos}
          setSignUpInfos={setSignUpInfos}
        />
      )}

      {logInFormVisible && (
        <LogInForm
          logIn={logIn}
          logInInfos={logInInfos}
          setLogInInfos={setLogInInfos}
        />
      )}

        <WelcomeMessage token={token} />

      {token && <small className="token">{token}</small>}
      {token && <button onClick={showNewPostForm}>New Post</button>}
      {newPostVisible && (
        <CreatePostForm
          createPost={createPost}
          postInfos={postInfos}
          setPostInfos={setPostInfos}
        />
      )}
      <PostsList token={token} articles={articlesList} />
    </ContextProvider>
  );
}

export default App;
