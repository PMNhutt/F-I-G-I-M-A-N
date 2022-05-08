import { useState, createContext } from 'react';

const ModalContext = createContext()

function ModalProvider({ children }) {

    const [showModal, setShowModal] = useState(false)
    const [cartEmpty, setCartEmpty] = useState(true)
    const [product, setProduct] = useState()
    const [productList, setProductList] = useState([])
    const [showPeekModal, setShowPeekModal] = useState(false)
    const [error, setError] = useState(false)
    const [addedAnouncement, setAddedAnouncement] = useState(false)
    const [addedProduct, setAddedProduct] = useState({
        id: 0,
        amountAdded: 0,
    })
    

    const values = {
        showModal, setShowModal,
        cartEmpty, setCartEmpty,
        product, setProduct,
        productList, setProductList,
        showPeekModal, setShowPeekModal,
        error, setError,
        addedProduct, setAddedProduct,
        addedAnouncement, setAddedAnouncement,
    }

    return (
        <ModalContext.Provider value={values}>
            {children}
        </ModalContext.Provider>
    )
}

export { ModalContext, ModalProvider }