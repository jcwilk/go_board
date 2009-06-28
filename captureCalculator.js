function CaptureCalculator(_boardMap) {
  this.inheritFrom = BoardUtilities;
  this.inheritFrom(); //Inheritance, yay

  this._stones = _boardMap;

  this._visited = new Array();
  this.visited = function(){ return this._visited }

  this._captures = new Array();
  this.captures = function(){ return this._captures }

  this.player = undefined;
  
  this.capturesForMove = function(_coords, _player){
    this.player = _player;
    this.adjacentSpots(_coords).each(function(c){
      if(this.isPlayer(c,this.player)){ alert(c) }
    }.bind(this));
  }

  this.capturesForMoveHelper = function(_coords){ //TODO: figure this shit out
    if(this.isVisited(_coords)){
      return true;
    }
    else if(this.isOpponent(_coords)){
      this.captures().push(_coords);
      return this.adjacent;
    }
  }

  this.isVisited = function(_coords){
    if(this.visited().include(_coords)){
      return true
    } else {
      this._visited.push(_coords);
      return false
    }
  }

  this.isOpponent = function(_coords){
    return this.isPlayer(this.otherPlayer(this.player))
  }
}
