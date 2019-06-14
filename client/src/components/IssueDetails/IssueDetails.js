import React from 'react';
import CloseButton from '../CloseButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useFormInput } from '../../customHooks';
import OutlinedSelectInput from '../OutlinedSelectInput';
import EditableTextField from '../EditableTextField/EditableTextField';
import DatePicker from '../DatePicker';
import './IssueDetails.css';

const IssueDetails = ({ data }) => {
  const { issueId } = data;

  const title = useFormInput(data.title);
  const dueDate = useFormInput(data.dueDate, true);
  const assignee = useFormInput(data.assignee);

  const onClose = () => {};

  const teamNames = data.team.map(user => user.name);

  return (
    <Paper className="IssueDetails">
      <header>
        <div className="title-container">
          <div className="labeled">{issueId}</div>
          <EditableTextField className="title" {...title} />
        </div>
        <CloseButton onClose={onClose} />
      </header>
      <div className="container">
        <Grid container justify="space-around">
          <DatePicker label="Due Date" {...dueDate} />
          <OutlinedSelectInput
            label="Assignee"
            {...assignee}
            data={teamNames}
            selected={data.assignee}
            className="assignee-selector"
          />
        </Grid>
      </div>
    </Paper>
  );
};

export default IssueDetails;
