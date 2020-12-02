import Axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'
import {Button, Input} from 'antd';

const {TextArea} = Input

function Comment(props) {

    const postId = props.postId

    const user = useSelector(state => state.user)
    const [CommentValue, setCommentValue] = useState("")

    const handleChange = (event) => {
        setCommentValue(event.currentTarget.value)
    }
    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content : CommentValue,
            writer : user.userData._id,
            postId : postId
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success){
                    setCommentValue("")
                    props.refreshFunction(response.data.result)
                }else{
                    alert('코멘트를 저장하지 못했습니다.')
                }
            })
    }

    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />

            {/* Comment Lists */}
            {props.commentLists && props.commentLists.map((comment, index)=>(
                (!comment.responseTo && 
                    <React.Fragment key={index}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={postId} />
                        <ReplyComment parentCommnetId={comment._id} postId={postId} commentLists={props.commentLists} />
                    </React.Fragment>
                )
            ))}
            

            {/* Root Comment Form*/}

            <form style={{display:'flex'}} onSubmit={onSubmit} >
                <TextArea 
                    style={{width:'100%', borderRadius:'5px'}}
                    onChange={handleChange}
                    value={CommentValue}
                    placeholder="코멘트를 작성해 주세요"
                />

                <br />
                <Button style={{width:'20%', height:'52px'}} onClick={onSubmit} >Submit</Button>


                

            </form>

        </div>
    )
}

export default Comment
