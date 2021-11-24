import { useState, useEffect } from "react";
import MyContext from "./global";

const ContextProvider = ({ children }) => {
  const [articlesList, setArticlesList] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [logInInfos, setLogInInfos] = useState({ email: "", password: "" });
  const [signUpInfos, setSignUpInfos] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signUpFormVisible, setSignUpFormVisible] = useState(false);
  const [logInFormVisible, setLogInFormVisible] = useState(false);
  const [newPostVisible, setNewPostVisible] = useState(false);

  const [postInfos, setPostInfos] = useState({
    newPostUser: "",
    newPostTitle: "",
    newPostContent: "",
  });
  // **********************************************************************************************************************************************

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
            let token_jwt = el.split(" ")[1];
            setToken(token_jwt);
            localStorage.setItem("email", logInInfos.email);
            localStorage.setItem("token", token_jwt);
          }
        })
      )
      .catch((error) => console.error(error));
  };

  // **********************************************************************************************************************************************

  const signUp = async (e) => {
    console.log("JE ME CONNECTE")
    e.preventDefault();
    setToken("");
    setSignUpFormVisible(true);
    fetch("http://localhost:3000/users/", {
      body: JSON.stringify({
        user: {
          name: signUpInfos.name,
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

  const showSignUp = () => {
    setSignUpFormVisible(!signUpFormVisible);
  };

  const showLogIn = () => {
    setLogInFormVisible(!logInFormVisible);
  };

  // **********************************************************************************************************************************************

  const logOut = async () => {
    console.log("LOGOUUT")
    fetch("http://localhost:3000/users/sign_out", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((response) => {
      console.log(response);
      clearLocalStorage();
    });
  };

  // **********************************************************************************************************************************************

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

  // **********************************************************************************************************************************************

  const createPost = async (e) => {
    e.preventDefault();

    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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

  // **********************************************************************************************************************************************

  const showNewPostForm = () => {
    setNewPostVisible(!newPostVisible);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <MyContext.Provider
      value={{
        token: token,
        articles: articlesList,
        logIn: logIn,
        logOut:logOut,
        signUp: signUp,
        logInInfos: logInInfos,
        setLogInInfos: setLogInInfos,
        signUpInfos:signUpInfos,
        setSignUpInfos: setSignUpInfos,
        signUpFormVisible: signUpFormVisible,
        setSignUpFormVisible: setSignUpFormVisible,
        logInFormVisible: logInFormVisible,
        setLogInFormVisible: setLogInFormVisible,
        showSignUp: showSignUp,
        showLogIn: showLogIn,
        createPost: createPost,
        postInfos: postInfos,
        setPostInfos: setPostInfos,
        showNewPostForm:showNewPostForm,
        newPostVisible:newPostVisible
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
