import axios from 'axios';
import React, { Fragment, useState, useRef, useEffect } from 'react';
import Button from './../Button';
import KanbanView from '../KanbanView';
import { SERVER_URL } from '../../config';
import AddIssueModal from './AddIssueModal';
import { useSnackBar } from '../../customHooks';
import Modal from './../CommonComponents/Modal';
import constants from './../../constants';
import { useFormInput } from '../../customHooks';
import {
  Icon,
  Popover,
  List,
  ListItem,
  ListItemText,
  Box,
  TextField
} from '@material-ui/core';
import HeaderWithUserAvatar from '../HeaderWithUserAvatar';

const BoardDetails = props => {
  const boardId = props.match.params.id;
  const [settingAnchorEl, setSettingAnchorEl] = useState(null);
  const openSetting = Boolean(settingAnchorEl);
  const [openAddIssueModal, setOpenIssueModal] = useState(false);
  const [openInviteUserDialog, setOpenInviteUserDialog] = useState(false);
  const inviteeEmail = useFormInput('');
  const { openSnackBar } = useSnackBar();
  const [userRole, setUserRole] = useState('USER');
  const [boardName, setBoardName] = useState('Loading...');
  const { USER } = constants.ROLES;

  const showError = message => openSnackBar('error', message);
  const showSuccess = message => openSnackBar('success', message);
  const handleSettingClick = event => setSettingAnchorEl(event.currentTarget);
  const goToMembers = () => props.history.push(`setting/${boardId}`);
  const afterIssueAdded = () => kanbanReference.current.refreshBoard();
  const handleClickOpenInviteDialog = () => setOpenInviteUserDialog(true);
  const handleCloseInviteDialog = () => setOpenInviteUserDialog(false);

  useEffect(() => {
    fetchRole();
  }, [fetchRole, props]);

  const handleSaveInvite = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: `${SERVER_URL}/board/${boardId}/invite`,
        data: { email: inviteeEmail.value },
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (response && response.data && response.data.isSuccess) {
        handleCloseInviteDialog();
        showSuccess(`Sent invitation`);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        showError(err.response.data.message);
      } else {
        showError('Something went wrong');
      }
    }
  };

  async function fetchRole() {
    try {
      const result = await axios(`${SERVER_URL}/board/member/role/${boardId}`, {
        withCredentials: true
      });
      if (result.data.data.length > 0) {
        setUserRole(result.data.data[0].role);
      }
    } catch (error) {
      const { isSuccess, message } = error.response.data;
      if (!isSuccess) {
        openSnackBar('error', message);
      }
    }
  }

  const kanbanReference = useRef();

  return (
    <Fragment>
      <HeaderWithUserAvatar name={boardName}>
        <Button onClick={() => setOpenIssueModal(true)}>
          <Icon>add</Icon>New Issue
        </Button>

        {userRole === USER || (
          <Button onClick={handleClickOpenInviteDialog}>
            <Icon>add</Icon>Invite
          </Button>
        )}
        <Icon
          style={{ fontSize: 30, float: 'right', cursor: 'pointer' }}
          onClick={handleSettingClick}
        >
          settings
        </Icon>
      </HeaderWithUserAvatar>
      <Popover
        open={openSetting}
        onClose={() => setSettingAnchorEl(null)}
        anchorEl={settingAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <List component="nav" aria-label="Mailbox folders">
          <ListItem onClick={goToMembers} button>
            <ListItemText primary="Members" />
          </ListItem>
        </List>
      </Popover>

      <Modal
        title="Invite"
        open={openInviteUserDialog}
        handleClose={handleCloseInviteDialog}
        width="450px"
      >
        Please enter the email address below to invite someone for collaboration
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          {...inviteeEmail}
        />
        <div style={{ marginTop: '10px' }}>
          <div className="float-right">
            <Button onClick={handleSaveInvite} color="primary">
              Invite
            </Button>
          </div>
          <div className="float-right">
            <Button onClick={handleCloseInviteDialog}>Cancel</Button>
          </div>
        </div>
      </Modal>
      <Box m={1}>
        <KanbanView
          ref={kanbanReference}
          boardId={props.match.params.id}
          setBoardName={setBoardName}
        />
      </Box>

      {openAddIssueModal && (
        <AddIssueModal
          boardId={boardId}
          open={openAddIssueModal}
          handleClose={() => setOpenIssueModal(false)}
          afterSave={afterIssueAdded}
        />
      )}
    </Fragment>
  );
};

export default BoardDetails;
