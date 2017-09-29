class FSM {

   constructor(config) {
        if (config != null) {
            this.normal = config.initial;
            this.states = config.states;
            this.configInitial = config.initial;
            this.statesPast = [];
            this.nextStatesPast = [];
        } else {
            throw new Error("No config you have, young padawan");
        }
    }


    getState() {
        return this.normal;
    }
  
    changeState(state) {
        if (state in this.states) {
            this.nextStatesPast = [];
            this.statesPast.push(this.normal);
            this.normal = state;
        } else {
            throw new Error("State aint on maps, sheriff");
        }
    }

     trigger(event) {
        if (event in this.states[this.normal].transitions) {
            this.nextStatesPast = [];
            this.statesPast.push(this.normal);
            this.normal = this.states[this.normal].transitions[event];
        } else {
            throw new Error("Something went wrong, Houston");
        }
    }

    reset() {
        this.normal = this.configInitial;
    }
     getStates(event) {
        var array = [];
        if (event == null) {
            for (var state in this.states) {
                array.push(state);
            }
            return array;
        } else {
            for (var state in this.states) {
                if (this.states[state].transitions[event]) {
                    array.push(state);
                }
            }
            return array;
        }
    }
   undo() {
        if (this.statesPast.length > 0) {
            this.nextStatesPast.push(this.normal);
            this.normal = this.statesPast.pop();
            return true;
        } else {
            return false;
        }
    }
    redo() {
        if (this.nextStatesPast.length > 0) {
            this.statesPast.push(this.normal);
            this.normal = this.nextStatesPast.pop();
            return true;
        } else {
            return false;
        }
    }

    clearPast() {
        this.nextStatesPast = [];
        this.statesPast = [];
    }
}

module.exports = FSM;
