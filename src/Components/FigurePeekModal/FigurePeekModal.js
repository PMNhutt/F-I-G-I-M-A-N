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
    const [inputValue, setInputValue] = useState(1)


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
        setStockAvailable(false)
    }
    //close with esc key
    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                context.setShowPeekModal(false)
                setInputValue(1)
                setStockAvailable(false)
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
    // const [max, setMax] = useState(false)
    const [add, setAdd] = useState(false)

    const handleAddToCart = () => {
        context.setCartEmpty(false)
        setAdd(prev => !prev)

        let added = context.productList.find((product) => {
            return product.id === context.product.id
        })


        let addedAmount = 0
        let checkValidAmount = true
        // addedAmount = context.product.stock - addedProduct.amountAdded
        if (context.product.id === context.addedProduct.id) {
            addedAmount = context.addedProduct.amountAdded

            if (inputValue + addedAmount > context.product.stock) {
                checkValidAmount = false
            } else {
                checkValidAmount = true
            }
        }

        // && inputValue <= (context.product.stock - addedAmount)
        if (checkValidAmount == true) {
            if (inputValue >= 1) {
                context.setError(false)
                if (added == undefined) {
                    context.setProductList(prev => [...prev, {
                        id: context.product.id,
                        name: context.product.name,
                        ImgSrc: context.product.thumbImg,
                        price: context.product.price,
                        amount: inputValue,
                        maxAmount: context.product.stock,
                    }])
                } else {
                    let newAmount = 0
                    context.productList.map((pro, index) => {
                        if (pro.id == added.id) {
                            newAmount = pro.amount + inputValue
                            context.productList.splice(index, 1)
                        }
                    })
                    context.setProductList(prev => [...prev, {
                        id: context.product.id,
                        name: context.product.name,
                        ImgSrc: context.product.thumbImg,
                        price: context.product.price,
                        amount: newAmount,
                        maxAmount: context.product.stock,
                    }])


                }
            } else {
                context.setError(true)
            }
        } else {
            context.setError(true)
            setStockAvailable(true)
        }



        setLoadingBtn(true)
    }

    //get added product in cart => solve close peek modal lose addedProduct state
    // const [addedProduct, setAddedProduct] = useState({
    //     id: 0,
    //     amountAdded: 0,
    // })
    useEffect(() => {

        let added = context.productList.find((product) => {
            return product.id === context.product.id
        })
        let prevID
        if (added !== undefined) {
            context.setAddedProduct({
                id: added.id,
                amountAdded: added.amount,
            })
            prevID = added.id
        } else {
            context.setAddedProduct({
                id: prevID,
                amountAdded: 0,
            })
        }
        // console.log(addedProduct);

    }, [context.showPeekModal == true, add, inputValue])


    useEffect(() => {
        let delay
        if (loadingBtn === true) {
            delay = setTimeout(() => {
                setLoadingBtn(false)
            }, 2000)
        }

        return () => clearTimeout(delay);
    }, [loadingBtn])

    useEffect(() => {
        let delay
        if (context.error === true) {
            delay = setTimeout(() => {
                context.setError(false)
            }, 2000)
        }

        return () => clearTimeout(delay);
    }, [context.error])

    //get category
    const getCategoryName = () => {
        let name
        if (context.showPeekModal == true) {
            name = categories.find(cate => cate.id === context.product.categoryID)
        }
        return name.name
    }

    //custom input 
    const [stockAvailable, setStockAvailable] = useState(false)

    const handleIncrese = () => {
        let addedAmount = 0
        if (context.product.id === context.addedProduct.id) {
            addedAmount = context.addedProduct.amountAdded
        }

        if (inputValue >= (context.product.stock - addedAmount)) {
            setStockAvailable(true)
            context.setError(true)
        } else {
            setStockAvailable(false)
            setInputValue(prev => prev + 1)
        }
    }

    const handleDecrese = () => {
        setInputValue(prev => prev - 1)
        setStockAvailable(false)
        context.setError(false)

        if (inputValue <= 1) {
            setInputValue(1)
        }

    }

    const handleInput = (e) => {
        let newValue = parseInt(e.target.value)
        if (newValue <= 0) {
            setInputValue(1)
        } else {
            let addedAmount = 0
            if (context.product.id === context.addedProduct.id) {
                addedAmount = context.addedProduct.amountAdded
            }
            if (newValue >= (context.product.stock - addedAmount)) {
                setStockAvailable(true)
                context.setError(true)
                setInputValue((context.product.stock - addedAmount))
            } else {
                setStockAvailable(false)
                setInputValue(newValue)
            }
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
                        {/* close, status, error messages*/}

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
                        <AnimatePresence>
                            {context.error == true && (<motion.div className="error-message"
                                exit={{ opacity: 0 }}
                            >
                                {stockAvailable === false ? "Có lỗi xảy ra!!!" : "Bạn đã chọn số lượng tối đa"}
                            </motion.div>)}
                        </AnimatePresence>

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
                                {context.product.status === "preOrder" &&
                                    (<p style={{ marginTop: '10px' }}>
                                        <span style={{ color: '#fff', fontWeight: 600 }}>Đặt cọc: </span>
                                        {numberWithCommas(context.product.depositPrice)} ₫
                                    </p>)}
                            </div>

                            <div className="product-description mb">
                                <p>{truncate(context.product.details.description, 200)}</p>
                            </div>

                            <div className="product-quantity mb">
                                <div className="desc-btn" onClick={() => handleDecrese()}>-</div>
                                <input
                                    type="number"
                                    value={inputValue}
                                    onChange={e => handleInput(e)}
                                />
                                <div className={stockAvailable === false ? "insc-btn " : "insc-btn disable-click"} onClick={() => handleIncrese()}>+</div>
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
                                {context.product.status !== "preOrder" && (<div className={loadingBtn == false ? "add-to-cart-btn" : "loading-btn"} onClick={() => handleAddToCart()}>
                                    {loadingBtn == false ? "Thêm Vào Giỏ" : "Đang thêm..."}
                                    {loadingBtn == true && <div ><CachedIcon className="loading-icon" /></div>}
                                </div>)}

                                {context.product.status === "preOrder" && (<div className="preOrder-btn">
                                    Liên hệ
                                </div>)}

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