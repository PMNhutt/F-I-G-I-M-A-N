import { useEffect, useState, useRef, useContext } from 'react';
import { ModalContext } from '../../Context/ModalContext';
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion'
import './Nav.css';
import figiLogo from '../../logo/figiman.png';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Nav() {

  //modal menu context
  const resMenu = useContext(ModalContext)

  //scroll nav
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
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
  const [changeMenu, setChangeMenu] = useState(false);

  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }

  const resmenu = {
    visible: { y: 0, x: "-50%", opacity: 1 },
    hidden: { y: "-100%", x: "-50%", opacity: 0 }
  }

  const modalRef = useRef()

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setOpenMenu(false)
      resMenu.setShowModal(false)
    }
  }

  const handleOpen = () => {
    setOpenMenu(prev => !prev)
    resMenu.setShowModal(prev => !prev)
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1200) {
        setOpenMenu(false)
        resMenu.setShowModal(false)
      }
      if (window.innerWidth <= 600) {
        setChangeMenu(true)
      } else {
        setChangeMenu(false)
      }
    });

    return () => {
      window.removeEventListener('resize')
    }
  }, [])


  //custom tooltip
  // const MyTooltip = styled(({ className, ...props }) => (
  //   <Tooltip {...props} classes={{ popper: className }} />
  // ))(() => ({
  //   [`& .${tooltipClasses.tooltip}`]: {
  //     backdropFilter: 'blur(5px)',
  //     color: 'rgba(255, 255, 255, 1)',
  //     boxShadow: '35px 35px 68px 0px rgba(145, 192, 255, 0.5),inset -8px -8px 16px 0px rgba(145, 192, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)',
  //     fontSize: 15,
  //     borderRadius: '26px'
  //   },
  // }));
  //=========================//


  return (
    <div className={`${scroll ? "nav_scroll" : "nav"}`}>

      <div className={`${scroll ? "nav_scroll_logo" : "navbar-logo"}`}>
        <Link to="/"><img src={figiLogo} border="0" /></Link>
      </div>

      <div className="res-600">
        {changeMenu == true && (
          <div className="navbar-res-search">
            {/* <MyTooltip title="Tìm kiếm mô hình" TransitionComponent={Zoom}> */}
              <SearchIcon sx={{ fontSize: "1.5rem" }} />
            {/* </MyTooltip> */}
          </div>
        )}

        <div className="navbar-res" onClick={() => handleOpen()}>
          {/* <MyTooltip title="Menu" TransitionComponent={Zoom}> */}
            <MenuRoundedIcon sx={{ fontSize: "1.5rem" }} />
          {/* </MyTooltip> */}
        </div>
      </div>


      <AnimatePresence >
        {openMenu == true && (
          <div className="backdrop"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            ref={modalRef}
            onClick={(e) => closeModal(e)}
          >
            <div className="res-menu"
              variants={resmenu}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="res-navbar-logo">
                <Link to="/"><img src={figiLogo} border="0" /></Link>
              </div>
              <div className="res-links">
                <NavLink to="/" className={(navData) => navData.isActive ? "res-active" : "res-nav-child"}>
                  <div className="res-link">
                    <HomeOutlinedIcon sx={{ fontSize: "1.6rem" }} />
                    <div className="res-text">Trang Chủ</div>
                  </div>
                </NavLink>
                <NavLink to="/product" className={(navData) => navData.isActive ? "res-active" : "res-nav-child"}>
                  <div className="res-link" >
                    <WhatshotIcon sx={{ fontSize: "1.6rem" }} />
                    <div className="res-text">Sản Phẩm</div>

                  </div>
                </NavLink>
                <NavLink to="/news" className={(navData) => navData.isActive ? "res-active" : "res-nav-child"}>
                  <div className="res-link">
                    <NewspaperOutlinedIcon sx={{ fontSize: "1.6rem" }} />
                    <div className="res-text">Tin Tức</div>
                  </div>
                </NavLink>
              </div>
              {changeMenu == true && (
                <div className="res-menuChanged">
                  <NavLink to="/cart" className={(navData) => navData.isActive ? "res-active" : "res-nav-child"} >
                    <div className="res-link">
                      <ShoppingCartOutlinedIcon sx={{ fontSize: "1.6rem" }} />
                      <div className="res-text">Giỏ Hàng</div>
                    </div>
                  </NavLink>
                  <NavLink to="/register" className={(navData) => navData.isActive ? "res-active" : "res-nav-child"} >
                    <div className="res-link">
                      <ExitToAppIcon sx={{ fontSize: "1.6rem" }} />
                      <div className="res-text">Đăng Nhập</div>
                    </div>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>


      <div className="navbar-left">
        <div className="navbar-link "><NavLink to="/" className={(navData) => navData.isActive ? "active" : "nav-child"}>Trang Chủ</NavLink></div>
        <div className="navbar-link " ><NavLink to="/product" className={(navData) => navData.isActive ? "active" : "nav-child"} >Sản Phẩm</NavLink></div>
        <div className="navbar-link"><NavLink to="/news" className={(navData) => navData.isActive ? "active" : "nav-child"}>Tin Tức</NavLink></div>
      </div>


      <div className="navbar-right">

        <div className="navbar-link " style={{ lineHeight: "10px" }}>
          <div className="nav-child">
            {/* <MyTooltip title="Tìm kiếm mô hình" TransitionComponent={Zoom}> */}
              <SearchIcon sx={{ fontSize: "1.5rem" }} />
            {/* </MyTooltip> */}
          </div>
        </div>
        <div className="navbar-link " style={{ lineHeight: "10px" }}>
          <NavLink to="/cart" className="nav-child" >
            {/* <MyTooltip title="Giỏ hàng" TransitionComponent={Zoom}> */}
              <ShoppingCartOutlinedIcon sx={{ fontSize: "1.5rem" }} />
            {/* </MyTooltip> */}
          </NavLink>
        </div>
        <div className="navbar-link">
          <div className="nav-child">
            {/* <MyTooltip title="Tài khoản" TransitionComponent={Zoom}> */}
            {/* <AccountCircleOutlinedIcon /> */}
            <a href="#">
              <div className="nav-login">
                đăng nhập
              </div>
            </a>
            {/* </MyTooltip> */}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Nav