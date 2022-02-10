import './App.css';

function App() {
  return (
    <div className="App">
      <h1>CRUD-APPLICATION</h1>

      <div className='form'>
        <label>PostId</label>
        <input type="text" name="postId"></input>

        <label>PostName</label>
        <input type="text" name="postName"></input>

        <label>PostDate</label>
        <input type="text" name="postDate"></input>

        <label>PostSmDescr</label>
        <input type="text" name="postSmDescr"></input>

        <label>PostMDescr</label>
        <input type="text" name="postMDescr"></input>

        <label>PostImg</label>
        <input type="text" name="postImg"></input>

        <label>PostStatus</label>
        <input type="text" name="postStatus"></input>

        <button>Submit</button>
      </div>

    </div>
  );
}

export default App;
