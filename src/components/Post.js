import { useEffect, useState } from "react"

const Post = ({article, deleteArticle}) => {

  const [myArticle, setMyArticle] = useState(null)

  useEffect(()=> {
    setMyArticle(article)
  },[article])


  const beforeDeleteArticle = (e, articleId) => {
    setMyArticle(null)
    deleteArticle(e, articleId)
  }

  return (
    myArticle && ( <div className="article">
              <h4>{article.title}</h4>
              <p>{article.content}</p>
              <small>User n°{article.user_id}</small>
              <button onClick={(e)=>beforeDeleteArticle(e, article.id)}>Supprimer</button>
    </div>) || <></>
  )
}

export default Post
