import React, {useEffect, useState} from 'react'
import { Row, Col, List, Avatar } from 'antd'
import axios from 'axios'
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe'
import Comment from './Sections/Comment'
import LikeDislikes from './Sections/LikeDislikes'

function VideoDetailPage(props) {

    const postId = props.match.params.videoId
    const variable  = { postId : postId }

    const [VideoDetail, setVideoDetail] = useState({})
    const [CommentLists, setCommentLists] = useState([])

    useEffect(() => {
        axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success){
                    setVideoDetail(response.data.videoDetail)
                }else{
                    alert('비디오 정보를 가져오지 못했습니다.')
                }
            })


        axios.post('/api/comment/getComments', variable)
            .then(response => {
                if(response.data.success){
                    setCommentLists(response.data.comments)
                }else{
                    alert('코멘트 정보를 불러오지 못했습니다.')
                }
            })

    }, [])

    const refreshFunction = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    if(VideoDetail.writer){

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id}/>

        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div style={{width:'100%', padding:"3rem 4rem"}}>
                        <video style={{width:'99%', height:"420px"}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>
                        <List.Item
                            actions={[<LikeDislikes video={postId} userId={localStorage.getItem('userId')} />, subscribeButton]}
                        >
    
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
    
                        </List.Item>
                        
    
                        {/* Commenta */}
                        <Comment commentLists={CommentLists} postId={postId} refreshFunction={refreshFunction} />
    
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )

    }else{
        return <div>...loading</div>
    }

    
}

export default VideoDetailPage
