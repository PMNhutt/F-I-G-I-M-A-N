import Nav from '../Components/Nav/Nav'
import Banner from '../Components/Banner/Banner'
import HomeInfo from '../Components/HomeInfo/HomeInfo'
import Footer from '../Components/Footer/Footer'
import ServiceChat from '../Components/ServiceChat/ServiceChat'
import { ModalContext } from '../Context/ModalContext';
import { useEffect, useContext } from 'react';

function Homepage({ title }) {

  useEffect(() => {
    document.title = title;
  }, [title])

  const modal = useContext(ModalContext)

  // useEffect(() => {
  //   modal.showModal === true ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
  // }, [modal.showModal])

  return (
    <div>
      <Nav />
      <Banner />
      <HomeInfo />
      <ServiceChat />
      <Footer />
    </div>
  )
}

export default Homepage