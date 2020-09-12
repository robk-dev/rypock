import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { Tabs, Header } from './components/Layout';
import Editor from './pages/Editor';
import AlternateTimeline from './components/Timeline/Timeline';

export default function App() {
    return (
        <>
            <Header />
            <Tabs />
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item lg={3} md={2} />
                <Grid item lg={6} md={8} xs={12}>
                    <Editor />
                </Grid>
                <Grid item lg={3} md={2} />
            </Grid>
            <Paper>
                <AlternateTimeline />
            </Paper>
        </>
    );
}
