import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Homepage from './pages/Homepage';

const theme = createTheme({
  fontFamily: [
    'Kanit', 'sans-serif'
    ,
  ].join(','),
});


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Route path="/" >
            <Homepage />
          </Route>
        
        </BrowserRouter>

     
      </ThemeProvider>
      
    </div>
  );
}

export default App;
