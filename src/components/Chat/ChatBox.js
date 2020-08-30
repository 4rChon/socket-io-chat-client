import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { clientSelector, messagesSelector } from "../../slices";
import { readMessage, prevMessages, nextMessages } from "../../slices/messages";

import { ChatMessage } from "../Chat";

const atBottom = (element, distance = 0) => {
  return (
    element.scrollHeight - (element.scrollTop + element.offsetHeight) <=
    distance
  );
};

const atTop = (element, distance = 0) => {
  return element.scrollTop <= distance;
};

export const ChatBox = () => {
  const dispatch = useDispatch();

  const [lock, setLock] = useState(false);
  const { roomId } = useSelector(clientSelector);
  const { offset, loading, messages, newMessage } = useSelector(
    messagesSelector
  );

  const endRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (!loading && newMessage && offset === 0) {
      endRef.current.scrollIntoView();
      dispatch(readMessage());
    }
  }, [dispatch, endRef, loading, offset, newMessage]);

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();
      if (lock) {
        return;
      }
      if (atTop(chatRef.current, 100)) {
        setLock(true);
        dispatch(prevMessages(roomId, offset, messages.length)).then(() =>
          setLock(false)
        );
      } else if (atBottom(chatRef.current, 100)) {
        setLock(true);
        if (offset === 0) {
          setLock(false);
        } else {
          dispatch(nextMessages(roomId, offset)).then(() => setLock(false));
        }
      }
    };
    window.addEventListener("touchmove", handleScroll);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, roomId, lock, offset, messages, chatRef]);

  useEffect(() => {
    const handleWheel = (event) => {
      if (lock) {
        return;
      }
      if (event.deltaY < 0 && atTop(chatRef.current, 10)) {
        setLock(true);
        dispatch(prevMessages(roomId, offset, messages.length)).then(() =>
          setLock(false)
        );
      } else if (event.deltaY > 0 && atBottom(chatRef.current, 10)) {
        setLock(true);
        if (offset === 0) {
          setLock(false);
        } else {
          dispatch(nextMessages(roomId, offset)).then(() => setLock(false));
        }
      }
    };

    window.addEventListener("wheel", handleWheel, true);
    return () => window.removeEventListener("wheel", handleWheel, true);
  }, [dispatch, roomId, lock, offset, messages, chatRef]);

  // useEffect(() => {
  //   if (newMessage && offset === 0) {
  //     const scrollHeight = chatRef.scrollHeight;
  //     const scrollTop = chatRef.scrollTop;
  //     const offsetHeight = chatRef.offsetHeight;
  //     if (scrollHeight - (scrollTop + offsetHeight) < 400) {
  //       endRef.current.scrollIntoView();
  //       dispatch(readMessage());
  //     }
  //   }
  // }, [dispatch, endRef, chatRef, newMessage, offset]);

  // useEffect(() => {
  //   const handleRead = (event) => {
  //     if (offset === 0 && atBottom(chatRef.current)) {
  //       dispatch(readMessage());
  //     }
  //   };
  //   window.addEventListener("wheel", handleRead, true);
  //   return () => window.removeEventListener("wheel", handleRead, true);
  // }, [dispatch, chatRef, offset]);

  return (
    <ul ref={chatRef} className="chat-box">
      {messages.map((data, index) => (
        <ChatMessage key={index} nick={data.nick} message={data.message} />
      ))}
      <div ref={endRef} />
    </ul>
  );
};
