import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route,  } from 'react-router-dom';
import './App.css';
import AdminApp from './pages/admin/AdminApp';
import LandingPageApp from './pages/landing_page/LandingPageApp';

import ParentApp from './pages/parent/ParentApp';
import TeacherApp from './pages/teacher/TeacherApp';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Kanit', 'sans-serif',
    ].join(','),
  },
});



function App() {

 const isAdmin = window.location.host.split('.')[0] === 'admin'
 //const isStudent = window.location.host.split('.')[0] === 'student'
 const isParent = window.location.host.split('.')[0] === 'parent'
 const isTeacher = window.location.host.split('.')[0] === 'teacher'
 const isLandingPage = window.location.host === 'www.confamsch.com.ng' || window.location.host === 'localhost:3000' || window.location.host === 'localhost:5000' 


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {
            isLandingPage && <Route component={LandingPageApp} />
          }
          {
            isParent && <Route component={ParentApp} />
          } 
          {
            isTeacher && <Route component={TeacherApp} />
          } 
          {
            isAdmin && <Route component={AdminApp} />
          }
    
        </BrowserRouter>
      </ThemeProvider>
      
    </div>
  );
}

export default App;
