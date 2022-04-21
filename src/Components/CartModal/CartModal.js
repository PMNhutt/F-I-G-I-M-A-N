import { useContext, useState } from 'react'
import './CartModal.css'
import { motion, AnimatePresence } from 'framer-motion'
import { ModalContext } from '../../Context/ModalContext'
import { Player } from '@lottiefiles/react-lottie-player';
import CloseIcon from '@mui/icons-material/Close';


function CartModal() {

    //modal cart context
    const cartMenu = useContext(ModalContext)


    const cartModal = {
        visible: {
            opacity: 1, x: 0, transition: {
                ease: "easeOut",
                duration: 0.5
            }
        },
        hidden: {
            opacity: 0, x: "20vw", transition: {
                ease: "easeOut",
                duration: 0.5
            }
        }
    }

    const handleCloseCart = () => {
        // setOpenCart(false)
        cartMenu.setShowModal(false)
    }

    //cart empty or not
    const [cartEmpty, setCartEmpty] = useState(true)

    //====================================


    return (
        <AnimatePresence exitBeforeEnter>
            {cartMenu.showModal == true && (
                <>
                    <motion.div
                        variants={cartModal}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="cart-modal"
                    >
                        <div className="close-cart-btn">
                            <CloseIcon onClick={() => handleCloseCart()} />
                        </div>

                        <h2>Giỏ hàng:</h2>
                        <div className="cart-items">

                            {cartEmpty == true && (
                                <>
                                    <div className="cart-lottie-container">
                                        <Player
                                            autoplay
                                            loop
                                            src="https://assets7.lottiefiles.com/packages/lf20_3VDN1k.json"
                                            style={{ height: '80%', width: '80%' }}
                                            className="cart-lottie"
                                        >
                                        </Player>
                                    </div>

                                    <h3>Giỏ hàng rỗng...</h3>
                                </>

                            )}


                        </div>

                        <a href="/product" className="view-cart-btn">
                            <button className="view-cart">
                                {cartEmpty == true ? "Ghé Shop Ngay" : "Xem Giỏ Hàng"}
                            </button>
                        </a>

                        {cartEmpty == false && (
                            <a href="/">
                                <button className="checkout-btn">
                                    Thanh Toán
                                </button>
                            </a>
                        )}

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="backdrop-background"
                        onClick={() => handleCloseCart()}
                    ></motion.div>
                </>
            )}

        </AnimatePresence>
    )
}

export default CartModal