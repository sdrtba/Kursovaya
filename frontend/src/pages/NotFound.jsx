import {Link} from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="container">
      <h1>404 Not Found Page</h1>
      <Link to={"/"}>
        <button>Go Home</button>
      </Link>
    </div>
  )
}
