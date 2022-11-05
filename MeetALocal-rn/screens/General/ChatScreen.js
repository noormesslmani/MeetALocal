import React, { useState, useCallback, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { UserContext } from '../../App'
import { database } from "../../firebase";
import {
  collection,
  orderBy,
  onSnapshot,
  query,
  addDoc,
  where,
  doc
} from "firebase/firestore";
import { useRoute } from '@react-navigation/native';
const ChatScreen=()=> {
    const route = useRoute();
    const chatId= route.params.user.id
    const image= route.params.image
    const name= route.params.name
    const type= route.params.type_id
    const [messages, setMessages] = useState([]);
    const { user, setUser} = useContext(UserContext);
    const uri=`http://192.168.1.7:8000/${user.profile_picture}`
    useEffect(() => {
        getMessages()
    }, []);
    console.log(chatId)
    const getMessages = async () => {
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
    console.log(messages)

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];
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
