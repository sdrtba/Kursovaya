import {Link} from "react-router-dom";

export const NoteDetailPage = () => {
  return (
    <div className="container">
      <h1>NoteDetailPage</h1>
      <Link to={"/"}>
        <button>Go Home</button>
      </Link>
    </div>
  )
}
