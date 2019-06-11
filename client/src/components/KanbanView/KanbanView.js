import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import { SERVER_URL } from '../../config';
import LifeCycleColumn from '../LifeCycleColumn';
import { useSnackBar } from '../../customHooks';

const KanbanView = () => {
  const [lifeCycles, setLifeCycles] = useState([]);
  const { openSnackBar } = useSnackBar();
  const showError = useCallback(message => openSnackBar('error', message), [
    openSnackBar
  ]);

  const getBoards = useCallback(async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/board/`);
      if (!res || !res.data) throw new Error('No response from server');
      if (!res.data.isSuccess) throw new Error(res.data.message);

      setLifeCycles(res.data.lifeCycles);
    } catch (err) {
      showError(err.message);
    }
  }, [showError]);

  useEffect(() => {
    getBoards();
  }, [getBoards]);

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

    axios.post(`${SERVER_URL}/issue/${issue._id}`, {
      lifeCycle: finishLifeCycleName
    });
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
