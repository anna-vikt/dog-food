import { CardList } from "../../components/card-list";
import { Sort } from "../../components/sort";
import { Spinner } from "../../components/spinner";

import s from './styles.module.css'

export function CatalogPage({isLoading}) {
    return(
        <>
            {isLoading
                ? <Spinner />
                : <>
                    <Sort />
                    <CardList o />
                </>
            }
        </>
    )
}