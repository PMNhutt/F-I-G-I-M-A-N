import { useContext, useState, useEffect, memo } from 'react'
import './CartModal.css'
import { motion, AnimatePresence } from 'framer-motion'
import { ModalContext } from '../../Context/ModalContext'
import { Player } from '@lottiefiles/react-lottie-player';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

function CartModal() {

    //modal cart context
    const cartMenu = useContext(ModalContext)


    const cartModal = {
        visible: {
            opacity: 1, x: 0, transition: {
                ease: "easeOut",
                duration: 0.3
            }
        },
        hidden: {
            opacity: 0, x: "20vw", transition: {
                ease: "easeOut",
                duration: 0.3
            }
        }
    }


    const handleCloseCart = () => {
        // setOpenCart(false)
        cartMenu.setShowModal(false)
    }

    //delete product from cart
    const [deleteProduct, setDeleteProduct] = useState(false)

    const handleDeleteProduct = (indexId) => {
        setDeleteProduct(prev => !prev)

        let newAmount = 0

        let added = cartMenu.productList.find((product) => {
            return product.id === indexId
        })

        cartMenu.productList.map((pro, index) => {
            if (pro.id === added.id) {

                if (pro.amount === 1) {
                    cartMenu.productList.splice(index, 1)

                    cartMenu.setProductList(prev => [...prev])
                } else {
                    newAmount = pro.amount - 1
                    cartMenu.productList.splice(index, 1)
                    cartMenu.setProductList(prev => [...prev, {
                        id: pro.id,
                        name: pro.name,
                        ImgSrc: pro.ImgSrc,
                        price: pro.price,
                        amount: newAmount,
                        maxAmount: pro.maxAmount,
                    }])
                }
            }

        })


    }


    //total price of product
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        let total = 0;
        cartMenu.productList.forEach(product => {
            total += product.price * product.amount
        })

        if (cartMenu.productList < 1) {
            cartMenu.setCartEmpty(true)

        }
        setTotalPrice(total)

    }, [cartMenu.productList])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    //====================================


    return (
        <AnimatePresence exitBeforeEnter>
            {cartMenu.showModal === true && (
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

                        <h2 style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.18)' }}>Giỏ hàng:</h2>
                        <div className="cart-items">

                            {cartMenu.cartEmpty === true && (
                                <>
                                    <AnimatePresence >
                                        <motion.div className="cart-lottie-container"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <Player
                                                autoplay
                                                loop
                                                src="https://assets7.lottiefiles.com/packages/lf20_3VDN1k.json"
                                                style={{ height: '80%', width: '80%' }}
                                                className="cart-lottie"
                                            >
                                            </Player>
                                        </motion.div>
                                    </AnimatePresence>

                                    <h3>Giỏ hàng rỗng...</h3>
                                </>

                            )}

                            {cartMenu.cartEmpty === false && (
                                <>
                                    <div className="lists">
                                        <AnimatePresence>
                                            {cartMenu.productList.map((product, index) => (
                                                <motion.div className="product-item"
                                                    key={product.id}
                                                    exit={{
                                                        opacity: 0, scale: 0.5, transition: {
                                                            ease: "easeOut",
                                                            duration: 0.3
                                                        }
                                                    }}
                                                >
                                                    <div className="product-img"
                                                        style={{
                                                            backgroundImage: `url(
                                                        "${product.ImgSrc}"
                                                    )`,
                                                        }}
                                                    >
                                                        {/* <img src={product.ImgSrc} /> */}
                                                    </div>
                                                    <div className="product-info">
                                                        <p className="product-name">{product.name}</p>
                                                        <p className="product-price"><span>{product.amount} &times; </span>{numberWithCommas(product.price)} ₫</p>
                                                        {/* {console.log("amount in cart:", product.amount)} */}
                                                    </div>
                                                    <div className="delete-product">
                                                        <span onClick={() => handleDeleteProduct(product.id)} style={{ fontSize: '20px' }}>&times;</span>
                                                    </div>

                                                </motion.div>
                                            ))}
                                        </AnimatePresence>

                                    </div>

                                </>
                            )}


                        </div>

                        <div className="cart-bottom" style={{
                            borderTop:
                                `${cartMenu.cartEmpty === false ? "1px solid rgba(255, 255, 255, 0.18)" : "0px"}`
                        }}>

                            {cartMenu.cartEmpty === false && (
                                <div className="subTotal" style={{ marginTop: '10px' }}>
                                    <h3>Tổng cộng:</h3>
                                    <h3>{numberWithCommas(totalPrice)} ₫</h3>
                                </div>
                            )}

                            <Link to={cartMenu.cartEmpty === true ? "/products" : "/"}
                                className="view-cart-btn"
                                onClick={() => handleCloseCart()}>
                                <div className="view-cart">
                                    {cartMenu.cartEmpty === true ? "Ghé Shop Ngay" : "Xem Giỏ Hàng"}
                                </div>
                            </Link>

                            {cartMenu.cartEmpty === false && (
                                <Link to="/" className="checkout-btn">
                                    <div className="checkout">
                                        Thanh Toán
                                    </div>
                                </Link>
                            )}
                        </div>

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

export default memo(CartModal)