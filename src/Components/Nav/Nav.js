import { useEffect, useState, useRef, useContext } from 'react';
import { ModalContext } from '../../Context/ModalContext';
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion'
import { Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import './Nav.css';
import figiLogo from '../../data/figiman.png';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import NotesIcon from '@mui/icons-material/Notes';
import OutsideClickHandler from 'react-outside-click-handler';

function Nav() {

  //modal cart context
  const cartMenu = useContext(ModalContext)

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
      window.removeEventListener('scroll', null)
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
      }
    });

    return () => {
      window.removeEventListener('resize', null)
    }
  }, [])


  const handleOpenCart = () => {
    cartMenu.setShowModal(true)
  }


  const CustomToolTip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#d0d2d4',
      color: '#141414',
      width: 'fit-content',
      padding: '10px',
      fontSize: 15,
      fontFamily: 'Work Sans, sans-serif',
    },
  }));

  //get total amount for cart notification
  const [totalAmount, setTotalAmount] = useState(0)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    let total = 0;
    cartMenu.productList.forEach(product => {
      total += product.amount
    })
    let delay;
    delay = setTimeout(() => {
      setTotalAmount(total)
      setShake(true)
    }, 1000)
    setShake(false)

    return () => clearTimeout(delay);

  }, [cartMenu.productList])



  //=========================//


  return (
    <div className={`${scroll ? "nav_scroll" : "navigation"}`}>
      <div className="container">
        <div className="logo">
          <Link to="/"><img src={figiLogo} alt="Trang Ch???" /></Link>
          <div className="nav-links-mid">
            <NavLink to="/" className={(navData) => navData.isActive ? "active" : "nav-child"}> Trang Ch???</NavLink>
            <NavLink to="/product" className={(navData) => navData.isActive ? "active" : "nav-child"}> S???n Ph???m</NavLink>
            <NavLink to="/news" className={(navData) => navData.isActive ? "active" : "nav-child"}> Tin T???c</NavLink>
          </div>

          <div className="nav-links-res">
            <NotesIcon className="res-icon" onClick={() => handleOpen()} />
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
                  <NavLink to="/" className={(navData) => navData.isActive ? "active" : "nav-child"}> Trang Ch???</NavLink>
                  <NavLink to="/product" className={(navData) => navData.isActive ? "active" : "nav-child"}> S???n Ph???m</NavLink>
                  <NavLink to="/news" className={(navData) => navData.isActive ? "active" : "nav-child"}> Tin T???c</NavLink>
                  <input type="text" placeholder="T??m ki???m s???n ph???m" />

                </motion.div>
              </OutsideClickHandler>
            )}
          </AnimatePresence>
        </div>


        <div className="nav-links-right">
          <input type="text" placeholder="T??m ki???m s???n ph???m" />
          <SearchIcon className="icon search-icon" />
          <CustomToolTip enterDelay={1000} placement="bottom" title="Gi??? h??ng">
            <div className={!shake ? "cart-wrapper cart-shake" : "cart-wrapper"} onClick={() => handleOpenCart()}>
              <ShoppingCartOutlinedIcon className="icon"  />
              <div className="cart-notifications">
                <p>{totalAmount}</p>
              </div>
            </div>
          </CustomToolTip>
          <NavLink to="/login"><span className="login-btn">????ng Nh???p</span></NavLink>
        </div>

      </div>

    </div>
  )
}

export default Nav