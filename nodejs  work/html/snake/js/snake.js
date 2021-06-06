function Food(gameSnake){
    let self = this;
    do {
        self.row = parseInt(Math.random() * gameSnake.row);
        self.col = parseInt(Math.random() * gameSnake.col);
    } while ( function(){
        for ( let i = 0; i < gameSnake.snake.body.length; ++ i ) {
            if ( gameSnake.snake.body[i].row == self.row &&
                 gameSnake.snake.body[i].col == self.col
                ) {
                return true;
            }
        }
        return false;
    }());


}

Food.prototype.render = function() {
    game.setHTML( this.row, this.col, "❤");
}


function Game(){
    this.row = 20;
    this.col = 20;
    this.score = 1;
    this.init();
    this.snake = new Snake();
    this.food = new Food(this);
  //  this.start();
 //   this.bindEvent();

};

Game.prototype.init = function(){
    this.dom = document.createElement("table");
    for ( let i = 0; i < this.row; i ++ ) {
        let tr = document.createElement("tr");
        for ( let j = 0; j < this.col; j ++ ) {
            let td = document.createElement("td");
            tr.appendChild(td);
        }

        this.dom.appendChild(tr);
    }
    document.getElementById("app").appendChild(this.dom);
};


Game.prototype.getTd = function( row, col ) {
    return this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col];
}

Game.prototype.setColor = function( row, col, color ) {
    this.getTd(row, col).style.background = color;
};

Game.prototype.setHTML = function( row, col, html ) {
    this.getTd(row, col).innerHTML = html;
};

Game.prototype.clear = function() {
    for ( let i = 0; i < this.row; ++ i ) {
        for ( let j = 0; j < this.col; ++ j ) {
            this.setColor( i, j, 'rgba(0,0,0,0.1)');

            this.setHTML( i, j, '');
        }
    }
}

Game.prototype.bindEvent = function() {
    let self = this;
    document.onkeydown = function(event){
        //console.log(event);
        switch(event.keyCode){
            case 37:
                if ( self.snake.direction == 'R' ) return;
                self.snake.changeDirection('L');
                break;
            case 38:
                if ( self.snake.direction == 'D' ) return;
                self.snake.changeDirection('U');
                break;
            case 39:
                if ( self.snake.direction == 'L' ) return;
                self.snake.changeDirection('R');
                break;
            case 40:
                if ( self.snake.direction == 'U' ) return;
                self.snake.changeDirection('D');
                break;
        }
    }
}

Game.prototype.start = function() {
    this.f = 0;
    this.timer = setInterval( function() {
        game.f ++;
      
        game.clear();
      
        document.getElementById("score").innerHTML = `分数：${game.score}`;
        let during = game.snake.body.length < 30 ? 30 - game.snake.body.length : 1;

        game.f % during == 0 && game.snake.update();
        game.snake.render();
        game.food.render();
    },5);
}


function back(){
    window.location.href = '../select.html';
  }
  

  function start(){
    document.getElementsByClassName('rule')[0].style.display = 'none'
    go ();
  }
  


Game.prototype.infoConfirmed = function() {
    var xmlhttp = new XMLHttpRequest();
    var userid = game.getCookie('name');
  
   
    var obj = {
        userid: parseInt(userid),
        gameid: "贪吃蛇",
        score: this.score,
    };

    xmlhttp.open("POST", myurl+"/record", true);
    xmlhttp.setRequestHeader("Content-Type"
        , "application/json");


    xmlhttp.send(JSON.stringify(obj));  // 要发送的参数，要转化为json字符串发送给后端，后端就会接受到json对象

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            window.location.href = '../select.html';

            var json = JSON.parse(xmlhttp.responseText);
            if (json.status == 400)
                alert(json.data);
        } else {
            alert(json.data);
        }
    }

}


Game.prototype.getCookie =  function(name) {
    var arr = document.cookie.split("; ");
    for (var i = 0, len = arr.length; i < len; i++) {
        var item = arr[i].split("=");
        if (item[0] == name) {
            return item[1];
        }
    }
    return "";
}



function Snake(){
    this.body = [
        {"row": 3,"col": 5 },
        {"row": 3,"col": 4 },
        {"row": 3,"col": 3 },
        {"row": 3,"col": 2 },
    ];
    this.direction = "R";
    this.WillDirection = this.direction;
}

Snake.prototype.update = function() {
    this.direction = this.WillDirection;
    switch(this.direction) {
        case "R":
            this.body.unshift({"row": this.body[0].row, "col": this.body[0].col + 1});
            break;
        case "D":
            this.body.unshift({"row": this.body[0].row + 1, "col": this.body[0].col});
            break;
        case "L":
            this.body.unshift({"row": this.body[0].row, "col": this.body[0].col - 1});
            break;
        case "U":
            this.body.unshift({"row": this.body[0].row - 1, "col": this.body[0].col});
            break;
    }
    if ( this.body[0].col > game.col - 1 ||
         this.body[0].row > game.row - 1 ||
         this.body[0].col < 0 ||
         this.body[0].row <0
        ){
            alert("Game Over! You score "+game.score)
            game.infoConfirmed()
          
            this.body.shift();
            clearInterval(game.timer);
    }
    for ( let i = 1; i < this.body.length; ++ i ){
        if ( this.body[0].col == this.body[i].col &&
             this.body[0].row == this.body[i].row ){
                alert("Game Over! You score "+game.score)
                game.infoConfirmed()
              
                this.body.shift();
                clearInterval(game.timer);
        }

    }

    if ( this.body[0].row == game.food.row &&
         this.body[0].col == game.food.col
        ) {
            game.food = new Food(game);
            game.score ++;
            game.f = 0;
    } else {
        this.body.pop();
    }
}

Snake.prototype.changeDirection = function(d) {
    this.WillDirection = d;
}

Snake.prototype.render = function() {
    //console.log(game);
    game.setColor( this.body[0].row, this.body[0].col, 'green' );
    for ( let i = 1; i < this.body.length; ++ i ) {
        game.setColor( this.body[i].row, this.body[i].col, 'lime' )
    }
}









