import './App.css';
import Main from './Components/Main/Main';
import { useEffect, useContext } from 'react'
import { ModalContext } from './Context/ModalContext';

function App() {

  const modal = useContext(ModalContext)
  useEffect(() => {
    (modal.showModal === true || modal.showPeekModal === true) ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
  }, [modal.showModal, modal.showPeekModal])

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
