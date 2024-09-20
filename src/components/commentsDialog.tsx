
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'

import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface Comment {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

const commentsDialog = ({posts, showComments, setShowComments, commentsId} : {posts: Post[], showComments: boolean, setShowComments: any, commentsId?: number}) => {
    const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [scroll, _setScroll] = useState<DialogProps['scroll']>('body');
  
    useEffect(() => {
        if(showComments) {
            setLoadingComments(true)

            setSelectedPost(posts.find(post => post.id == commentsId))
            
            axios.get(`https://jsonplaceholder.typicode.com/posts/${commentsId}/comments`)
            .then(res => {
                setComments(res.data)
                setLoadingComments(false)
            })
            .catch(err => {
                if(err.response.status == 404) {
                    setLoadingComments(false)
                }
                else {
                    console.log(err)
                }
            })
        }
    }, [showComments])

    const handleClose = () => {
        setShowComments(false);
    };
  
    const descriptionElementRef = useRef<HTMLElement>(null);
    useEffect(() => {
      if (showComments) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [showComments]);

    return (
        <React.Fragment>
            <Dialog
                open={showComments && !loadingComments}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{selectedPost?.title}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <h2>{selectedPost?.body}</h2>
                        
                        <h4 style={{marginTop: "50px"}}>{comments.length} comments:</h4>
                        {comments.map((comment: Comment) => {
                            return (
                                <div key={comment.id}>
                                    <hr />
                                    <h4>{comment.email}:</h4>
                                    <p style={{color: "black"}}>{comment.name}</p>
                                    <p>{comment.body}</p>
                                </div>
                            )
                        } )}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

export default commentsDialog