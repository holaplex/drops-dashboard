import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import store from './app/store';
import Login from './features/User/Login';
import Signup from './features/User/Signup';
import PrivateRoute from './helpers/PrivateRoute';
import AllDrops from './features/Drops/AllDrops';
import { CreateDrop } from './features/Drops/CreateDrop';
import CreateUser from './features/User/CreateUser';
import AllUsers from './features/User/AllUsers';
import { getToken } from './helpers/localStorage';
import { useEffect } from 'react';
import { fetchUserBytoken } from './features/User/userActions';
import RolePrivateRoute from './helpers/RolePrivateRoute';
import Summary from './features/Drops/Summary';
import ScheduleDrop from './features/Drops/ScheduleDrop';
import ReviewNft from './features/Drops/ReviewNft';
import DropInfo from './features/Drops/DropInfo';
import ConfirmDrop from './features/Drops/ConfirmDrop'
import ForgotPassword from './features/User/ForgotPassword';
import ResetPassword from './features/User/ResetPassword';

function App() {
  useEffect(() => {
    function getUserData() {
      const token = getToken().access_token;
      if (token) {
        store.dispatch(fetchUserBytoken())
      }
    }
    getUserData()
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<Login />} path='/login' />
          <Route element={<ForgotPassword />} path='/forgot-password' />
          <Route element={<ResetPassword />} path='/reset-password/:reset_password_token' />
          <Route element={<Signup />} path='/signup' />
          <Route
            path='/drops'
            element={
              <PrivateRoute>
                <AllDrops />
              </PrivateRoute>
            }
          />
          <Route
            path='/drops/create'
            element={
              <RolePrivateRoute roles={adminAndClient}>
                <CreateDrop />
              </RolePrivateRoute>
            }
          />
          <Route
            path='/drops/summary'
            element={
              <RolePrivateRoute roles={adminAndClient}>
                <Summary />
              </RolePrivateRoute>
            }
          />
          <Route
            path='/drops/schedule'
            element={
              <RolePrivateRoute roles={adminAndClient}>
                <ScheduleDrop />
              </RolePrivateRoute>
            }
          />
          <Route
            path={"/drops/review"}
            element={
              <RolePrivateRoute roles={adminAndClient}>
                <ReviewNft />
              </RolePrivateRoute>
            }
          />
          <Route
            path={"/drops/review/:drop_id"}
            element={
              <RolePrivateRoute roles={adminAndClient}>
                <ReviewNft />
              </RolePrivateRoute>
            }
          />
          <Route
            path={"/drops/info/:drop_id"}
            element={
              <RolePrivateRoute roles={adminAndClient}>
                <DropInfo />
              </RolePrivateRoute>
            }
          />

          <Route
            path='/drops/confirm'
            element={
              <RolePrivateRoute roles={adminAndClient}>
                <ConfirmDrop />
              </RolePrivateRoute>
            }
          />
          <Route
            path='/users/create'
            element={
              <RolePrivateRoute roles={onlyAdmin}>
                <CreateUser />
              </RolePrivateRoute>
            }
          />
          <Route
            path='/users'
            element={
              <RolePrivateRoute roles={onlyAdmin}>
                <AllUsers />
              </RolePrivateRoute>
            }
          />
        </Routes>
      </Router>
      <Toaster />
    </Provider>
  );
}

export default App;

const onlyAdmin = ["admin"]

const adminAndClient = ["admin", "client"]
