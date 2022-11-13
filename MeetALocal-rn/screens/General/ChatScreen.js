import React, { useState, useCallback, useEffect, useContext } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { UserContext } from '../../App'
import { database } from "../../firebase";
import { address } from '../../constants/address';
import {
    collection,
    orderBy,
    onSnapshot,
    query,
    where,
    doc,
    getDocs,
    addDoc,
    updateDoc
} from "firebase/firestore";
import { useRoute } from '@react-navigation/native';
const ChatScreen=()=> {
    const route = useRoute(); 
    let chatId= route.params.chatId
    const userId= route.params.userId
    const [messages, setMessages] = useState([]);
    const { user, setUser} = useContext(UserContext);
    const uri=`${address}/${user.profile_picture}`
    useEffect(() => {
        getMessages()
    }, []);
    console.log(userId)
    const getMessages = async () => {
        if(!chatId){
            var flag=true
            const q = query(collection(database, "chats"), where("users", "array-contains", user.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (doc) => {
            if(doc.data().users.includes(userId)){
                flag=false
                chatId=doc.id}})
            if(flag){
            const newChat = await addDoc(collection(database, "chats"), {
            users: [user.id, userId],
            });
            chatId=newChat.id}
        }
        const docRef = doc(database, "chats", chatId);
        const colRef = collection(docRef, "messages");
        
        const q = query(colRef, orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) =>
            setMessages(
                snapshot.docs.map((doc) => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user,
                }))
            )
        );
        return () => {
            unsubscribe();
        };
    };

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];
        updateDoc(doc(database, `chats/${chatId}`), {
            "last_message":{
                text,
                createdAt
            }
        })
        addDoc(collection(database, `chats/${chatId}`, "messages"), {
            _id,
            createdAt,
            text,
            user,
        });
    }, []);
    return (
        <GiftedChat
            showUserAvatar={true}
            isTyping={true}
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: user.id,
                name: user.name,
                avatar:uri,
            }}
            scrollToBottom
            renderUsernameOnMessage={true}
        />
    )
}
export default ChatScreen
