import { useState, createContext } from 'react';

const ModalContext = createContext()

function ModalProvider({ children }) {

    const [showModal, setShowModal] = useState(false)
    const [cartEmpty, setCartEmpty] = useState(true)
    const [product, setProduct] = useState({})
    const [productList, setProductList] = useState([])

    

    const values = {
        showModal, setShowModal,
        cartEmpty, setCartEmpty,
        product, setProduct,
        productList, setProductList,
    }

    return (
        <ModalContext.Provider value={values}>
            {children}
        </ModalContext.Provider>
    )
}

export { ModalContext, ModalProvider }