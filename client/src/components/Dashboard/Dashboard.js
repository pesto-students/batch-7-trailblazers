import React, { Fragment, useEffect, useState } from "react";
import Board from "./Board";
import "./../../App.css";
import { Typography, Grid } from "@material-ui/core";
import { API_URL } from "./../../constants";
import AddBoardModel from "../CommonComponents/Modal";
import AddBoardForm from "./AddBoardForm";
import {SERVER_URL} from './../../config'
export default function Dashboard(props) {
  // useEffect(() => {
  //   fetchBoardList();
  // }, [props]);

  // async function fetchBoardList() {
  //   try {
  //     const rawResult = await fetch(
  //       API_URL + "dashboard/getboards/5cf9425d064475090357aa87"
  //     );
  //     const result = rawResult.json();
  //     console.log(result);
  //   } catch (exception) {
  //     console.log(exception);
  //   }
  // }
  const [openAddModel, setOpenAddModel] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch(`${SERVER_URL}/`,{
      method : 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  },[])

  function showAddBoardModel() {
    setOpenAddModel(true);
  }

  function goToBoard() {
    console.log("go to the board");
  }

  const handleModalClose = function() {
    setOpenAddModel(!openAddModel);
  };

  const handleBoardSaveClick = function(data) {
    setIsSaving(true);
    console.log(data);
    console.log("Savinggg..........");
    saveBoardData(data);
  };

  async function saveBoardData(data) {
    try {
      const rawResult = await fetch(
        API_URL + "dashboard/add/5cf9425d064475090357aa87",
        {
          method: "post",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" }
        }
      );

      const result = await rawResult.json();
      if (result.isSuccess) {
        setIsSaving(false);
        handleModalClose();
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (exception) {
      console.log(exception);
    }
  }

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <h3 className="left-margin-25">Personal</h3>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Board
            showAction={false}
            backgroundColor="grey"
            afterClick={showAddBoardModel}
          >
            <Typography
              variant="h6"
              component="h2"
              className="text-align-center"
            >
              Create Board
            </Typography>
          </Board>
          {[0, 1, 2, 3, 4, 5].map((value, index) => (
            <Board
              key={index}
              showAction={true}
              backgroundColor="#76a1e8"
              afterClick={goToBoard}
            >
              <Typography
                variant="h6"
                gutterBottom
                className="text-color-white"
              >
                h2. Heading
              </Typography>
            </Board>
          ))}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <h3 className="left-margin-25">Others</h3>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Board showAction={true} backgroundColor="#76a1e8">
            <Typography variant="h6" gutterBottom className="text-color-white">
              Pesto
            </Typography>
          </Board>
        </Grid>
      </Grid>

      <AddBoardModel
        open={openAddModel}
        handleClose={handleModalClose}
        width="500px"
        title="Add Board"
      >
        <AddBoardForm
          onClose={handleModalClose}
          onSave={handleBoardSaveClick}
          isSaving={isSaving}
        />
      </AddBoardModel>
    </Fragment>
  );
}
