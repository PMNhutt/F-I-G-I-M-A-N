import './App.css';
import Main from './Components/Main/Main';
import { ModalContext } from './Context/ModalContext';
import { useEffect, useContext } from 'react';

function App() {

  // const modal = useContext(ModalContext)

  // useEffect(() => {
  //   modal.showModal === true ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
  // }, [modal.showModal])

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
