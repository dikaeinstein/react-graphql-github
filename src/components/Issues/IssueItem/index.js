import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const IssueItem = ({ issue }) => {
  return (
    <div className="IssueItem">
      {/* placeholder to add a show/hide comment button later */}
      <div className="IssueItem-content">
      <h3>
        <Link to={issue.url}>{issue.title}</Link>
      </h3>
      <div dangerouslySetInnerHTML={{ __html: issue.bodyHTML }} />
      {/* placeholder to render a list of comments later */} </div>
    </div>
  );
};

export default IssueItem;
