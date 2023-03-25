import { Fragment } from "react";
import {Header} from './Header';


export const Layout = ({children}:{children:React.ReactNode})=>{
    return(
        <Fragment>
            <header>
                <Header/>
            </header>

            <main>
                {children}
            </main>

        </Fragment>    
    )
}