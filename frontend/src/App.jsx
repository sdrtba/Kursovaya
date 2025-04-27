import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./routes/AppRouter"
import { AuthProvider } from "./contexts/AuthContext"

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  )
}