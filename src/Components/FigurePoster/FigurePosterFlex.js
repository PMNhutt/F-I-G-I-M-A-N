import { useContext, useEffect, useState, useRef } from 'react'
import { ModalContext } from '../../Context/ModalContext'
import { Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { products } from '../../data/products';
import './FigurePosterFlex.scss'
import CachedIcon from '@mui/icons-material/Cached';
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded';
import Image from '../FigurePeekModal/Image';
import * as sharedFunction from '../../share/_shared';


function FigurePosterFlex({ ImgSrc, name, price, status, id, stock, description }) {
    //modal cart context
    const cartMenu = useContext(ModalContext)

    const [loadingBtn, setLoadingBtn] = useState(false)
    const [add, setAdd] = useState(false)
    const [stockAvailable, setStockAvailable] = useState(true)

    const handleAddToCart = () => {
        cartMenu.setCartEmpty(false)
        setAdd(prev => !prev)


        let added = cartMenu.productList.find((product) => {
            return product.id === id
        })

        let addedAmount = 0
        let checkValidAmount = true
        // addedAmount = context.product.stock - addedProduct.amountAdded
        if (id === cartMenu.addedProduct.id) {
            addedAmount = cartMenu.addedProduct.amountAdded

            if (addedAmount >= stock) {
                checkValidAmount = false
            } else {
                checkValidAmount = true
            }
        }

        if (checkValidAmount === true) {
            setStockAvailable(true)
            if (added === undefined) {
                cartMenu.setProductList(prev => [...prev, {
                    id: id,
                    name: name,
                    ImgSrc: ImgSrc,
                    price: price,
                    amount: 1,
                    maxAmount: stock,
                }])
            } else {
                let newAmount = 0
                cartMenu.productList.map((pro, index) => {
                    if (pro.id == added.id) {
                        newAmount = pro.amount + 1
                        cartMenu.productList.splice(index, 1)
                    }
                })
                cartMenu.setProductList(prev => [...prev, {
                    id: id,
                    name: name,
                    ImgSrc: ImgSrc,
                    price: price,
                    amount: newAmount,
                    maxAmount: stock,
                }])


            }
        } else {
            setStockAvailable(false)
        }

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

    //open peek modal 
    const handleOpenPeek = () => {
        cartMenu.setShowPeekModal(true)
        let newProduct
        newProduct = products.find(product => product.id === id)
        if (newProduct !== undefined) {
            cartMenu.setProduct(newProduct)
        }
    }

    //check added products
    useEffect(() => {

        let added = cartMenu.productList.find((product) => {
            return product.id === id
        })
        let prevID
        if (added !== undefined) {
            cartMenu.setAddedProduct({
                id: added.id,
                amountAdded: added.amount,
            })
            prevID = added.id
        } else {
            cartMenu.setAddedProduct({
                id: prevID,
                amountAdded: 0,
            })
        }


    }, [add, cartMenu.showModal])


    //set state for "added" button
    useEffect(() => {
        let addedAmount = 0

        let added = cartMenu.productList.find((product) => {
            return product.id === id
        })

        if (added !== undefined) {
            if (id === cartMenu.addedProduct.id) {
                addedAmount = cartMenu.addedProduct.amountAdded

                if (addedAmount === stock) {
                    setStockAvailable(false)
                } else {
                    setStockAvailable(true)
                }
            } else {
                if (id === added.id) {
                    addedAmount = added.amount

                    if (addedAmount === stock) {
                        setStockAvailable(false)
                    } else {
                        setStockAvailable(true)
                    }

                }
            }
        }


    }, [cartMenu.addedProduct.amountAdded, cartMenu.showModal, cartMenu.productList])


    // =================================================================

    return (
        <div className="figurePosterFlex">
            <div className="container">
                <div className="figure-thumbnail">
                    {/* <img src={ImgSrc} /> */}
                    <Image src={ImgSrc} />
                    {status === "new" && (
                        <div className="figure-status">
                            <h3>Mới</h3>
                        </div>
                    )}

                    {status === "preOrder" && (
                        <div className="figure-status-order">
                            <h3>Đặt trước</h3>
                        </div>
                    )}

                    <CustomToolTip placement="top" title="Xem nhanh">
                        <div className="figure-peek" onClick={() => handleOpenPeek()}>
                            <div className="peek-icon-wrapper">
                                <ZoomOutMapRoundedIcon className="peek-icon" />
                            </div>
                        </div>
                    </CustomToolTip>
                </div>



                <div className="info-wrapper">
                    <div className="figure-info">
                        <h3>{name}</h3>
                        <p>{sharedFunction.numberWithCommas(price)} ₫</p>
                    </div>


                    <div className="figure-description">
                        <p>{sharedFunction.truncate(description, 200)}</p>
                    </div>
                    <div className="figure-btns">
                        <div style={{ width: '100%' }}>
                            {status !== "preOrder" && (<div className={loadingBtn === false ? (stockAvailable === true ? "add-to-cart-btn" : "add-to-cart-btn disable-click") : "loading-btn"} onClick={() => handleAddToCart()}>
                                {loadingBtn === false ? (stockAvailable === true ? "Thêm Vào Giỏ" : "Đã thêm") : "Đang thêm..."}
                                {loadingBtn === true && <div ><CachedIcon className="loading-icon" /></div>}
                            </div>)}

                            {status === "preOrder" && (<div className="preOrder-btn">
                                Liên hệ
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FigurePosterFlex;
