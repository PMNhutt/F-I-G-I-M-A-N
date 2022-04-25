import React from 'react'
import './FigurePoster.css'

function FigurePoster({ ImgSrc, name, price, status }) {


    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + " ..." : str;
    }

    return (
        <div className="figurePoster">
            <div className="container">
                <div className="figure-thumbnail">
                    <img src={ImgSrc} />
                </div>

                <div className="figure-info">
                    <h3>{truncate(name, 25)}</h3>
                    <p>{price}</p>
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
                    <p>{price}</p>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <div className="add-to-cart-btn">Thêm Vào Giỏ</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FigurePoster