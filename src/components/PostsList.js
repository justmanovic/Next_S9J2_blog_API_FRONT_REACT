import { useState, useEffect } from "react";

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
      {articles.map((article) => (
        <div className="article">
          <h4>{article.title}</h4>
          <p>{article.content}</p>
          <small>User n°{article.user_id}</small>
          <button onClick={(e)=>deleteArticle(e, article.id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
