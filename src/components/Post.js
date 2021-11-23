import { useState } from "react";

const Post = ({article, deleteArticle, token }) => {
const [modifyMode, setModifyMode] = useState(false)
const [updatedArticle, setUpdatedArticle] = useState({updatedContent:article.content, updatedTitle:article.title})  

const updateArticle = (e, fieldToUpdate) => {
  setUpdatedArticle({...updatedArticle, [fieldToUpdate]:e.target.value})
}

   const showModifyForm = () => {
      setModifyMode(!modifyMode)
    }

    const modifyArticle = async(e, articleId) => {
    e.preventDefault()
    const configObject = {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body:JSON.stringify({
        content:updatedArticle.updatedContent,
        title:updatedArticle.updatedTitle
      })
    }
    const res = await fetch(`http://localhost:3000/articles/${articleId}`, configObject)
    const data = await res.json()
    console.log(data)
  }


  return (
      <div className="article">
          <h4>{article.id}</h4>
          <h4>{article.title}</h4>
          <p>{article.content}</p>
          <small>User n°{article.user_id}</small>
          {token && <button onClick={(e)=>deleteArticle(e, article.id)}>Supprimer</button>}
          {token && <button onClick={showModifyForm}>Modifier</button>}
          {modifyMode && (<form onSubmit={(e)=>modifyArticle(e, article.id)}>
            <div>
            <input defaultValue={article.title} onChange={(e)=>updateArticle(e, "updatedTitle")}/>
            </div>
            <div>
            <textarea defaultValue={article.content} onChange={(e)=>updateArticle(e, "updatedContent")} />
            </div>
            <button>Modify!</button>
          </form>)}
       </div>
  )
}

export default Post
