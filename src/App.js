import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import ParentApp from './pages/parent/ParentApp';
import ParentView from './pages/parent/ParentView';



const theme = createTheme({
  typography: {
    fontFamily: [
      'Kanit', 'sans-serif',
    ].join(','),
  },
});



function App() {

 const isAdmin = window.location.host.split('.')[0] === 'admin'
 const isStudent = window.location.host.split('.')[0] === 'student'
 const isParent = window.location.host.split('.')[0] === 'parent'
 const isTeacher = window.location.host.split('.')[0] === 'teacher'

  

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        
          {
            isParent && <Route component={ParentApp} />
          } 
    
        </BrowserRouter>
      </ThemeProvider>
      
    </div>
  );
}

export default App;
