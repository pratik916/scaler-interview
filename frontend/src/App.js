import { useState } from "react";
import "./App.css";
import CreatePost from "./Components/CreatePost";
import ListPosts from "./Components/ListPosts";

function App() {
  const [now, setnow] = useState(() => Date.now());
  return (
    <div className="App">
      <CreatePost onCreate={() => setnow(Date.now())} />
      <ListPosts onCreated={now} onCreate={() => setnow(Date.now())} />
    </div>
  );
}

export default App;
