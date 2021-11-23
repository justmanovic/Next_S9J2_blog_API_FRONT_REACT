import { useState, useEffect } from "react";
import Post from "./Post"

const PostsList = ({ articles, token }) => {


  const deleteArticle = async(e, articleId) => {
    e.preventDefault()
    const configObject = {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "delete",
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
