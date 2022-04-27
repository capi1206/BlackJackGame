
  
function startG(){ console.log('empezo!')

let snakeH=new SnakeNode(4, null, 'R',width/2,width/2);
let $apple=$('<div class="apple"></div>');
//should add an apple for the snake to eat

//the snake should start moving, it should check that the head does not touch the borders of the stage and itself
//whenever eats an apple the length of the snake should increase

}

//this function should give a random ubication for the apple that the snake eats
//its coordinates should not touch the snake body and should not be too close to the edges of the stage
function getRandomAppleCoord(){
     let ans=[width*Math.random(), width*Math.radom]
     while(true){
          

     }
}
const $stage=$('#stage');
const width=$stage.innerWidth();

function appendPiece(Node){
     $stage.append(Node.$node);
}

class SnakeNode{
     constructor(len,parentN,dir, top, left){
          this.lenght=len;
          this.direction=dir;
          this.parentNode=parentN;
          if(len===1)this.childNode=null;
          else this.childNode=new SnakeNode(len -1,this,dir, top, left-10 );
          this.top=top;
          this.left=left;
          this.$node=$('<div class="snakeNode"></div>');
          this.$node.css({ left: this.left, top: this.top });
          $stage.append(this.$node);
          // this.setPosition(top,left)
          // appendPiece(this);
     }

     setPosition(top,left){
          this.$node.css({top,left});
     }

}

$("#startG").on("click", function(){ startG();
     this.style.display = 'none';
})
