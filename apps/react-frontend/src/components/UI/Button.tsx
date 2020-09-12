import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
    })
);

export default function CustomizedButtons() {
    const classes = useStyles();

    return <Button variant="contained" color="primary" className={classes.margin}></Button>;
}

// import { createMuiTheme, createStyles, withStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import { green, purple } from '@material-ui/core/colors';

// const _BootstrapButton = withStyles({
//     root: {
//         boxShadow: 'none',
//         textTransform: 'none',
//         fontSize: 16,
//         padding: '6px 12px',
//         border: '1px solid',
//         lineHeight: 1.5,
//         backgroundColor: '#0063cc',
//         borderColor: '#0063cc',
//         fontFamily: [
//             '-apple-system',
//             'BlinkMacSystemFont',
//             '"Segoe UI"',
//             'Roboto',
//             '"Helvetica Neue"',
//             'Arial',
//             'sans-serif',
//             '"Apple Color Emoji"',
//             '"Segoe UI Emoji"',
//             '"Segoe UI Symbol"',
//         ].join(','),
//         '&:hover': {
//             backgroundColor: '#0069d9',
//             borderColor: '#0062cc',
//             boxShadow: 'none',
//         },
//         '&:active': {
//             boxShadow: 'none',
//             backgroundColor: '#0062cc',
//             borderColor: '#005cbf',
//         },
//         '&:focus': {
//             boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
//         },
//     },
// })(Button);

// const ColorButton = withStyles((theme: Theme) => ({
//     root: {
//         color: theme.palette.getContrastText(purple[500]),
//         backgroundColor: purple[500],
//         '&:hover': {
//             backgroundColor: purple[700],
//         },
//     },
// }))(Button);

// const theme = createMuiTheme({
//     palette: {
//         primary: green,
//     },
// });
