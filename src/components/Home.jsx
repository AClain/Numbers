import React, { useState } from 'react';

import {
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    LinearProgress
} from '@material-ui/core';

import './css/home.css';

import calls from '../assets/js/calls';
import BoredActivity from './BoredActivity';
import NumberFact from './NumberFact';

export default function Home(props) {
    var dateFormat = require('dateformat');
    var now = new Date();

    const [state, setState] = useState(0);
    const [loading, setLoading] = useState(false);

    const [activity, setActivity] = useState(null);
    const [fact, setFact] = useState(null);
    const [number, setNumber] = useState(42);
    const [date, setDate] = useState(dateFormat(now, 'isoDate'));
    const [type, setType] = useState('trivia');

    const handleNumber = (e) => {
        setNumber(e.target.value);
    }

    const handleType = (e) => {
        setType(e.target.value);
    }

    const handleDate = (e) => {
        setDate(e.target.value);
    }

    const getActivity = () => {
        setState(0);
        setLoading(true);
        calls.getRandomActivity()
            .then((res) => {
                setActivity(res);
                setTimeout(() => {
                    setLoading(false);
                    setState(2);
                }, 500);
            }, (err) => {
                console.log('err ' + err);
            });
    }

    const getFact = (number, type) => {
        setState(0);
        setLoading(true);
        calls.getNumberFact(number, type)
            .then((res) => {
                setFact(res);
                setTimeout(() => {
                    setLoading(false);
                    setState(1);
                }, 500);
            }, (err) => {
                console.log('err ' + err);
            });
    }

    const getFactDate = (date) => {
        setState(0);
        setLoading(true);
        calls.getDateFact(date)
            .then((res) => {
                setFact(res);
                setTimeout(() => {
                    setLoading(false);
                    setState(1);
                }, 500);
            }, (err) => {
                console.log('err ' + err);
            });
    }

    return (
        <Grid container alignItems='center' justify='space-evenly'>
            <Grid item xs={5} id='filter_container'>
                <h1 id='title'>I am bored. I want to know a fact for ...</h1>
                <FormControl className='input'>
                    <TextField
                        label='Number'
                        type='text'
                        value={number}
                        onChange={(e) => { handleNumber(e) }}
                    />
                </FormControl>
                <FormControl className='input'>
                    <InputLabel id="type">Type</InputLabel>
                    <Select
                        labelId="type"
                        value={type}
                        defaultValue={type}
                        defaultChecked={type}
                        onChange={(e) => { handleType(e) }}
                    >
                        <MenuItem value={'math'}>Math</MenuItem>
                        <MenuItem value={'trivia'}>Trivia</MenuItem>
                        <MenuItem value={'year'}>Year</MenuItem>
                    </Select>
                </FormControl>
                <button
                    className='button' id='number_button'
                    onClick={() => { getFact(number, type) }}>a number</button>
                <FormControl className='input'>
                    <TextField
                        label='Date'
                        type="date"
                        defaultValue={date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => { handleDate(e) }}
                    />
                </FormControl>
                <button
                    className='button' id='date_button'
                    onClick={() => { getFactDate(date) }}>a date</button>
                <button
                    className='button' id='activity_button'
                    onClick={() => { getActivity() }}>Give me something to do</button>
            </Grid>
            {state === 1 ? (
                <NumberFact fact={fact} />
            ) : (null)}
            {state === 2 ? (
                <BoredActivity activity={activity} />
            ) : (null)}
            {loading ? (
                <Grid item xs={6}>
                    <LinearProgress color="secondary" />
                </Grid>
            ) : (null)}
        </Grid>
    )
}