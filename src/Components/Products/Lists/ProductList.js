import { useState, useEffect, useContext } from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import { products } from '../../../data/products';
import { ModalContext } from '../../../Context/ModalContext';
import FigurePoster from '../../FigurePoster/FigurePoster';
import '../../HomeInfo/HomeInfo.css';
import * as sharedFunction from '../../../share/_shared';


function ProductList() {
    /**
     * *choose view layout
     */

    const [isGrid, setIsGrid] = useState(true);
    const [sortType, setSortType] = useState(1)
    const handleChangeView = () => setIsGrid(prev => !prev);
    const useStyles = makeStyles((theme) => ({
        root: {
            '& .Mui-selected': {
                backgroundColor: '#2c88cc',
                color: '#d0d2d4',
                fontSize: '18px',
            },
            '& .MuiPaginationItem-text': {
                color: '#d0d2d4',
                fontSize: '18px',
            }
        },
        paper: {
            background: "rgba(0, 0, 0, 0.8)",
            color: "#d0d2d4",
        },
    }));

    const classes = useStyles();

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    }

    /**
     * *choose number item in 1 page
     */
    const [viewType, setViewType] = useState(1)

    const handleViewChange = (e) => {
        setViewType(e.target.value)
    }

    /**
     * *list-wrapper
     * *animation Grid
     */
    const grid = {
        visible: {
            opacity: 1, y: 0, transition: {
                ease: "easeOut",
                duration: 0.5
            }
        },
        hidden: {
            opacity: 0, y: "5vw", transition: {
                ease: "easeOut",
                duration: 0.5
            }
        }
    }

    const [randomItem, setRandomItem] = useState()

    useEffect(() => {
        setRandomItem(sharedFunction.getRandom(products, 18));
    }, [])

    /**
     * *Pagination
     */

    const handlePaginationChange = (e) => {
        console.log(e.target.textContent);
    }

    /**
     * *handle open filter (mobile)
     */
    const context = useContext(ModalContext)

    const handleOpenFilter = () => {
        context.setIsOpenFilter(prev => !prev)
    }


    return (
        <div className="products-lists">
            <div className="view-options">
                <div className="view-mobile">
                    <div className="view">
                        <ViewModuleIcon
                            className={isGrid ? "icon-active" : "icon"}
                            onClick={handleChangeView}
                        />
                        <ViewListIcon
                            className={!isGrid ? "icon-active" : "icon"}
                            onClick={handleChangeView}
                        />
                    </div>
                    <div
                        onClick={handleOpenFilter}
                        className="filter-btn"
                    >
                        <FilterAltIcon />
                        <p>Bộ lọc</p>
                    </div>
                </div>
                <div className="other-view">
                    <div className="sort-by">
                        <p className="label">Sắp xếp theo: </p>
                        <Select
                            disableUnderline
                            value={sortType}
                            onChange={handleSortChange}
                            variant="standard"
                            className="mySelect"
                            MenuProps={{
                                classes: {
                                    paper: classes.paper
                                }
                            }}
                        >
                            <MenuItem value={1} className="menu-item">
                                <p className="item-label">
                                    Giá: giảm dần
                                </p>
                            </MenuItem>
                            <MenuItem value={2} className="menu-item">
                                <p className="item-label">
                                    Giá: tăng dần
                                </p>
                            </MenuItem>
                            <MenuItem value={3} className="menu-item">
                                <p className="item-label">
                                    Tên: A - Z
                                </p>
                            </MenuItem>
                            <MenuItem value={4} className="menu-item">
                                <p className="item-label">
                                    Tên: Z - A
                                </p>
                            </MenuItem>
                        </Select>
                    </div>
                    <div className="view-by">
                        <p className="label">Hiển thị: </p>
                        <Select
                            disableUnderline
                            value={viewType}
                            onChange={handleViewChange}
                            variant="standard"
                            className="mySelect"
                            MenuProps={{
                                classes: {
                                    paper: classes.paper
                                }
                            }}
                        >
                            <MenuItem value={1} className="menu-item">
                                <p className="item-label">
                                    18
                                </p>
                            </MenuItem>
                            <MenuItem value={2} className="menu-item">
                                <p className="item-label">
                                    24
                                </p>
                            </MenuItem>
                            <MenuItem value={3} className="menu-item">
                                <p className="item-label">
                                    30
                                </p>
                            </MenuItem>
                        </Select>
                    </div>
                </div>

            </div>

            <div className="list-wrapper">
                <div className="list-container">
                    <motion.div
                        variants={grid}
                        initial="hidden"
                        animate="visible"
                    >
                        <Grid container spacing={3} className="product-grid-container">
                            {randomItem && randomItem.map((product, index) => (
                                <Grid
                                    sm={6}
                                    md={4}
                                    xs={12}
                                    item key={index}
                                    className="product-grid-item"
                                >
                                    <FigurePoster
                                        key={index}
                                        ImgSrc={product.thumbImg}
                                        name={product.name}
                                        price={product.price}
                                        status={product.status}
                                        id={product.id}
                                        stock={product.stock}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                    <div className="pagination">
                        <Pagination
                            className={classes.root}
                            count={10}
                            color="primary"
                            onChange={handlePaginationChange}
                            hideNextButton={true}
                            hidePrevButton={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;
