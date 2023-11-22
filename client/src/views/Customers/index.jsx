import React from 'react'
import { useGetCustomersQuery } from 'states/api'
import { Box, useTheme } from "@mui/material"
import Header from 'components/Header'
import { DataGrid } from '@mui/x-data-grid'


const Customers = () => {
    const { data, isLoading } = useGetCustomersQuery();
    // console.log("Cus",data);
    const theme = useTheme();
    const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ]; 
  return (
      <Box>
          <Header title="Customers" description="List of Customers" />
          <Box mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
          >
              <DataGrid
                  loading={isLoading || !data}
                  columns={columns}
                  rows={data || []}
                  getRowId={(row)=>row._id}
              />
          </Box>
    </Box>
  )
}

export default Customers
