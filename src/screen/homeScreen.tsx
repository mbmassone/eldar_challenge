import { useEffect, useState } from 'react';

import axios from 'axios'
import { SnackbarCloseReason } from '@mui/material/Snackbar';

import Backdrop from '../components/backdrop';
import AlertSnackbar from '../components/alertSnackbar';
import AppBar from '../components/appBar';
import Post from '../components/post';
import CommentsDialog from '../components/commentsDialog';

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const HomeScreen = () => {
    const userData = useSelector((state: any) => state.userData)
    const navigate = useNavigate();

    const [posts, setPosts] = useState<Post[]>([]);
    const [id, setId] = useState<number | undefined>(undefined);
    const [postsId, setPostsId] = useState<Post[]>([]);
    const [debouncedId, setDebouncedId] = useState<number | undefined>(id);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [showComments, setShowComments] = useState(false);
    const [commentsId, setCommentsId] = useState<number | undefined>(undefined);
    
    useEffect(() => {
        if(userData.profile == "") {
            navigate('/login')
            return;
        }
        
        setLoading(true)
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => {
            setPosts(res.data)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {                
        if(debouncedId != undefined) {
            axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${debouncedId}`)
            .then(res => {
                if(res.data.length == 0) {
                    setSnackbarOpen(true);
                }
                else {
                    setPostsId(res.data)
                }
                setLoading(false)
            })
            .catch(err => {
                if(err.response.status == 404) {
                    setLoading(false)
                }
                else {
                    console.log(err)
                }
            })
        }
    }, [debouncedId])
    
    useEffect(() => {
        setSnackbarOpen(false)
        if(id != undefined) {
            setLoading(true)
            const timer = setTimeout(() => setDebouncedId(id), 500);  
            return () => clearTimeout(timer);
        }
    }, [id]);

    const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason !== 'clickaway') {
            setSnackbarOpen(false);
        }
    };

    const handleShowComments = (id: number) => {
        setCommentsId(id);
        setShowComments(true);
    }

    const deletePost = (id: number) => {
        setLoading(true)
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(_res => {
            setPosts((posts) => posts.filter(post => post.id != id));
            setPostsId((postsId) => postsId.filter(post => post.id != id));
            setLoading(false);
        })
        .catch(err => {
            if(err.response.status == 404) {
                setLoading(false)
            }
            else {
                console.log(err)
            }
        })
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', width: '100%'}}>
            <AppBar id={id} setId={setId} />

            <Backdrop open={loading} />

            <AlertSnackbar open={snackbarOpen} handleSnackbarClose={handleSnackbarClose} message={`There is no post associated with user id ${debouncedId}!`}/>

            {/* <div style={{alignSelf: 'self-start'}}>homeScreen</div> */}

            {/* <NumberField id={id} setId={setId} /> */}

            {!loading &&
                <>{(posts && (!id || id == undefined || postsId.length == 0)) ?
                    <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around"}}>
                        {posts.map((post: any) => (
                            <Post key={post.id} post={post} handleShowComments={handleShowComments} deletePost={deletePost}/>
                        ))}
                    </div>
                :
                    <>{postsId.length > 0 &&
                        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around"}}>
                            {postsId.map((post: any) => (
                            <Post key={post.id} post={post} handleShowComments={handleShowComments} deletePost={deletePost}/>
                        ))}
                        </div>
                    }</>
                }</>
            }

            <CommentsDialog posts={posts} showComments={showComments} setShowComments={setShowComments} commentsId={commentsId} />
        </div>

    )
}

export default HomeScreen