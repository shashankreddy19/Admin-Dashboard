import React from 'react'
import { Search } from '@mui/icons-material'
import { IconButton,TextField,InputAdornment } from '@mui/material'
import {
    GridToolbarDensitySelector,
    GridToolbarColumnsButton,
    GridToolbarExport,
    GridToolbarContainer
} from "@mui/x-data-grid"
import Flex from './Flex'

const DataGridToolbar = ({setSearchInput,setSearch,searchInput}) => {
    return (
        <GridToolbarContainer>
            <Flex width="100%">
                <Flex>
                    <GridToolbarDensitySelector />
                    <GridToolbarColumnsButton />
                    <GridToolbarExport/>
                </Flex>
                <TextField
                    label="search..."
                    variant='standard'
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    sx={{mb : "0.5rem",width : "15rem"}}
                    InputProps={{
                            endAdornment :(
                     <InputAdornment position='end'>
                            <IconButton onClick={() => {
                                setSearch(searchInput)
                                setSearchInput("")
                            }}>
                                <Search/>
                            </IconButton>
                    </InputAdornment>),
                    }}
                />
            </Flex>
      </GridToolbarContainer>
  )
}

export default DataGridToolbar
