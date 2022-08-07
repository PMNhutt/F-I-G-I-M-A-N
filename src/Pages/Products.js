import { useEffect } from 'react';
import Nav from '../Components/Nav/Nav'
import Footer from '../Components/Footer/Footer'
import ProductsContainer from '../Components/Products/ProductsContainer';


function Products({ title }) {

    useEffect(() => {
        document.title = title;
    }, [title])


    return (
        <div>
            <Nav />
            <ProductsContainer />
            <Footer />
        </div>
    );
}

export default Products;
