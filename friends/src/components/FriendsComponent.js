import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../axiosAuth";

const FriendsComponent = () => {
    
    const [friends, setFriends] = useState(false)
    
    useEffect(
        axiosWithAuth().get("http://localhost:5000/api/friends")
        .then(res => {
            console.log(res);
            setFriends(res.data);
        }
        )
        .catch(err => console.log(err))
        , [friends])

    return(
        <section>
            {!friends && <p>Loading your friends</p>}
            {friends && friends.map(friend => <span>{friend.name}</span>)}
        </section>
    )
}

export default FriendsComponent;