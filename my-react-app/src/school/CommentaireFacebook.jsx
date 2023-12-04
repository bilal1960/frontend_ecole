import React from 'react';
import { Comments } from 'react-facebook';
import { FacebookProvider } from 'react-facebook';

function CommentaireFacebook() {
  return (

<FacebookProvider appId="1131531151145849">
      <Comments href="http://localhost:5173/" numPosts="5" width="100%" />
    </FacebookProvider>

  );
}

export default CommentaireFacebook;
