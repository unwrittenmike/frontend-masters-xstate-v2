// @ts-check
import "../style.css";
import { createMachine, assign, interpret, send } from "xstate";
import { raise } from "xstate/lib/actions";
import elements from "../utils/elements";

const playerMachine = createMachine({
  initial: "loading",
  states: {
    loading: {
      on: {
        LOADED: {
          actions: ["assignSongData"],
          target: "playing",
        },
      },
    },
    paused: {
      on: {
        PLAY: { target: "playing" },
      },
    },
    playing: {
      entry: ["playAudio"],
      exit: ["pauseAudio"],
      on: {
        PAUSE: { target: "paused" },
      },
    },
  },
  on: {
    SKIP: {
      target: "loading",
    },
    LIKE: {
      actions: [() => console.log("Like song")],
    },
    UNLIKE: {
      actions: [() => console.log("Unlike song")],
    },
    DISLIKE: {
      actions: ["dislikeSong", raise({ type: "SKIP" })],
    },
    VOLUME: {
      actions: [() => console.log("Change volume")],
    },
  },
}).withConfig({
  actions: {
    assignSongData: () => {
      console.log("Assigning song data");
    },
    pauseAudio: () => {
      console.log("Pause audio");
    },
    playAudio: () => {
      console.log("Play audio");
    },
    dislikeSong: () => {
      console.log("Dislike Song");
    },
    // Add implementations for the actions here, if you'd like
    // For now you can just console.log something
  },
});

elements.elPlayButton.addEventListener("click", () => {
  service.send({ type: "PLAY" });
});
elements.elPauseButton.addEventListener("click", () => {
  service.send({ type: "PAUSE" });
});
elements.elSkipButton.addEventListener("click", () => {
  service.send({ type: "SKIP" });
});
elements.elLikeButton.addEventListener("click", () => {
  service.send({ type: "LIKE" });
});
elements.elDislikeButton.addEventListener("click", () => {
  service.send({ type: "DISLIKE" });
});

const service = interpret(playerMachine).start();

service.subscribe((state) => {
  console.log(state.actions);

  elements.elLoadingButton.hidden = !state.matches("loading");
  elements.elPlayButton.hidden = !state.can({ type: "PLAY" });
  elements.elPauseButton.hidden = !state.can({ type: "PAUSE" });
});

service.send("LOADED");
