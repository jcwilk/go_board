function Game(_board) {
	this.stones = new Hash();
	this.moves = new Array(); //array of Moves
	this.board = _board;
  this.stones = new Hash(); //array of coords
  this.boardSize = 19;

	this.nextMove = function(){
		return this.moves.size()+1;
	}

	this.nextPlayer = function(){
		return ((this.nextMove()-1)%2);
	}

	//coords - location played
	//Return - update hash
	this.playNextMove = function(coords){
		var player = this.nextPlayer();
    move = new Move(coords,player);
    this.stones.set(coords,move);

    captures = this.findCaptures(move);

    move.captures = captures;

		this.moves.push(move);

		updateHash = new Hash();
		updateHash.set(coords,player);
		return updateHash;
	}

  this.findCaptures = function(_move){
    coords = _move.coords;
    targetPlayer = this.otherPlayer(_move.player);
    x = coords[0];
    y = coords[1];
    
  }
  
  this.findCapturesHelper = function(_coords){

  }

  this.adjacentSpots = function(_coords){
    spots = new Array();
    x = _coords[0];
    y = _coords[1];
    possibleSpots = new Array([x-1,y],[x+1,y],[x,y-1],[x,y+1]);
    possibleSpots.each(function(spot){ if(this.isOnBoard(spot)){spots.push(spot)}}.bind(this));
    return spots;
  }

  //Gives the opposite of either 1 or 0
  this.otherPlayer = function(player){
    return Math.abs(player - 1);
  }

  //Returns true if the coords are on the board and blank
  this.isLiberty = function(_coords){
    if(!this.isOnBoard(_coords)){ return false };

    if(this.stones.get(_coords) == undefined){ return true };

    return false;
  }

  //Returns true if the coords are on the board
  this.isOnBoard = function(_coords){
    if(_coords[0] < 0 || _coords[0] >= this.boardSize || _coords[1] >= this.boardSize || _coords[1] < 0){
      return false;
    }
    return true;
  }
  
  //Returns true if the specified player has a stone on the coords
  this.isPlayer = function(_coords,player){
    move = this.stones.get(_coords)
    if(move == undefined || move.player != player){ return false };

    return true;
  }

	this.undo = function(){
    var lastMove = this.moves.pop();
		updateHash = new Hash();
		updateHash.set(lastMove.coords,-1);
		return updateHash;
	}

	this.sgf = function(){
		var str = "";
		return this.moves.inject('(',function(str,move,index) {
      var coords = move.coords
			var letters = 'abcdefghijklmnopqrs'.toArray();
			var player = 'B';
			if(index%2 == 1){player = 'W'};
			return str+';'+player+'['+letters[coords[0]]+letters[coords[1]]+']'
		})+')';
	}
}

function Move(_coords,_player){
  this.coords = _coords;
  this.player = _player;
  this.removed = new Array(); //an array of coords of removed stones that move
}
