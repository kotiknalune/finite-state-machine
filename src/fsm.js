class FSM {

   constructor(config) {
        if (config != null) {
            this.throwCoin = config.initial;
            this.states = config.states;
            this.configInitial = config.initial;
            this.statesHistory = [];
            this.nextStatesHistory = [];
        } else {
            throw new Error("No config you have, young padawan");
        }
    }


    getState() {
        return this.throwCoin;
    }
  
    cpushButton(state) {
        if (state in this.states) {
            this.nextStatesHistory = [];
            this.statesHistory.push(this.throwCoin);
            this.throwCoin = state;
        } else {
            throw new Error("State aint on maps, sheriff");
        }
    }

     trigger(event) {
        if (event in this.states[this.throwCoin].transitions) {
            this.nextStatesHistory = [];
            this.statesHistory.push(this.throwCoin);
            this.throwCoin = this.states[this.throwCoin].transitions[event];
        } else {
            throw new Error("Something went wrong, Houston");
        }
    }

    reset() {
        this.throwCoin = this.configInitial;
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
        if (this.statesHistory.length > 0) {
            this.nextStatesHistory.push(this.throwCoin);
            this.throwCoin = this.statesHistory.pop();
            return true;
        } else {
            return false;
        }
    }
    redo() {
        if (this.nextStatesHistory.length > 0) {
            this.statesHistory.push(this.throwCoin);
            this.throwCoin = this.nextStatesHistory.pop();
            return true;
        } else {
            return false;
        }
    }

    clearHistory() {
        this.nextStatesHistory = [];
        this.statesHistory = [];
    }
}

module.exports = FSM;
