import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import LifeCycleColumn from '../LifeCycleColumn';
import { useSnackBar } from '../../customHooks';
import { DragDropContext } from 'react-beautiful-dnd';
import './KanbanView.css';

const KanbanView = ({ boardId }) => {
  const [lifeCycles, setLifeCycles] = useState([]);
  const { openSnackBar } = useSnackBar();
  const showError = useCallback(message => openSnackBar('error', message), [
    openSnackBar
  ]);

  const getBoards = () => {
    (async () => {
      try {
        const res = await axios.get(`/board/${boardId}`);

        if (!res || !res.data) throw new Error('No response from server');
        const { isSuccess, message, data } = res.data;
        if (!isSuccess) throw new Error(message);

        setLifeCycles(data.lifeCycles);
      } catch (err) {
        showError(err.message);
      }
    })();
  };

  useEffect(getBoards, []);

  const onDragEnd = result => {
    const { source, destination } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const finishLifeCycleName = destination.droppableId;

    const startLifeCycleName = source.droppableId;
    const startLifeCycle = lifeCycles[startLifeCycleName];
    const startIssues = Array.from(startLifeCycle);
    const issue = startIssues[source.index];

    if (startLifeCycleName !== finishLifeCycleName) {
      const { _id } = issue;
      axios.post(`/issue/changeLifeCycle`, {
        _id,
        lifeCycle: finishLifeCycleName
      });
    }
  };

  const lifeCycleColumns = Object.entries(lifeCycles).map(([key, value]) => (
    <LifeCycleColumn key={key} title={key} issues={value.issues} />
  ));

  return (
    <div className="KanbanView">
      <DragDropContext onDragEnd={onDragEnd}>
        {lifeCycleColumns}
      </DragDropContext>
    </div>
  );
};

export default KanbanView;
