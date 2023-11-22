import { FormControl, InputLabel, MenuItem, Select,Box } from '@mui/material';
import React, { useState } from 'react'
import OverviewChart from 'components/OverviewChart';
import Header from 'components/Header';

const Overview = () => {
    const [view, setView] = useState("units");
    return (
        <Box m="1.5rem 2.5rem" >
            <Header
                title="Overview"
                description="Revenue and profits"
            />
            <Box height="75vh">
                <FormControl sx={{ mt: "1rem" }}>
                    <InputLabel>View</InputLabel>
                    <Select label="View" value={view} onChange={(e) => setView(e.target.value)}>
                        <MenuItem value="units">Units</MenuItem>
                        <MenuItem value="sales">Sales</MenuItem>
                    </Select>
                </FormControl>
                <OverviewChart view={view}/>
            </Box>
        </Box>
    );
};

export default Overview
