/* eslint-disable react/prop-types */
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import APIs from "../../Backend/backend";
import TextField from "@mui/material/TextField";
import colors from "../../scss/SCSSVariables";
import "./deleteEmployee.scss";
import { useSnackbar } from "notistack";

function DeleteEmployee({ state, setState, roomToDelete }) {
  console.log(roomToDelete);
  const { enqueueSnackbar } = useSnackbar();
  function handleSnackBar(error) {
    enqueueSnackbar(error, {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      variant: "error",
    });
  }
  function handleSnackBarSuccess(success) {
    enqueueSnackbar(success, {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      variant: "success",
    });
  }

  async function deleteTheRoomFunc(e) {
    e.preventDefault();
    const response = await fetch(APIs.apiLink + "/api/Room/" + roomToDelete, {
      method: "DELETE",
    });
    if (response.ok) {
      handleSnackBarSuccess("Room deleted");
      window.location.reload();
    } else {
      const errorResponse = await response.json();
      console.log(errorResponse);
      handleSnackBar(errorResponse.$value[0].errorMessage);
    }
  }
  return state ? (
    <div id="deleteRoom">
      <div id="DeleteRoomContainer">
        <div id="topDeleteRoom">
          <h1>Delete Room</h1>
          <button
            onClick={() => {
              document.body.style.overflow = "unset";
              setState(false);
            }}
          >
            <CloseIcon />
          </button>
        </div>
        <div id="message">
          {" "}
          <b>
            Are you sure you want to delete this room? This action can't be
            changed
          </b>
        </div>
        <button id="deleteRoomButton" onClick={deleteTheRoomFunc}>
          Delete
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}
export default DeleteEmployee;
