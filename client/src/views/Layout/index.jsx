import React, { useState } from 'react'
import {Box,useMediaQuery} from "@mui/material"
import Navbar from "components/Navbar"
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Sidebar from 'components/Sidebar'
import { useGetProductsQuery, useGetUserQuery } from 'states/api'
import axios from "axios"


const Layout = () => {
  const isOnMobile = useMediaQuery("(min-width: 600px)")
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const userId = useSelector((state) => state.main.userId)
  const { data } = useGetUserQuery(userId);
  const pData=useGetProductsQuery()
  // const Show = async () =>
  // {
  //   // console.log(userId);
  //   try {
  //     const result = await axios.get(`/api/v1/client/products`);
  //     console.log(result.data)
  //   }
  //   catch (err)
  //   {
  //     console.log(err)
  //   }  
  // }
  // Show()
  // console.log(pData.data)
  return (
    <Box display={isOnMobile ? "flex" : "block"} width="100%" height="100%" >
      <Sidebar
        user={data || {}}
          isSideBarOpen= {isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          drawerWidth="250px"
          isOnMobile={isOnMobile}
      />
        <Box flexGrow={1}>
        <Navbar
                user={data || {}}
              isSideBarOpen={isSideBarOpen}
              setIsSideBarOpen={setIsSideBarOpen}/>
            <Outlet/>
        </Box>
    </Box>
  )
}

export default Layout
