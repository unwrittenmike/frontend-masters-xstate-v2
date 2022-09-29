import "./style.css";
import { createMachine, interpret, assign } from "xstate";

const machine = createMachine({
  initial: "loading",
  context: {
    count: 42,
  },
  states: {
    loading: {
      entry: ["loadData"],
      on: {
        SUCCESS: {
          actions: [
            () => {
              console.log("Assigning data");
            },
            assign({ count: (context, event) => context.count + event.value }),
          ],
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
  console.log(state.context);
});

window.service = service;
