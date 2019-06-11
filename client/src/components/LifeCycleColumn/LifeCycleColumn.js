import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Issue from '../Issue';

const IssueList = React.memo(({ issues }) =>
  issues.map((issue, index) => (
    <Issue key={issue._id} issue={issue} index={index} />
  ))
);

const DroppableContainer = ({ id, children, className = '' }) => (
  <Droppable droppableId={id}>
    {({ innerRef, droppableProps, placeholder }) => (
      <div className={className} ref={innerRef} {...droppableProps}>
        {children}
        {placeholder}
      </div>
    )}
  </Droppable>
);

const LifeCycleColumn = ({ title, issues = [] }) => (
  <div className="LifeCycleColumn">
    <header>
      <h3>{title}</h3>
    </header>
    <DroppableContainer id={title}>
      <IssueList issues={issues} />
    </DroppableContainer>
  </div>
);

export default LifeCycleColumn;
