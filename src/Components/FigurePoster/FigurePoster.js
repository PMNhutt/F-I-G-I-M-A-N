import { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../../Context/ModalContext'
import { Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { products } from '../../data/products';
import './FigurePoster.css'
import CachedIcon from '@mui/icons-material/Cached';
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded';

function FigurePoster({ ImgSrc, name, price, status, id }) {


    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + " ..." : str;
    }

    //modal cart context
    const cartMenu = useContext(ModalContext)

    const [loadingBtn, setLoadingBtn] = useState(false)

    const handleAddToCart = () => {
        cartMenu.setCartEmpty(false)

        let added = cartMenu.productList.find((product) => {
            return product.id === id
        })

        if (added == undefined) {
            cartMenu.setProductList(prev => [...prev, {
                id: id,
                name: name,
                ImgSrc: ImgSrc,
                price: price,
                amount: 1,
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
            }])


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

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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

    //open peek modal 
    const handleOpenPeek = () => {
        cartMenu.setShowPeekModal(true)
        let newProduct
        newProduct = products.find(product => product.id == id)
        if (newProduct !== undefined) {
            cartMenu.setProduct(newProduct)
        }
    }

    // =================================================================

    return (
        <div className="figurePoster">
            <div className="container">
                <div className="figure-thumbnail">
                    <img src={ImgSrc} />
                </div>

                <div className="figure-info">
                    <h3>{truncate(name, 25)}</h3>
                    <p>{numberWithCommas(price)} ₫</p>
                </div>

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


                <div className="figure-info-hover">
                    <h3>{name}</h3>
                    <p>{numberWithCommas(price)} ₫</p>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <div className={loadingBtn == false ? "add-to-cart-btn" : "loading-btn"} onClick={() => handleAddToCart()}>
                            {loadingBtn == false ? "Thêm Vào Giỏ" : "Đang thêm..."}
                            {loadingBtn == true && <div ><CachedIcon className="loading-icon" /></div>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FigurePoster