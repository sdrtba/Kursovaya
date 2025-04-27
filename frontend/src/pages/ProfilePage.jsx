import {Link} from "react-router-dom"

export const ProfilePage = () => {
  return (
    <div className="container">
      <h1>Profile Page</h1>
      <Link to={"/"}>
        <button>Go Home</button>
      </Link>
    </div>
  )
}
