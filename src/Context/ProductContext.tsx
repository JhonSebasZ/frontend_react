import React, { useState } from 'react'
import { Product, ProductContextState } from '../Types/Product'

interface ProviderProps{
    children:React.ReactNode;
}

//Se crea el contecto para el estado del usuario
export const Context = React.createContext<ProductContextState | null>(null);

const ProductProvider:React.FC<ProviderProps> = ({children}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cartNumber, setCartNumber] =useState<number>(0);
    const [search, setSearch] =useState<string>('');

    const addProductToCart = (product:Product) => {
        const addedProduct:Product = {
            itemId:product.itemId,
            imageUrl:product.imageUrl,
            name:product.name,
            description:product.description,
            price:product.price,
            amount:product.amount
        }

        let addProduct:boolean = true;
        //valida si el producto ya existe, si existe solo se aumenta la cantidad
        for(let i:number=0; i< products.length; i++){
            if(addedProduct.itemId === products[i].itemId){
                products[i].amount++;
                addProduct = false;
                //TODO: implementar el break
            }
        }

        if(addProduct){
            setProducts([...products, addedProduct])
        }

        
    };

    //eliminar producto del carrito
    const removeProductFromCart = (productId:number) => {
        setProducts(products.filter((product:Product) => product.itemId !== productId))
    };

    const removeAllProductsFromCart = () => {
        setProducts([]);
    };

    //Actualiza el numero total de elementos en el carrito
    const itemsInCart = (n:number):number =>{
        setCartNumber(cartNumber+n);
        return cartNumber;
    };

    //calcula el total a pagar del carrito
    const cartTotal = (products:Product[]):number => {
        let total:number = 0;
        for(let i:number=0; i<products.length; i++){
            total += products[i].price * products[i].amount;
        }
        return total;
    };
    //actualiza la cantidfad de unb producto en el carrito
    const updateAmount = (productId:number, n:number) =>{
        for(let i:number=0; i<products.length; i++){
            if(productId === products[i].itemId){
                products[i].amount = products[i].amount + n;
                //TODO: implementar el break
            }
        }
    };

    const itemSearch = (e:string) => {
        if(e){
            setSearch(e);
        }
    };

    return(
        <Context.Provider 
        value={{
            products,
            addProductToCart,
            removeProductFromCart,
            removeAllProductsFromCart,
            itemsInCart,
            cartTotal,
            updateAmount,
            itemSearch,
            cartNumber,
            search
        }}
        >
            {children}
        </Context.Provider>
    );
}

export default ProductProvider;