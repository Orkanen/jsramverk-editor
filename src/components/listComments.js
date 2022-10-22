import "../css/listchat.css";
import React, { useState, useEffect } from 'react';
import ListComment from "./listComment.js";

export default function ListComments({editor, comments, setArray}) {
    const [newComment, setNewComment] = useState([]);
    const [newList, setNewList] = useState(<></>);

    function removeComment(item, index1, index2) {
        var coms = [];

        if (item > -1) {
            if (newComment.comments.length > 0) {
                newComment.comments.splice(item, 1);
                editor.quill.current.editor.formatText(index1, index2, "background", "white");
                coms = newComment.comments;
            }
        }

        setNewComment(coms);
        setArray(coms);
    }

    useEffect(() => {
        setNewComment({comments}.comments);
    }, [{comments}]);

    useEffect(() => {
        setNewList(List(newComment));
    }, [newComment]);


    function List(data) {
        var sidebar = null;

        if (data.comments) {
            sidebar = (
                <>
                    {data.comments?.map((_id, i) =>
                        <ListComment
                            item={i}
                            comment={_id.comment}
                            index1={_id.index[0] ? _id.index[0] : 0}
                            index2={_id.index[1] ? _id.index[1] : 1}
                            quill={editor}
                            removeComment={removeComment}
                        />
                    )}
                </>
            );
        }

        return (
            <div>{sidebar}</div>
        );
    }

    return (
        <>
            {newList}
        </>
    );
}
