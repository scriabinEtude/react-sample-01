import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    const subscribedVariable = {userTo: props.userTo, userFrom : localStorage.getItem('userId')}

    useEffect(() => {
        axios.post('/api/subscribe/subscribeNumber', subscribedVariable)
            .then(response=>{
                if(response.data.success){
                    setSubscribeNumber(response.data.subscribeNumber)
                }else{
                    alert('구독자 수 정보를 받아오지 못했습니다.')
                }
            })

        

        axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then((response) => {
                if(response.data.success){
                    setSubscribed(response.data.subscribed)
                }else{
                    alert('구독정보를 불러오지 못했습니다.')
                }
            })

    }, [])

    const onSubscribe = () => {

        //구독취소하기
        if(Subscribed){
            axios.post('/api/subscribe/unSubscribe', subscribedVariable)
                .then(response => {
                    if(response.data.success){
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    }else{
                        alert('구독 취소 실패 했습니다.')
                    }
                })
        }
        //구독하기
        else{
            axios.post('/api/subscribe/subscribe', subscribedVariable)
                .then(response => {
                    if(response.data.success){
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    }else{
                        alert('구독 실패 했습니다.')
                    }
                })
        }
    }

    return (
        <div>
            <button
                style={{backgroundColor:`${Subscribed? '#AAAAAA' : '#CC0000'}`, 
                borderRadius:'4px', color:'white', padding:'10px 16px',
                fontWeight:'500', fontSize:'1rem', textTransform:'uppercase'}}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed':'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
