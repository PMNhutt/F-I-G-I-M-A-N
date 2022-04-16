import { useEffect, useState, useRef, useContext } from 'react';
import { ModalContext } from '../../Context/ModalContext';
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion'
import './Nav.css';
import figiLogo from '../../data/figiman.png';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import OutsideClickHandler from 'react-outside-click-handler';


function Nav() {

  //modal menu context
  const resMenu = useContext(ModalContext)

  //scroll nav
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });

    return () => {
      window.removeEventListener('scroll')
    }
  }, [])


  //menu responsive
  const [openMenu, setOpenMenu] = useState(false);

  const resmenu = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "-150%" }
  }

  const handleOpen = () => {
    setOpenMenu(true)
    // resMenu.setShowModal(prev => !prev)
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1200) {
        setOpenMenu(false)
        resMenu.setShowModal(false)
      }
      // if (window.innerWidth <= 600) {
      //   setChangeMenu(true)
      // } else {
      //   setChangeMenu(false)
      // }
    });

    return () => {
      window.removeEventListener('resize')
    }
  }, [])

  //=========================//


  return (
    <div className={`${scroll ? "nav_scroll" : "navigation"}`}>
      <div className="container">
        <div className="logo">
          <Link to="/"><img src={figiLogo} alt="Trang Chủ" /></Link>
          <div className="nav-links-mid">
            <NavLink to="/" className={(navData) => navData.isActive ? "active" : "nav-child"}> Trang Chủ</NavLink>
            <NavLink to="/product" className={(navData) => navData.isActive ? "active" : "nav-child"}> Sản Phẩm</NavLink>
            <NavLink to="/news" className={(navData) => navData.isActive ? "active" : "nav-child"}> Tin Tức</NavLink>
          </div>

          <div className="nav-links-res">
            <MenuRoundedIcon className="res-icon" onClick={() => handleOpen()} />
          </div>

          <AnimatePresence>
            {openMenu == true && (
              <OutsideClickHandler onOutsideClick={() => { setOpenMenu(false) }}>
                <motion.div
                  variants={resmenu}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="nav-links-res-modal"
                >
                  <NavLink to="/" className={(navData) => navData.isActive ? "active" : "nav-child"}> Trang Chủ</NavLink>
                  <NavLink to="/product" className={(navData) => navData.isActive ? "active" : "nav-child"}> Sản Phẩm</NavLink>
                  <NavLink to="/news" className={(navData) => navData.isActive ? "active" : "nav-child"}> Tin Tức</NavLink>
                </motion.div>
              </OutsideClickHandler>
            )}
          </AnimatePresence>
        </div>


        <div className="nav-links-right">
          <input type="text" placeholder="Tìm kiếm sản phẩm" />
          <SearchIcon className="icon" />
          <ShoppingCartOutlinedIcon className="icon" />
          <NavLink to="/login"><span className="login-btn">Đăng Nhập</span></NavLink>
        </div>
      </div>

    </div>
  )
}

export default Nav