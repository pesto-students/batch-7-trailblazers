import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import CloseButton from '../CloseButton';
import Paper from '@material-ui/core/Paper';
import { useFormInput } from '../../customHooks';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedSelectInput from '../OutlinedSelectInput';
import EditableTextField from '../EditableTextField/EditableTextField';
import DatePicker from '../DatePicker';
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

const CommentsList = ({data}) => {

  const comments = data.map((comment, index) => (
    <Paper className="comment-wrapper" key={`${comment.time}${index}`}>
      <Box display="flex" justifyContent="space-between">
        <span className="comment-username">
          {comment.username}
        </span>
        <span className="comment-time">{comment.time}</span>
      </Box>
      <Box className="comment-content">
        {comment.content}
      </Box>
    </Paper>
  ))

  return(
    <div className="comments-wrapper">
      {comments}
    </div>
  );
}

const IssueDetails = ({ data }) => {
  const { issueId } = data;
  const classes = useStyles();

  const title = useFormInput(data.title);
  const dueDate = useFormInput(data.dueDate, true);
  const assignee = useFormInput(data.assignee);
  const description = useFormInput(data.description);
  const [comments, setComments] = useState(data.comments);
  const newComment = useFormInput('');

  const onClose = () => {};

  const teamNames = data.team.map(user => user.name);

  return (
    <Paper className="IssueDetails">
      <header className={classes.header}>
        <div className="title-container">
          <div className="labeled">{issueId}</div>
          <EditableTextField className="title" {...title} />
        </div>
        <CloseButton onClose={onClose} />
      </header>
      <div className="container">
        <div>
          <Box display="flex" justifyContent="space-between">
            <DatePicker className="date-picker" disablePast label="Due Date" {...dueDate} />
            <OutlinedSelectInput
              label="Assignee"
              {...assignee}
              data={teamNames}
              selected={data.assignee}
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
