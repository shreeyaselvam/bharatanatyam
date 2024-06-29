// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, useSearchParams } from 'react-router-dom';

function LocationDisplay() {
    const [searchParams, setSearchParams] = useSearchParams();
    window.location.replace(`https://9e2443e8.shreeya-bharatanatyam.pages.dev/?${searchParams.toString()}`);
    return(
      <div></div>
    );
}
function App() {
  return (<div className="App">
    <BrowserRouter>
      <LocationDisplay  /> 
    </BrowserRouter>
  </div>);
}
export default App;
