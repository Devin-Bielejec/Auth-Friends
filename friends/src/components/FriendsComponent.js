import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../axiosAuth";
import FormikAddFriendForm from "../forms/AddFriendForm";

const FriendsComponent = () => {
    
    const [friends, setFriends] = useState([])
    
    useEffect(() => {
        axiosWithAuth().get("http://localhost:5000/api/friends")
        .then(res => {
            console.log(res);
            setFriends(res.data);
        }
        )
        .catch(err => console.log(err))
    }, [])

    const addFriend = (stuff) => {
        setFriends(stuff);
    }

    return(
        <section>
            {!friends && <p>Loading your friends</p>}
            {friends && friends.map(friend => <span>{friend.name}</span>)}

            <FormikAddFriendForm addFriend={addFriend}/>
        </section>
    )
}

export default FriendsComponent;