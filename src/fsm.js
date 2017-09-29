class FSM {

  constructor(config) {
     
   if (config == null){
        throw new Error("No config");
                      }
      else {(this.config = config);
      this.throwCoin = config.initial;
      this.pushThrough = null;
            }
    }

    getthrowCoin() {
      return this.throwCoin;
    }

    changethrowCoin(throwCoin) {
      if (throwCoin in this.config.throwCoins){
        this.pushThrough = this.throwCoin;
        this.throwCoin = throwCoin;
      } else {
        throw new Error();
      }
    }

    trigger(event) {
      var key = this.throwCoin;
      if (this.config.throwCoins[key].transitions[event]){
        this.throwCoin = this.config.throwCoins[key].transitions[event];
      } else {
        throw new Error();
      }
    }

    reset() {
      this.throwCoin = this.config.initial;
    }

    getthrowCoins(event) {
      var throwCoins = [];
      for(var key in this.config.throwCoins){
        if (event == null){
          throwCoins.push(key);
        } else if (event in this.config.throwCoins[key].transitions){
          throwCoins.push(key);
        }
      }
      return throwCoins;
    }

    undo() {
      if (this.pushThrough == null){
        return false;
      } else {
        this.throwCoin = this.pushThrough;
      }
    }
    
    redo() {
      return true;
    }

    clearHistory() {}
}

module.exports = FSM;
