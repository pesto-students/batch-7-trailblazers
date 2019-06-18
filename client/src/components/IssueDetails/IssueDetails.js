import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Box } from '@material-ui/core';
import Button from './../Button/Button';
import CloseButton from '../CloseButton';
import { SERVER_URL } from '../../config';
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
    backgroundColor: theme.palette.primary,
  },
  newCommentInput: {
    color: theme.palette.primary.main,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  }
}));

const CommentsList = ({ data }) => {
  const comments = data.map((comment, index) => (
    <Paper className="comment-wrapper" key={`${comment.createdAt}${index}`}>
      <Box display="flex" justifyContent="space-between">
        <span className="comment-username">{comment.createdBy}</span>
        <span className="comment-time">{moment(comment.createdAt).fromNow()}</span>
      </Box>
      <Box className="comment-content">{comment.description}</Box>
    </Paper>
  ));

  return <div className="comments-wrapper">{comments}</div>;
};

const IssueDetails = ({ issueId, onClose }) => {
  const classes = useStyles();

  const [id, setId] = useState(0);
  const title = useFormInput('Loading');
  const dueDate = useFormInput(undefined, true);
  const assignee = useFormInput('');
  const newComment = useFormInput('');
  const description = useFormInput('');
  const [team, setTeam] = useState([]);
  const [comments, setComments] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  const { openSnackBar, closeSnackBar } = useSnackBar();
  const showError = message => openSnackBar('error', message);

  const getIssueDetails = () => {
    setDataLoading(true);
    requestToServer(
      axios.get(`${SERVER_URL}/issue/${issueId}`, {
        withCredentials: true,
      }),
      data => {
        setId(data.id);
        title.setNewValue(data.title);
        dueDate.setNewValue(data.dueDate);
        assignee.setNewValue(data.assignee);
        description.setNewValue(data.description);
        setTeam(data.team);
        setComments(data.comments);
        setDataLoading(false);
      },
      showError
    );
  };

  const handleOnNewComment = (ev) => {
    ev.preventDefault();

  }

  useEffect(getIssueDetails, [issueId]);
  const handleUpdate = () => {

  }

  return (
    <Paper className="IssueDetails">
      <header className={classes.header}>
        <div className="title-container">
          <div className="labeled">{id}</div>
          <EditableTextField
            className="title" 
            value={title.value}
            onChange={title.onChange} />
        </div>
        <CloseButton onClose={onClose} />
      </header>
      {dataLoading && <LinearProgress />}
      <div className="container">
        <div>
          <Box display="flex" justifyContent="space-between">
            <DatePicker
              className="date-picker"
              disablePast
              label="Due Date"
              value={dueDate.value}
              onChange={dueDate.onChange}
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
              variant="outlined"
              label="Description"
              rows="2"
              margin="normal"
              fullWidth
              multiline
              value={description.value}
              onChange={description.onChange}
            />
          </div>
          <div>
            <Paper className="comments-container">
              <form onSubmit={handleOnNewComment}>
                <TextField
                  color="primary"
                  variant="outlined"
                  placeholder="Write your comment..."
                  InputProps={{ className: classes.newCommentInput }}
                  margin="dense"
                  fullWidth
                  multiline
                  value={newComment.value}
                  onChange={newComment.onChange}
                />
              </form>
              <hr />
              <CommentsList data={comments} />
            </Paper>
          </div>
          <div>
            <Button loading={isSaving} onClick={handleUpdate}>Update</Button>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default IssueDetails;
