import { Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { NotesPage } from '../pages/NotesPage'
import { NoteDetailPage } from '../pages/NoteDetailPage'
import { ProfilePage } from '../pages/ProfilePage'
import { NotFound } from '../pages/NotFound'
import { MainLayout } from '../layouts/MainLayout'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { AuthRouter } from '../components/AuthRoute'

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={'/'} element={<HomePage />} />
        <Route element={<AuthRouter />}>
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path={'/profile'} element={<ProfilePage />} />
          <Route path={'/notes'} element={<NotesPage />} />
          <Route path={'/notes/:id'} element={<NoteDetailPage />} />
        </Route>
        <Route path={'*'} element={<NotFound />} />
      </Route>
    </Routes>
  )
}
