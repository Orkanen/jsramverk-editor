import "../css/listchat.css";
import React from 'react';
import ListComment from "./listComment.js";

export default function ListComments({editor, comments}) {
    if (comments.comments) {
        const commentItems = {comments}.comments.comments.map((_id, i) => {
            return (
                <ListComment
                    item={i}
                    comment={_id.comment}
                    index1={_id.index[0] ? _id.index[0] : 0}
                    index2={_id.index[1] ? _id.index[1] : 1}
                    quill={editor}
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
