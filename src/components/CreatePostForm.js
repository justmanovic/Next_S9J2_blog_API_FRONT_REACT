function CreatePostForm({ createPost, postInfos, setPostInfos }) {
  const updateInfo = (e, infoToUpdate) => {
    setPostInfos({ ...postInfos, [infoToUpdate]: e.target.value });
  };

  return (
    <form onSubmit={createPost}>
      <div>
        <label>User id</label>
        <input type="number" onChange={(e) => updateInfo(e, "newPostUser")} />
      </div>
      <div>
        <label>Title</label>
        <input type="text" onChange={(e) => updateInfo(e, "newPostTitle")} />
      </div>
      <div>
        <label>Content</label>
        <textarea onChange={(e) => updateInfo(e, "newPostContent")} />
      </div>
      <button>Go!</button>
    </form>
  );
}

export default CreatePostForm;
