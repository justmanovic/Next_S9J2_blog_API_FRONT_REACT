import Post from "./Post";

const PostsList = ({ articles, token }) => {

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
      {articles.map((article) => <Post key={Math.random().toString()} article={article} deleteArticle={deleteArticle} /> )}
    </div>
  );
};

export default PostsList;
