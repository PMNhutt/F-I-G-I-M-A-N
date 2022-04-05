import { useRef, useEffect } from 'react'
import './Banner.css'
import Parallax from 'parallax-js'
import logo from '../../logo/bumblebeeDLXLogo.png';
import heartLogo from '../../logo/heart.png';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { isMobile } from 'react-device-detect';

function Banner() {

    const scene = useRef()

    useEffect(() => {
        var parallaxInstance = new Parallax(scene.current, {
            relativeInput: true,
            // hoverOnly: true,
        });

        return () => {
            parallaxInstance.disable()
        }
    }, [])

    //handleLayer3Click
    const handleLayer3Click = () => {
    }

    //custom tooltip
    const MyTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(() => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backdropFilter: 'blur(5px)',
            color: 'rgba(255, 255, 255, 1)',
            boxShadow: '35px 35px 68px 0px rgba(145, 192, 255, 0.5),inset -8px -8px 16px 0px rgba(145, 192, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)',
            fontSize: 15,
            borderRadius: '26px'
        },
    }));


    return (
        <div className="banner">
            <div className="banner-container">
                <div className="banner-left">
                    <div className="banner-info">
                        <h2>Mô Hình Độc Đáo Chất Lượng Cao</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adip</p>
                        <a href="#">
                            <div className="info-btn">
                                Khám Phá Ngay
                            </div>
                        </a>
                    </div>

                </div>

                <div ref={scene} id="scene" className="banner-right">

                    <div
                        data-depth-x={isMobile == true ? "0" : "0.1"}
                        className="banner-img"
                        style={{
                            // backgroundColor: "blue"
                            // backgroundImage: "url(https://www.sideshow.com/storage/product-images/907278/bumblebee-dlx_transformers_silo.png)"
                        }}
                    ></div>

                    <div
                        data-depth={isMobile == true ? "0" : "0.3"}
                        className="layer2"
                        style={{
                            backgroundImage: `url(
                                "${logo}"
                            )`,
                        }}
                    >
                    </div>

                    <MyTooltip title="Tìm hiểu thêm" placement="top" TransitionComponent={Zoom}>

                        <div
                            data-depth={isMobile == true ? "0" : "0.6"}
                            className="layer3"
                            onClick={() => handleLayer3Click()}
                            style={{
                                backgroundImage: `url(
                                "${heartLogo}"
                                )`,
                            }}
                        >
                        </div>
                    </MyTooltip>

                </div>
            </div>
        </div>
    )
}

export default Banner