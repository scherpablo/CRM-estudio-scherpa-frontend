import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'

import Login from './pages/public/Login'
import Register from './pages/public/Register'
import ConfirmAccount from './pages/public/ConfirmAccount'
import ForgotPassword from './pages/public/ForgotPassword'
import NewPassword from './pages/public/NewPassword'

import AdminHome from './pages/private/AdminHome'
import ManageClients from './pages/private/ManageClients'
import ManageExpedients from './pages/private/ManageExpedients'
import ProfileEdit from './pages/private/ProfileEdit'
import AdminForgotPass from './pages/private/AdminForgotPass'

import { AuthProvider } from './context/AuthProvider'
import { ClientsProvider } from './context/ClientsProvider'
import { ExpedientsProvider } from './context/ExpedientsProvider'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ClientsProvider>
          <ExpedientsProvider>
            <Routes>
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="confirm-account/:token" element={<ConfirmAccount />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="forgot-password/:token" element={<NewPassword />} />
              </Route>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminHome />} />
                <Route path="clients" element={<ManageClients />} />
                <Route path="expedients" element={<ManageExpedients />} />
                <Route path="profile" element={<ProfileEdit />} />
                <Route path="forgot-password" element={<AdminForgotPass />} />
              </Route>
            </Routes>
          </ExpedientsProvider>
        </ClientsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
