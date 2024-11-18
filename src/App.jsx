/* eslint-disable no-unused-vars */
import { Provider } from "react-redux";
import { store } from "./store/store";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import FarmProfile from "./components/FarmProfile";
import { useSelector } from 'react-redux';


const PageRouter = () => {
  const currentPage = useSelector((state) => state.progress.currentPage);

  return (
    <>
      <Navbar />
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'farmProfile' && <FarmProfile />}
    </>
  );
};

function App() {
  return (

     <Provider store={store}>
      <PageRouter />
    </Provider>
 
  );
}

export default App;