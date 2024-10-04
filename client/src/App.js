import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate , useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './redux/features/user/userSlice';
import './App.css';
import Log from './pages/Login/Log';
import Dashboard from './pages/Dashboard/Dashboard';
import Reset from './pages/Resetpassword/Reset';
import ResetEmail from './pages/Resetpassword/ResetEmail';
import Maindashboard from './pages/Maindashboard/Maindashboard';
import Quality from './pages/Quality/Quality';
import Quantity from './pages/Quantity/Quantity';
import Airambient from './pages/AirAmbient/Airambient';
import Water from './pages/Water/Water';
import Noise from './pages/Noise/Noise';
import Energy from './pages/Energy/Energy';
import Download from './pages/Download/Download';
import Report from './pages/Report/Report';
import Calibrationpage from './pages/CalibartionPage/Calibrationpage';
import ViewReport from './pages/Report/ViewReport';
import ViewCalibration from './pages/CalibartionPage/ViewCalibration';
import Tank from './pages/Tank/Tank';
import DownloadData from './pages/Download/DownloadData';
import AddParameter from './pages/ParameterExceed/AddParameter';
import ViewParameter from './pages/ParameterExceed/ViewParameter';
import Notification from './pages/Notification/Notification';
import Subscibe from './pages/Subscribe/Subscibe';
import LiveEmmission from './pages/LiveEmmission/LiveEmmission';
import UsersLog from './pages/ManageUsers/Userlog';
import Account from './pages/Account/Account';
import SupportAnalyser from './pages/SupportAnalyser/SupportAnalyser';
import Edit from './pages/ManageUsers/Edit';
import EditCalibration from './pages/CalibartionPage/EditCalibration';
import ReportCheck from './pages/Report/ReportCheck';
import EditReport from './pages/Report/EditReport';
import CalibrationExceeded from './pages/CalibartionPage/CalibrationExceeded';
import Viewnotification from './pages/Notification/Viewnotification';
import ViewReportUser from './pages/Report/ViewReportUser';
import EditParameter from './pages/ParameterExceed/EditParameter';
import PrivateLayout from './pages/PrivateLayout/PrivateLayout';
import Layout from './pages/Layout/Layout';
import Transcation from './pages/Transactions/Transcation';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, loading, userType } = useSelector((state) => state.user);

  //public routes
  const publicRoutes = ['/download-data'];

  useEffect(() => {
    // Only perform user validation for routes that are not in the publicRoutes array
    if (!publicRoutes.includes(location.pathname)) {
      dispatch(fetchUser())
        .unwrap()
        .then((responseData) => {
          if (responseData.status === 401 || !responseData.validUserOne) {
            console.log("User not Valid");
            navigate('/');
          } else {
            console.log("User verify");
          }
        })
        .catch((error) => {
          console.error("Error Validating User:", error);
          navigate('/');
        });
    }
  }, [dispatch, navigate, location.pathname]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
    
      
         
            <Routes>
             
                <Route path="/login" element={<Log/>} />
                <Route path="/reset-password/:id/:token" element={<Reset />} />
                <Route path="/reset" element={<ResetEmail />} />
                <Route path='/download-data' element={<Download/>}></Route>
                <Route path="/" element={<Log />} />


              {/* Admin Routes */}
             
              {userType === "admin" && (
                           

                <>
                  

                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/layout" element={<Layout />} />

                  <Route path="/dashboard-dash" element={<Maindashboard />} />
                  <Route path="/quality" element={<Quality />} />
                  <Route path="/quantity" element={<Quantity />} />
                  <Route path="/ambient" element={<Airambient />} />
                  <Route path="/water" element={<Water />} />
                  <Route path="/noise" element={<Noise />} />
                  <Route path="/energy" element={<Energy />} />
                  <Route path="/download-data" element={<Download />} />
                  <Route path="/add-calibration" element={<Calibrationpage />} />
                  <Route path="/view-calibration" element={<ViewCalibration />} />
                  <Route path="/edit-calibration/:userName" element={<EditCalibration />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/view-report" element={<ViewReport />} />
                  <Route path="/tank" element={<Tank />} />
                  <Route path="/download" element={<DownloadData />} />
                  <Route path="/add-parameter" element={<AddParameter />} />
                  <Route path="/view-parameter" element={<ViewParameter />} />
                  <Route path="/notification" element={<Notification />} />
                  <Route path="/subscribe" element={<Subscibe />} />
                  <Route path="/live-emmision" element={<LiveEmmission />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/support-analyser" element={<SupportAnalyser />} />
                  <Route path="/check-validate" element={<ReportCheck />} />
                  <Route path="/edit-report/:userName" element={<EditReport />} />
                  <Route path="view-report/:userName" element={<ViewReportUser />} />
                  <Route path="/calibration-exceeded" element={<CalibrationExceeded />} />
                  <Route path="/manage-user" element={<UsersLog />} />
                  <Route path="/edit/:userId" element={<Edit />} />
                  <Route path="/view-notification" element={<Viewnotification />} />
                  <Route path="/edit-parameter/:userName" element={<EditParameter />} />


                </>
              )}

              {/* User Routes */}
              {userType === "user" && (
                <Route path="/" element={<PrivateLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/water" element={<Water />} />
                  <Route path="/ambient" element={<Airambient />} />
                  <Route path="/noise" element={<Noise />} />
                  <Route path="/account" element={<Account />} />
                 
                  <Route path="/transactions" element={<Transcation />} /> {/* Assuming transaction-related routes */}
                  <Route path="/view-report" element={<ViewReport />} />
                  <Route path="/edit-report/:userName" element={<EditReport />} />
                  <Route path="/download-IoT-Data" element={<DownloadData />} />
                  <Route path="/quantity" element={<Quantity />} />
                  <Route path="/energy" element={<Energy />} />
                  <Route path="/support-analyser" element={<SupportAnalyser />} />
                  <Route path="/view-report/:userName" element={<ViewReportUser />} />



                </Route>
              )}
            </Routes>
         
    </div>
  );
}

export default App;
