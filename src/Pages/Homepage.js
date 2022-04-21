import Nav from '../Components/Nav/Nav'
import Banner from '../Components/Banner/Banner'
import HomeInfo from '../Components/HomeInfo/HomeInfo'
import { ModalContext } from '../Context/ModalContext';
import { useEffect, useContext } from 'react';

function Homepage() {

  const modal = useContext(ModalContext)

  // useEffect(() => {
  //   modal.showModal === true ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
  // }, [modal.showModal])

  return (
    <div>
      <Nav />
      <Banner />
      <HomeInfo />
    </div>
  )
}

export default Homepage