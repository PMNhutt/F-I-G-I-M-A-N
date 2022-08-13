import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        productslist: [],
        cartEmpty: true,
        stockAvailable: {
            isAvailable: true,
            productID: 0,
        },
        stockAvailablePeek: false,
        addedMessage: false,
        errorMessage: false,
        cartPosition: {},
        addedProduct: {
            id: 0,
            amountAdded: 0,
        },
    },
    reducers: {
        //actions
        addItem: (state, action) => {
            state.cartEmpty = false

            let added = state.productslist.find((product) => {
                return product.id === action.payload.id
            })
            let addedAmount = 0
            let checkValidAmount = true

            if (action.payload.id === state.addedProduct.id) {
                addedAmount = state.addedProduct.amountAdded

                if (addedAmount >= action.payload.stock) {
                    checkValidAmount = false
                } else {
                    checkValidAmount = true
                }
            }

            if (checkValidAmount) {
                state.stockAvailable.isAvailable = true
                if (added === undefined) {
                    state.productslist.push(action.payload.product)
                } else {
                    let newAmount = 0
                    state.productslist.map((pro, index) => {
                        if (pro.id === added.id) {
                            newAmount = pro.amount + 1
                            state.productslist.splice(index, 1)
                        }
                    })
                    state.productslist = [...state.productslist, {
                        id: action.payload.id,
                        name: action.payload.name,
                        ImgSrc: action.payload.ImgSrc,
                        price: action.payload.price,
                        amount: newAmount,
                        maxAmount: action.payload.stock,
                    }]
                }
            } else {
                state.stockAvailable.isAvailable = false
            }

        },
        addItemFromPeek: (state, action) => {
            let added = state.productslist.find((product) => {
                return product.id === action.payload.id
            })


            let addedAmount = 0
            let checkValidAmount = true
            if (action.payload.id === state.addedProduct.id) {
                addedAmount = state.addedProduct.amountAdded

                if (action.payload.inputValue + addedAmount > action.payload.stock) {
                    checkValidAmount = false
                } else {
                    checkValidAmount = true
                }
            }

            if (checkValidAmount) {

                if (action.payload.inputValue >= 1) {
                    state.cartEmpty = false
                    state.errorMessage = false
                    state.addedMessage = true
                    if (added === undefined) {
                        state.productslist = [...state.productslist, {
                            id: action.payload.id,
                            name: action.payload.name,
                            ImgSrc: action.payload.thumbImg,
                            price: action.payload.price,
                            amount: action.payload.inputValue,
                            maxAmount: action.payload.stock,
                        }]
                    } else {
                        let newAmount = 0
                        state.productslist.map((pro, index) => {
                            if (pro.id === added.id) {
                                newAmount = pro.amount + action.payload.inputValue
                                state.productslist.splice(index, 1)
                            }
                        })
                        state.productslist = [...state.productslist, {
                            id: action.payload.id,
                            name: action.payload.name,
                            ImgSrc: action.payload.thumbImg,
                            price: action.payload.price,
                            amount: newAmount,
                            maxAmount: action.payload.stock,
                        }]
                    }
                } else {
                    state.errorMessage = true
                    state.addedMessage = false
                }
            } else {
                state.errorMessage = true
                state.stockAvailablePeek = true
            }
        },
        deleteItem: (state, action) => {
            let newAmount = 0
            let added = state.productslist.find((product) => {
                return product.id === action.payload
            })
            state.productslist.map((pro, index) => {
                if (pro.id === added.id) {
                    if (pro.amount === 1) {
                        state.productslist.splice(index, 1)
                        state.productslist = [...state.productslist]
                    } else {
                        newAmount = pro.amount - 1
                        state.productslist.splice(index, 1)
                        state.productslist = [...state.productslist, {
                            id: pro.id,
                            name: pro.name,
                            ImgSrc: pro.ImgSrc,
                            price: pro.price,
                            amount: newAmount,
                            maxAmount: pro.maxAmount,
                        }]
                    }
                }
            })
        },
        cartEmpty: (state, action) => {
            state.cartEmpty = action.payload
        },
        setStockAvailable: (state, action) => {
            state.stockAvailable.isAvailable = action.payload.isAvailable
            state.stockAvailable.productID = action.payload.productID
        },
        setStockAvailablePeek: (state, action) => {
            state.stockAvailablePeek = action.payload
        },
        setAddedProduct: (state, action) => {
            state.addedProduct = action.payload
        },
        setCartPosition: (state, action) => {
            state.cartPosition = action.payload
        },
        setAddedMessage: (state, action) => {
            state.addedMessage = action.payload;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        }
    }
})

export const { addItem, addItemFromPeek, deleteItem, cartEmpty, setStockAvailable, setStockAvailablePeek, setAddedProduct, setCartPosition, setAddedMessage, setErrorMessage } = cartSlice.actions;
export default cartSlice.reducer;