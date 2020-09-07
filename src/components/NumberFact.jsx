import React from 'react';

import {
    Grid
} from '@material-ui/core';

import './css/fact.css';

export default function NumberFact(props) {

    return (
        <Grid item xs={6} className='fact_container'>
            <p>{props.fact}</p>
        </Grid>
    )
}