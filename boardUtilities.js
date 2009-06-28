function BoardUtilities(){
  this._stones = new Hash();
  this.stones = function(){ return this._stones };

  this._boardSize = 19;
  this.boardSize = function(){ return this._boardSize };

  //Returns true if the specified player has a stone on the coords
  this.isPlayer = function(_coords,player){
    move = this.stones().get(_coords)
    if(move == undefined || move.player != player){ return false };

    return true;
  }

  //Returns true if the coords are on the board
  this.isOnBoard = function(_coords){
    if(_coords[0] < 0 || _coords[0] >= this.boardSize() || _coords[1] >= this.boardSize() || _coords[1] < 0){
      return false;
    }
    return true;
  }

  //Returns true if the coords are on the board and blank
  this.isLiberty = function(_coords){
    if(!this.isOnBoard(_coords)){ return false };

    if(this.stones().get(_coords) == undefined){ return true };

    return false;
  }

  //Gives the opposite of either 1 or 0
  this.otherPlayer = function(player){
    return Math.abs(player - 1);
  }

  this.adjacentSpots = function(_coords){
    var spots = new Array();
    x = Number(_coords[0]);
    y = Number(_coords[1]);
    possibleSpots = new Array([x-1,y],[x+1,y],[x,y-1],[x,y+1]);
    possibleSpots.each(function(spot){ if(this.isOnBoard(spot)){spots.push(spot)}}.bind(this));
    return spots;
  }

  this.applyUpdatesToStones = function(updateHash){
    updateHash.each(function(key,value){
      if(key == 0 || key == 1){
        this.stones().set(key);
      } else {
        this.stones().unset(key);
      }
    }.bind(this))
  }
}
