import "../style.css";

// Create a state machine transition function either using:
// - a switch statement (or nested switch statements)
// - or an object (transition lookup table)

// Also, come up with a simple way to "interpret" it, and
// make it an object that you can `.send(...)` events to.

const machine = {
  initial: "loading",
  states: {
    loading: {
      on: {
        LOADED: "playing",
      },
    },
    playing: {
      on: {
        PAUSE: "paused",
      },
    },
    paused: {
      on: {
        PLAY: "playing",
      },
    },
  },
};

function transition(state, event) {
  const nextStatus =
    machine.states[state.status].on?.[event.type] ?? state.status;

  return { value: nextStatus };
}

const stateMachine = {
  state: { value: machine.initial },
  on(event) {
    console.log(event);
    this.state = { ...transition(this.state, { type: event }) };
    console.log(this.state);
  },
};

window.machine = machine;
window.transition = transition;
window.stateMachine = stateMachine;
