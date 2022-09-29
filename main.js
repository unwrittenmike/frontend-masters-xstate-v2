import "./style.css";
import { createMachine, interpret } from "xstate";

const machine = createMachine({
  initial: "loading",
  states: {
    loading: {
      entry: ["loadData"],
      on: {
        SUCCESS: {
          actions: () => {
            console.log("Assigning data");
          },
          target: "loaded",
        },
      },
    },
    loaded: {},
  },
}).withConfig({
  actions: {
    loadData: () => {
      console.log("loadData");
    },
  },
});

const service = interpret(machine).start();

service.subscribe((state) => {
  console.log(state.value, state.actions);
});

window.service = service;
