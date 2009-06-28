function Board(_onclickFunction){
	this.spotClass = 'stone';

	this.blankImage = 'blank.png';
	this.blackImage = 'black.png';
	this.whiteImage = 'white.png';
	this.boardImage = 'board.png';
	this.imageSize = 16;

	this.initialize = function(onclickFunction){
		document.write("<img src='"+this.boardImage+"' style='position:absolute; left:0px; top:0px'>");
		for(x=0;x<19;x++){
		  for(y=0;y<19;y++){
				id = this.coordsToId([x,y]);
				xPixels = x*this.imageSize;
				yPixels = y*this.imageSize;
				onclick = onclickFunction + "(this.id)"
				document.write("<img class='"+this.spotClass+"' id='"+id+"' onclick='"+onclick+"' style='z-index:1; position:absolute; left:"+xPixels+"px; top:"+yPixels+"px' src='"+this.blankImage+"'>");
			}
		}
	}

	this.loadBlank = function(){
		for(x=0;x<19;x++){
		  for(y=0;y<19;y++){
			  this.updateSpot([x,y],'blank');
			}
		}
	}

  this.updateSpot = function(coords,player){
		//alert([coords,player])
		element = this.coordsToElement(coords);
		image = this.playerToImage(player);
		//alert(element.id);
		element.src = image;
	}

	this.update = function(updateHash){
		updateHash.each(function(pair){this.updateSpot(pair.key.split(','),pair.value);}.bind(this));
	}

	this.coordsToElement = function(coords){
		return $(this.coordsToId(coords))
	}

	this.coordsToId = function(coords){
		return ("board_"+coords[0]+"_"+coords[1])
	}

	this.idToCoords = function(idString){
		splits = idString.substr(6).split('_')
		return splits
	}

	this.playerToImage = function(player){
		if(player == 0){
			return this.blackImage;
		} else if(player == 1){
			return this.whiteImage;	
		} else{
			return this.blankImage;
		}
	}

	this.initialize(_onclickFunction);
}

