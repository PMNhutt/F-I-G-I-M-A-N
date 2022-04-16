import { useRef, useEffect } from 'react'
import './Banner.css'

function Banner() {


    return (
        <div className="banner">
            <div className="container">
                <div className="banner-left-cover"></div>
                <div className="content">
                    <h1>Mô Hình Độc Đáo Chất Lượng Cao</h1>
                    <h3>Mang đến cho bạn cảm giác mua sắm hoàn hảo</h3>

                    <a><button className="banner-btn">Khám Phá Ngay</button></a>
                </div>
            </div>
        </div>
    )
}

export default Banner