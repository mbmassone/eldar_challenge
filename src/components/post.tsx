import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CommentIcon from '@mui/icons-material/CommentOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';

import { useSelector} from 'react-redux'
import { useState } from 'react';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const post = ({post, handleShowComments} : {post: Post, handleShowComments: any}) => {
    const userData = useSelector((state: any) => state.userData)
    const [isAdmin, _setIsAdmin] = useState(userData.profile == "admin")

    return (
        <div style={{width: 300, minWidth: 300, height: 350, minHeight:300, backgroundColor: 'lightGrey', margin: "20px 20px", padding: 10, borderRadius: 15, boxShadow: "3px 5px 10px 5px rgba(0, 0, 0, 0.35)", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <h3 style={{textAlign: "left"}}>{post.title}</h3>
            <p style={{textAlign: "left"}}>{post.body}</p>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <PersonIcon />
                    <p>: {post.userId}</p>
                </div>
                <div style={{display: "flex", flexDirection: `${isAdmin ? "row" : "row-reverse"}`, alignItems: "center", width: "50%" ,justifyContent: "space-between"}}>
                    <button style={{border: "none", background: "transparent", padding: 0}} onClick={() => handleShowComments(post.id)}><CommentIcon /></button>
                    {isAdmin &&
                        <>
                            <button style={{border: "none", background: "transparent", padding: 0}} onClick={() => console.log("edit")}><EditIcon /></button>
                            <button style={{border: "none", background: "transparent", padding: 0}} onClick={() => console.log("delete")}><DeleteIcon /></button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default post