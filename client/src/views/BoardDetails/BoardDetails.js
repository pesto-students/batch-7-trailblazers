import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Modal from '@material-ui/core/Modal';
import IssueDetails from '../../components/IssueDetails/IssueDetails';
import { useSnackBar } from '../../customHooks';
import axios from 'axios';
import KanbanView from '../../components/KanbanView';
import './BoardDetails.css';

const BoardDetails = (props) => {
  const { openSnackBar, closeSnackBar } = useSnackBar();


  const [open, setOpen] = useState(true);
  const [team, setTeam] = useState([]);

  const showError = message => openSnackBar('error', message);

  const getTeamDetails = () => {
    (async () => {
      // try {
      //   const res = await axios.get('/board/team');
      //   if (!res || !res.data) {
      //     throw new Error('No response from server');
      //   }
      //   const { isSuccess, message, data } = res.data;
      //   if (!isSuccess) throw new Error(message);
      //   setTeam(data);
      // } catch (err) {
      //   showError(err.message);
      // }

      setTeam([{ name: 'Vikalp' }, { name: 'Manish' }, { name: 'Pravesh' }]);
    })();
  };

  useEffect(getTeamDetails, []);

  return (
    <div>
      <Header name="Board" />
      <KanbanView boardId={props.match.params.id} />
      <Modal
        aria-labelledby="issue-details"
        aria-describedby="issue-details"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="issueDetails-container">
          <IssueDetails
            data={{
              title: 'Yo',
              issueId: 1355,
              dueDate: '2019-06-18T21:00:00',
              assignee: 'Vikalp',
              team
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default BoardDetails;
