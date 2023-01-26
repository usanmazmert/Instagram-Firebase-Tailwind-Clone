import React, {Suspense, lazy} from "react"
import {useGlobalContext} from "./context/firebase"
import {BrowserRouter as Router, createRoutesFromChildren, Navigate, Route, Routes
} from "react-router-dom"

import * as ROUTES from "./constants/routes"
import { UserContext } from "./context/UserContext"
import useAuthListener from "./hooks/use-auth-listener"

const Profile = lazy(() => import("./pages/Profile"))
const SignUp  = lazy(()=> import("./pages/SignUp"))
const NotFound  = lazy(()=> import("./pages/NotFound"))
const Login = lazy(() => import("./pages/Login"))
const Dashboard = lazy(() => import("./pages/Dashboard"))

function App() {
  const auth = useAuthListener()
  return (
    <UserContext.Provider value={auth}>
      <Router>
        <Suspense fallback = {<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={auth.user ? <Navigate replace to={ROUTES.DASHBOARD}/> : <Login />} />
            <Route path={ROUTES.SIGN_UP} element={auth.user ? <Navigate replace to={ROUTES.DASHBOARD}/> : <SignUp />}/>
            <Route exact path={ROUTES.PROFILE} element={auth.user ? <Profile /> : <Navigate replace to="/login"/>}/>
            <Route exact path={ROUTES.DASHBOARD} element={auth.user ? <Dashboard /> : <Navigate replace to="/login"/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
