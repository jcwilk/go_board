function Game(_board) {
  this.inheritFrom = BoardUtilities;
  this.inheritFrom(); //Inheritance, yay

	this.moves = new Array(); //array of Moves
	this.board = _board;

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
    var move = new Move(coords,player);
    this.stones().set(coords,move);
    
    move.captures = this.findCaptures(coords,player);

		this.moves.push(move);

		updateHash = new Hash();
		updateHash.set(coords,player);

    this.applyUpdatesToStones(updateHash);

		return updateHash;
	}

  this.findCaptures = function(_coords, _player){
    var calc = new CaptureCalculator(this.stones());
    return calc.capturesForMove(_coords,_player);
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
