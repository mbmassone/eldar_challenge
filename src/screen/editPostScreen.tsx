import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const editPostScreen = () => {
    const userData = useSelector((state: any) => state.userData)
    const navigate = useNavigate();

    useEffect(() => {
        if(userData.profile != "admin") {
            navigate('/error')
            return;
        }
    }, [])
    
    const location = useLocation();
    const { post } = location.state || {};

    const [updatedPost, setUpdatedPost] = useState<Post>(post)

    const equalPosts = (post1: Post, post2: Post): boolean => {
        return (
            post1.userId === post2.userId &&
            post1.id === post2.id &&
            post1.title === post2.title &&
            post1.body === post2.body
        );
    }

    const updatePost = (property: keyof Post, newValue: any) => {
        if (updatedPost?.hasOwnProperty(property)) {
            setUpdatedPost({...updatedPost, [property]: newValue});
        }
    }

    const numFilter = (input: string) => {
        return input.replace(/\D/g, '');
    }

    const update = () => {
        if (!equalPosts(updatedPost, post)) {
            axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, JSON.stringify(updatedPost))
            .then(_res => {
                navigate('/')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <div style={{display: "flex", flexDirection: "column", width: "100%", alignItems: "center"}}>
            <h1 style={{alignSelf: "flex-start", marginLeft: 10}}>Edit Post</h1>
            <div style={{width: 400, minWidth: 400, height: 600, minHeight:600, backgroundColor: 'lightGrey', margin: "20px 20px", padding: 10, borderRadius: 15, boxShadow: "3px 5px 10px 5px rgba(0, 0, 0, 0.35)", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <TextField label="id" variant="outlined" value={updatedPost?.id} onChange={(e) => updatePost('id', numFilter(e.target.value))}/>
                <TextField label="userId" variant="outlined" value={updatedPost?.userId} onChange={(e) => updatePost('userId', numFilter(e.target.value))}/>
                <TextField label="title" variant="outlined" value={updatedPost?.title} onChange={(e) => updatePost('title', e.target.value)}/>
                <TextField multiline rows={10} label="body" variant="outlined" value={updatedPost?.body} onChange={(e) => updatePost('body', e.target.value)}/>
                <Button variant="contained" onClick={update} style={{margin: '10px 0px', backgroundColor: 'black'}}>UPDATE</Button>
            </div>
        </div>
    )
}

export default editPostScreen