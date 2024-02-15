import {Outlet} from "react-router-dom"

import Footer from "./mainpages/footer"
import Navbar from "./mainpages/navbar"
import Serachpage from "./mainpages/Serachpage";
import Clintcontex from "../createContex/Createcontex";
import { useContext } from "react";

function Assemble() {
const {searchinput} = useContext(Clintcontex);
  return (
    <div>
    <Navbar/>
    
        
        {searchinput?<Serachpage/>:<Outlet/>}
    <Footer/>

    </div>
  )
}

export default Assemble