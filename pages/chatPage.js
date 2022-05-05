import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from "react";
import { TouchableOpacity, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
    getDatabase,
    set,
    ref,
    push,
    query,
    child,
    orderByChild,
    onValue,
    onChildAdded
} from 'firebase/database';
import { AntDesign } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";


const ChatPage = ({ navigation }) => {
    const db = getDatabase();
    const collectionRef = ref(db, '/chats/');
    const cUser = getAuth().currentUser.email;

    const [user, setUser] = useState({
        _id: `${cUser}`,
        name: `${cUser}`,
        avatar: "https://placeimg.com/640/480/nature"
    })
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {

        const unsuscribe = onChildAdded(collectionRef, (snapshot) => {
            var y = [];

            y.push({
                _id: snapshot.val()._id,
                createdAt: snapshot.val().createdAt,
                text: snapshot.val().message,
                user: user
            })
            setMessages(previousMessages => GiftedChat.append(previousMessages, y));
        });
        return () => unsuscribe();
    }, []);

    const onSend = useCallback((msgs = []) => {
        // setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        // const { _id, createdAt, text, user } = messages[0];
        // push(collectionRef, {
        //     _id,
        //     createdAt,
        //     text,
        //     user
        // });
        let currentDate = new Date();


        for (let i = 0; i < msgs.length; i++) {
            push(collectionRef, {
                _id: msgs[i]._id,
                message: msgs[i].text,
                user: msgs[i].user,
                createdAt: currentDate,
            })
        }

    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={user}

        />
    )

}

export default ChatPage;