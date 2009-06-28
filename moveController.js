function MoveController(controllerClassName){
	this.onClickFunction = controllerClassName+".clickEvent"
	this.board = new Board(this.onClickFunction);
	this.game = new Game();

	this.playerToValue = function(_player){
		if(_player == 0){
			return 'black'
		} else if(_player == 1){
			return 'white'
		} else {
			return 'undefined'
		}
	}

	this.clickEvent = function(idString){
		var coords = this.board.idToCoords(idString);
		this.board.update(this.game.playNextMove(coords));
	}

	this.undo = function(){
		this.board.update(this.game.undo());
	}
}
