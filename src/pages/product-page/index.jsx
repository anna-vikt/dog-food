import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CardList } from '../../components/card-list'
import { NotFound } from '../../components/not-found';
import Product from '../../components/product';
import { Sort } from '../../components/sort'
import { Spinner } from '../../components/spinner';
import { CardsContext } from '../../contexts/card-context';
import { UserContext } from '../../contexts/current-user-context';
import { useApi } from '../../hooks/useApi';
import api from '../../utils/api';
import { isLiked } from '../../utils/products';

import s from './styles.module.css';


export const ProductPage = () => {
    const { productId } = useParams();
    const { handleLike } = useContext(CardsContext);
    
    const handleGetProduct = useCallback(() => api.getProductById(productId), [productId]);
    
    const {data: product, loading: isLoading, error: errorState, setData: setProduct} = useApi(handleGetProduct);

    
    function handleProductLike(product) {
        handleLike(product).then((updateCard) => {
            setProduct(updateCard)
        })
    }

    return (
        <>
            {isLoading
                ? <Spinner />
                : !errorState && <Product {...product}  onProductLike={handleProductLike} />
            }
            {!isLoading && errorState && <NotFound title="Товар не найден" />}
        </>
    )
}