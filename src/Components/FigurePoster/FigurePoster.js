import React from 'react'
import './FigurePoster.css'

function FigurePoster({ ImgSrc, name, price }) {
    return (
        <div className="figurePoster">
            <div className="container">
                <div className="figure-thumbnail">
                    <img src={ImgSrc} />
                </div>

                <div className="figure-info">
                    <h3>{name}</h3>
                    <p>{price}</p>
                </div>

                <div className="figure-info-hover">
                    <h3>{name}</h3>
                    <p>{price}</p>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <div className="add-to-cart-btn">Thêm Vào Giỏ</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FigurePoster