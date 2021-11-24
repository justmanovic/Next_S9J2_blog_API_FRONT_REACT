import {useContext} from "react"
import MyContext from "../store/global";

import Post from "./Post"

const PostsList = ({token }) => {

  const ctx = useContext(MyContext)
  const { articles } = ctx

  const deleteArticle = async(e, articleId) => {
    e.preventDefault()
    const configObject = {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }
    const res = await fetch(`http://localhost:3000/articles/${articleId}`, configObject)
    const data = await res.json()
    console.log(data)
  }

  return (
    <div>
      <h2>Liste des articles</h2>
      {articles.sort((a,b) => b.id - a.id).map((article) => <Post key={article.id} article={article} deleteArticle={deleteArticle} token={token} />)}
    </div>
  );
};

export default PostsList;
