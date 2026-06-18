
import './App.css'
import Footer from './components/Footer';
import Home from "./components/Home";
import Sidebar from './components/Sidebar';
import { useEffect, useState } from "react"
import { useToast } from './contexts/ToastContext';
import ScrollToTop from './ScrollToTop';

function App() {

  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(true);
  const [isExiting, setIsExiting] = useState(false);


  const closeAlert = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 500); // Wait for the animation to complete (500ms)
  };

  return (
    <>
     <ScrollToTop/>
    <div className="relative">
      {/* Background overlay when alert is visible */}
      {showAlert && (
        <div className={`app-alert-overlay`}>
          {/* Alert Box with animation */}
          <div className={`app-alert-box ${isExiting ? 'closing' : ''}`}>
            <div className="p-2">
              <table >
                <tbody>
                <tr>
                  <td className="pr-2 text-sm">⚠️</td>
                  <td className="text-sm text-yellow-400"><strong>This website is still a work in progress</strong></td>
                </tr>
                <tr>
                  <td></td>
                  <td className="text-xs"><p>Feel free to share your feedback below, and thanks for your patience while we keep improving things!</p></td>
                </tr>
                </tbody>
                
              </table>
              
            </div>
            <button
              onClick={closeAlert}
              className="app-alert-close-btn outline-none"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    <div className="bg-gray-900 text-white">
      <Sidebar />
      <div className="md:ml-[17%] flex-1 h-screen overflow-y-auto overflow-x-hidden md:p-6">
        <Home />
        <Footer />
      </div>
    </div>
    </div>
    </>
  );
}

export default App





