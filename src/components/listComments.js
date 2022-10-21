import "../css/listchat.css";
import React from 'react';
import ListComment from "./listComment.js";

export default function ListComments({editor, comments, setArray}) {
    function removeComment(item) {
        var coms = [];

        if (item > -1) {
            if (comments.length > 0) {
                comments.splice(item, 1);
                coms = comments;
            }
        }
        setArray(coms);
    }

    if (comments) {
        const commentItems = comments.map((_id, i) => {
            return (
                <ListComment
                    item={i}
                    comment={_id.comment}
                    index1={_id.index[0] ? _id.index[0] : 0}
                    index2={_id.index[1] ? _id.index[1] : 1}
                    quill={editor}
                    removeComment={removeComment}
                />
            );
        });

        return (
            <>
                {commentItems}
            </>
        );
    }
}