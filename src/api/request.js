import React, { Component } from 'react';
import { Fetch } from 'react-request';

class Request extends Component {
  render() {
    return (
      <Fetch url="https://jsonplaceholder.typicode.com/posts/1">
       {({ fetching, failed, data }) => {
         if (fetching) {
           return <div>Loading data...</div>;
         }

         if (failed) {
           return <div>The request did not succeed.</div>;
         }

         if (data) {
           return (
             <div>
               <div>Post ID: {data.id}</div>
               <div>Post Title: {data.title}</div>
             </div>
           );
         }

         return null;
       }}
     </Fetch>

    );
  }
}

export default Request;
