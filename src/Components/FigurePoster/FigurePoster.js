import { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../../Context/ModalContext'
import './FigurePoster.css'
import CachedIcon from '@mui/icons-material/Cached';

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