import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import CloseButton from '../CloseButton';
import Paper from '@material-ui/core/Paper';
import { useFormInput } from '../../customHooks';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedSelectInput from '../OutlinedSelectInput';
import EditableTextField from '../EditableTextField/EditableTextField';
import axios from 'axios';
import DatePicker from '../DatePicker';
import { useSnackBar } from '../../customHooks';
import { requestToServer } from '../../util/helper';
import LinearProgress from '@material-ui/core/LinearProgress';
import './IssueDetails.css';

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: theme.palette.primary.light,
  },
  newCommentInput: {
    color: theme.palette.primary.main,
    backgroundColor: '#ffffff',
  }
}));

const CommentsList = ({ data }) => {
  const comments = data.map((comment, index) => (
    <Paper className="comment-wrapper" key={`${comment.time}${index}`}>
      <Box display="flex" justifyContent="space-between">
        <span className="comment-username">{comment.username}</span>
        <span className="comment-time">{comment.time}</span>
      </Box>
      <Box className="comment-content">{comment.content}</Box>
    </Paper>
  ));

  return <div className="comments-wrapper">{comments}</div>;
};

const IssueDetails = ({ issueId, onClose }) => {
  const classes = useStyles();

  const id = useFormInput(0);
  const title = useFormInput('Loading');
  const dueDate = useFormInput(new Date(), true);
  const assignee = useFormInput('');
  const newComment = useFormInput('');
  const description = useFormInput('');
  const [team, setTeam] = useState([]);
  const [comments, setComments] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const { openSnackBar, closeSnackBar } = useSnackBar();
  const showError = message => openSnackBar('error', message);

  const getIssueDetails = () => {
    setDataLoading(true);
    requestToServer(
      axios.get(`/issue/${issueId}`),
      data => {
        id.onChange(data.id);
        title.onChange(data.title);
        dueDate.onChange(data.dueDate);
        assignee.onChange(data.assignee);
        description.onChange(data.description);
        setTeam(data.team);
        setComments(data.comments);
        setDataLoading(false);
      },
      showError
    );
  };

  useEffect(getIssueDetails, [issueId]);

  return (
    <Paper className="IssueDetails">
      {dataLoading && <LinearProgress />}
      <header className={classes.header}>
        <div className="title-container">
          <div className="labeled">{id}</div>
          <EditableTextField className="title" {...title} />
        </div>
        <CloseButton onClose={onClose} />
      </header>
      <div className="container">
        <div>
          <Box display="flex" justifyContent="space-between">
            <DatePicker
              className="date-picker"
              disablePast
              label="Due Date"
              {...dueDate}
            />
            <OutlinedSelectInput
              label="Assignee"
              {...assignee}
              data={team}
              selected={assignee}
              className="assignee-selector"
            />
          </Box>
          <div>
            <TextField
              variant="filled"
              label="Description"
              rows="2"
              margin="normal"
              fullWidth
              multiline
              {...description}
            />
          </div>
          <div>
            <Paper className="comments-container">
              <TextField
                color="primary"
                variant="outlined"
                placeholder="Write your comment..."
                InputProps={{ className: classes.newCommentInput }}
                margin="dense"
                fullWidth
                multiline
                {...newComment}
              />
              <hr />
              <CommentsList data={comments} />
            </Paper>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default IssueDetails;
