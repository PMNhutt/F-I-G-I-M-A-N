import { useContext, useState, useEffect } from 'react'
import { ModalContext } from '../../Context/ModalContext'
import { motion, AnimatePresence } from 'framer-motion'
import { categories } from '../../data/categories';
import './FigurePeekModal.css'
import CloseIcon from '@mui/icons-material/Close';
import CachedIcon from '@mui/icons-material/Cached';


function FigurePeekModal() {

    //modal  context
    const context = useContext(ModalContext)

    const peekModal = {
        visible: {
            opacity: 1, transition: {
                ease: "easeOut",
                duration: 0.3
            }
        },
        hidden: {
            opacity: 0, transition: {
                ease: "easeOut",
                duration: 0.3
            }
        }
    }

    //handleClosePeek
    const handleClosePeek = () => {
        context.setShowPeekModal(false)
        setInputValue(1)
    }
    //close with esc key
    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                context.setShowPeekModal(false)
                setInputValue(1)
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + " ..." : str;
    }

    //handle add to cart 
    const [loadingBtn, setLoadingBtn] = useState(false)
    const handleAddToCart = () => {
        // context.setCartEmpty(false)

        // let added = cartMenu.productList.find((product) => {
        //     return product.id === id
        // })

        // if (added == undefined) {
        //     cartMenu.setProductList(prev => [...prev, {
        //         id: id,
        //         name: name,
        //         ImgSrc: ImgSrc,
        //         price: price,
        //         amount: 1,
        //     }])
        // } else {
        //     let newAmount = 0
        //     cartMenu.productList.map((pro, index) => {
        //         if (pro.id == added.id) {
        //             newAmount = pro.amount + 1
        //             cartMenu.productList.splice(index, 1)
        //         }
        //     })
        //     cartMenu.setProductList(prev => [...prev, {
        //         id: id,
        //         name: name,
        //         ImgSrc: ImgSrc,
        //         price: price,
        //         amount: newAmount,
        //     }])


        // }


        setLoadingBtn(true)
    }

    useEffect(() => {
        let delay
        if (loadingBtn === true) {
            delay = setTimeout(() => {
                setLoadingBtn(false)
            }, 2000)
        }

        return () => clearTimeout(delay);
    }, [loadingBtn])

    //get category
    const getCategoryName = () => {
        let name
        if (context.showPeekModal == true) {
            name = categories.find(cate => cate.id === context.product.categoryID)
        }
        return name.name
    }

    //custom input 
    const [inputValue, setInputValue] = useState(1)
    const handleIncrese = () => {
        setInputValue(prev => prev + 1)
    }

    const handleDecrese = () => {
        setInputValue(prev => prev - 1)
        if (inputValue <= 1) {
            setInputValue(1)
        }

    }


    // =================================
    return (
        <AnimatePresence exitBeforeEnter>
            {context.showPeekModal == true && (
                <>
                    <motion.div
                        variants={peekModal}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="peek-modal"
                    >
                        {/* close, status */}

                        {context.product.status === "new" && (
                            <div className="peek-status">
                                <h3>Mới</h3>
                            </div>
                        )}
                        {context.product.status === "preOrder" && (
                            <div className="peek-status-order">
                                <h3>Đặt trước</h3>
                            </div>
                        )}
                        <div className="close-peek-btn">
                            <CloseIcon onClick={() => handleClosePeek()} />
                        </div>

                        {/* main peek detail */}
                        <div className="peek-imgs">
                            <div className="active-img">
                                <img src={context.product.details.imageDescription} />
                            </div>
                            <div className="img-list">
                                {context.product.details.otherImages.map((image) => (
                                    <div className="img-item" key={image.id}
                                        style={{
                                            backgroundImage: `url( "${image.imgUrl}")`
                                        }}
                                    >
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="peek-details">
                            <div className="product-name mb">
                                <h2>{context.product.name}</h2>
                            </div>
                            <div className="product-price mb">
                                <h2>{numberWithCommas(context.product.price)} ₫</h2>
                            </div>
                            <div className="product-description mb">
                                <p>{truncate(context.product.details.description, 200)}</p>
                            </div>

                            <div className="product-quantity mb">
                                <div className="desc-btn" onClick={() => handleDecrese()}>-</div>
                                <input
                                    type="number"
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                />
                                <div className="insc-btn" onClick={() => handleIncrese()}>+</div>
                            </div>

                            <div className="product-stock mb">
                                <span style={{ color: '#fff', fontWeight: 600 }}>Kho: </span>
                                <span>{context.product.stock}</span>
                            </div>

                            <div className="product-category mb">
                                <span style={{ color: '#fff', fontWeight: 600 }}>Danh mục: </span>
                                <span className="categoryName">{getCategoryName()}</span>
                            </div>

                            <div className="product-tagnames mb">
                                <span style={{ color: '#fff', fontWeight: 600 }}>Từ khóa: </span>
                                {context.product.tagName.map((tagName, index) => (
                                    <span key={index} className="tagNames"><a>{(index ? ', ' : '') + `${tagName}`}</a></span>
                                ))}
                            </div>

                            <div className="peek-btns">
                                <div className={loadingBtn == false ? "add-to-cart-btn" : "loading-btn"} onClick={() => handleAddToCart()}>
                                    {loadingBtn == false ? "Thêm Vào Giỏ" : "Đang thêm..."}
                                    {loadingBtn == true && <div ><CachedIcon className="loading-icon" /></div>}
                                </div>

                                <div className="details-btn">
                                    Xem chi tiết
                                </div>
                            </div>


                        </div>

                    </motion.div>

                    {/* backdrop background */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="peek-backdrop-background"
                        onClick={() => handleClosePeek()}
                    ></motion.div>
                </>
            )}

        </AnimatePresence>
    )
}

export default FigurePeekModal