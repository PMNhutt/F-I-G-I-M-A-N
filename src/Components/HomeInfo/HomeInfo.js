import './HomeInfo.css'
import { useEffect } from 'react'
import { Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { products } from '../../data/products';
import HelpIcon from '@mui/icons-material/Help';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LockIcon from '@mui/icons-material/Lock';
import RefreshIcon from '@mui/icons-material/Refresh';
import Grid from '@mui/material/Grid';
import FigurePoster from '../FigurePoster/FigurePoster';


function HomeInfo() {

    const CustomToolTip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(() => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#d0d2d4',
            color: '#141414',
            width: '200px',
            padding: '10px',
            fontSize: 15,
            fontFamily: 'Work Sans, sans-serif',
        },
    }));


    // data 
    useEffect(() => {
        // console.log(products)
    }, [])

    // =========================================================


    return (
        <div className="home-info">

            {/* ===================== Service ========================== */}
            <div className="service-warp">
                <div className="container">
                    <div className="item">
                        <div className="item-icon">
                            <LocalOfferIcon className="main-icon" />
                        </div>
                        <div className="item-text">
                            <h3>Giá Tốt Nhất
                                <CustomToolTip placement="top-end" title="Giá cả cạnh trạnh, bảo đảm phù hợp với nhu cầu của bạn.">
                                    <HelpIcon className="help-icon" />
                                </CustomToolTip>
                            </h3>
                            <p>Cho ví không đau</p>
                        </div>

                    </div>

                    <div className="item">
                        <div className="item-icon">
                            <LocalShippingIcon className="main-icon" />
                        </div>
                        <div className="item-text">
                            <h3>Giao Hàng Miễn Phí
                                <CustomToolTip placement="top-end" title="Miễn phí giao hàng đến tận cùng ngỏ ngách nhà bạn.">
                                    <HelpIcon className="help-icon" />
                                </CustomToolTip>
                            </h3>
                            <p>Phạm vi toàn quốc </p>
                        </div>
                    </div>

                    <div className="item">
                        <div className="item-icon">
                            <RefreshIcon className="main-icon" />
                        </div>
                        <div className="item-text">
                            <h3>Hoàn Trả Miễn Phí
                                <CustomToolTip placement="top-end" title="Miễn phí đổi trả nếu sản phẩm bị lỗi.">
                                    <HelpIcon className="help-icon" />
                                </CustomToolTip>
                            </h3>
                            <p>Trong 30 ngày </p>
                        </div>
                    </div>

                    <div className="item">
                        <div className="item-icon">
                            <LockIcon className="main-icon" />
                        </div>
                        <div className="item-text">
                            <h3>An Toàn Bảo Mật
                                <CustomToolTip placement="top-end" title="Thông tin khách hàng luôn được quan tâm và bảo mật kĩ càng.">
                                    <HelpIcon className="help-icon" />
                                </CustomToolTip>
                            </h3>
                            <p>Thoải mái mua sắm </p>
                        </div>
                    </div>

                </div>
            </div>


            {/* ===================== Best Seller ========================== */}
            <div className="best-seller">
                <div className="container">
                    <div className="heading">
                        <h1>Mô hình bán chạy</h1>
                        <div className="heading-left">
                            <a href="/product"><p className="active">My Hero Academia</p></a>
                            <a href="/product"><p>Jujutsu Kaisen</p></a>
                            <a href="/product"><p>Naruto</p></a>
                            <a href="/product"><p>One Piece</p></a>
                            <a href="/product"><p>Xem thêm</p></a>
                        </div>
                    </div>

                    <Grid container spacing={3} className="product-grid-container">
                        {products.slice(0, 8).map((product, index) => (
                            <Grid
                                sm={6}
                                md={3}
                                xs={12}
                                item key={index}
                                className="product-grid-item"
                            >
                                <FigurePoster
                                    key={index}
                                    ImgSrc={product.thumbImg}
                                    name={product.name}
                                    price={product.price}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>

            </div>

            {/* ===================== Collection ========================== */}
            <div className="collection">
                <div className="container">
                    <div className="heading">
                        <h1>Bộ Sưu Tập Độc Đáo</h1>
                    </div>

                    <div className="content">

                        <div className="collection1">
                            <img src={require('../../data/productImage/Marvel DC/Marvel/moon-knight_marvel_gallery_624dc18ca6187.jpg')}></img>
                        </div>

                        <div className="collection2">
                            <img src={require('../../data/productImage/Marvel DC/DC Comics/batman-and-bat-signal_dc-comics.jpg')}></img>
                        </div>

                    </div>
                </div>
            </div>

            {/* ===================== News ========================== */}
            <div className="news">
                <div className="container">
                <div className="heading">
                        <h1>Tin Tức</h1>
                        <div className="heading-left">
                            <a href="/news"><p>Xem thêm</p></a>
                        </div>
                    </div>

                    <div className="content">

                        <div className="news-item">
                            <div className="thumbnail">
                                <img src={require('../../data/News/news1-title (2).jpg')}></img>
                            </div>
                            <div className="info">
                                <div className="top-info">
                                    <p>Thông báo  </p><span style={{marginLeft: '5px'}}>| 23-04-2022</span>
                                </div>
                                <div className="title">
                                    <h3>Mừng ngày khai trương, FIGIMAN giảm 50% tất cả mô hình khi mua tại cửa hàng!</h3>
                                </div>

                            </div>
                        </div>

                        <div className="news-item">
                        <div className="thumbnail">
                                <img src={require('../../data/News/news2-title.jpg')}></img>
                            </div>
                            <div className="info">
                                <div className="top-info">
                                    <p>Mẹo vặt </p><span style={{marginLeft: '5px'}}> | 23-04-2022</span>
                                </div>
                                <div className="title">
                                    <h3>Các cách bảo quản mô hình để tránh bị hư hỏng tốt nhất!</h3>
                                </div>

                            </div>
                        </div>

                        <div className="news-item">
                        <div className="thumbnail">
                                <img src={require('../../data/News/news3-title.jpg')}></img>
                            </div>
                            <div className="info">
                                <div className="top-info">
                                    <p>Mẹo vặt </p><span style={{marginLeft: '5px'}}>|  23-04-2022</span>
                                </div>
                                <div className="title">
                                    <h3>Những điều thú vị nào đang chờ đón bạn tại FIGIMAN?</h3>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div className="end"></div>

        </div>
    )
}

export default HomeInfo