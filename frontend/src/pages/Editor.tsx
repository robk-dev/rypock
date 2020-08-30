import React, { useRef } from 'react';
import EditorJs from 'react-editor-js';
// import Button from '../../components/UI/Button/Button'
import axios from "axios";

import './Editor.css';

import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import Personality from '@editorjs/personality'
// import TextField from '@material-ui/core/TextField';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Button, Container, Typography, Box, Paper } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(2),
                width: '25ch',
            },
        },
    }),
);


export const EDITOR_JS_TOOLS = {
    embed: {
        class: Embed,
        inlineToolbar: true
    },
    table: {
        class: Table,
        inlineToolbar: true
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true
    },
    personality: {
        class: Personality,
        inlineToolbar: true
    },
    list: {
        class: List,
        inlineToolbar: true
    },
    warning: {
        class: Warning,
        inlineToolbar: true
    },
    code: {
        class: Code,
        inlineToolbar: true
    },
    linkTool: {
        class: LinkTool,
        inlineToolbar: true
    },
    image: {
        class: Image,
        inlineToolbar: true
    },
    raw: {
        class: Raw,
        inlineToolbar: true
    },
    header: {
        class: Header,
        inlineToolbar: true
    },
    quote: {
        class: Quote,
        inlineToolbar: true
    },
    marker: {
        class: Marker,
        inlineToolbar: true
    },
    checklist: {
        class: CheckList,
        inlineToolbar: true
    },
    delimiter: {
        class: Delimiter,
        inlineToolbar: true
    },
    inlineCode: {
        class: InlineCode,
        inlineToolbar: true
    },
    simpleImage: {
        class: SimpleImage,
        inlineToolbar: true
    }
};

const ReactEditor = () => {
    const classes = useStyles();
    const instanceRef: any = useRef();

    async function handleSave() {
        const savedData = await instanceRef.current.save();
        axios.post('http://localhost:8080/article', { data: savedData })
            .then((response) => {
                console.log({ response });
            })
            .catch(console.error)

        console.log("savedData", savedData);
    }

    return (
        <React.Fragment>
            <Paper>
                <Box m={4.5}>
                    {/* <div contentEditable className="cdx-input" data-placeholder="Custom placeholder">
                    </div> */}
                    <div className="post-title" contentEditable data-placeholder="Title"></div>
                    <Typography variant='subtitle1'>by John Doe</Typography>
                    <EditorJs
                        instanceRef={instance => { instanceRef.current = instance; console.log({ instance }) }}
                        tools={EDITOR_JS_TOOLS}
                        holder="editor-js"
                        placeholder="Type here..."

                        // logLevel="ERROR"
                        data={{
                            //     time: 1556098174501,
                            blocks: [
                                {
                                    type: "header",
                                    data: {
                                        text: "Editor.js",
                                        level: 2
                                    }
                                },
                                {
                                    type: "paragraph",
                                    data: {
                                        text:
                                            "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
                                    }
                                },
                                //         {
                                //             type: "header",
                                //             data: {
                                //                 text: "Key features",
                                //                 level: 3
                                //             }
                                //         },
                                //         {
                                //             type: "list",
                                //             data: {
                                //                 style: "unordered",
                                //                 items: [
                                //                     "It is a block-styled editor",
                                //                     "It returns clean data output in JSON",
                                //                     "Designed to be extendable and pluggable with a simple API"
                                //                 ]
                                //             }
                                //         },
                                //         {
                                //             type: "header",
                                //             data: {
                                //                 text: "What does it mean «block-styled editor»",
                                //                 level: 3
                                //             }
                                //         },
                                //      
                                //         {
                                //             type: "paragraph",
                                //             data: {
                                //                 text:
                                //                     'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.'
                                //             }
                                //         },
                                //         {
                                //             type: "header",
                                //             data: {
                                //                 text: "What does it mean clean data output",
                                //                 level: 3
                                //             }
                                //         },
                                //         {
                                //             type: "paragraph",
                                //             data: {
                                //                 text:
                                //                     "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below"
                                //             }
                                //         },
                                //         {
                                //             type: "paragraph",
                                //             data: {
                                //                 text:
                                //                     'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.'
                                //             }
                                //         },
                                //         {
                                //             type: "paragraph",
                                //             data: {
                                //                 text:
                                //                     "Clean data is useful to sanitize, validate and process on the backend."
                                //             }
                                //         },
                                //         {
                                //             type: "delimiter",
                                //             data: {}
                                //         },
                                //         {
                                //             type: "paragraph",
                                //             data: {
                                //                 text:
                                //                     "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
                                //             }
                                //         },
                                //         {
                                //             type: "image",
                                //             data: {
                                //                 file: {
                                //                     url:
                                //                         "https://codex.so/upload/redactor_images/o_e48549d1855c7fc1807308dd14990126.jpg"
                                //                 },
                                //                 caption: "",
                                //                 withBorder: true,
                                //                 stretched: false,
                                //                 withBackground: false
                                //             }
                                // }
                            ],
                            version: "2.12.4"
                        }}
                    >
                        <div id="editor-js" />
                    </EditorJs>
                </Box>
                <Grid container justify="center">
                    <Button variant="contained" color="secondary" >Publish</Button>
                </Grid>
            </Paper>
        </React.Fragment >
    );
};


export default ReactEditor;

