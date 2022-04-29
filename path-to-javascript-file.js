
  
function startG(){ console.log('empezo!')
let snakeH=new SnakeNode(7, null, 'R',width/2,width/2);
let $apple=$('<div class="apple"></div>');
coord=getRandomAppleCoord(7);
$apple.css({ left: coord[0], top: coord[1] });
$stage.append($apple);
let nodes=$('#stage').children('div');
     
     //snakeH.direction='U';

 setInterval(move,150,snakeH,70);

 //document.addEventListener('keyup', (event) => {snakeH.direction='U';}, false);
 //document.addEventListener('keyleft', (event) => {snakeH.direction='L';}, false);
 window.addEventListener("keydown", function(event) {
     if (event.defaultPrevented) {return;}
     if (event.code === "ArrowDown"){
         snakeH.direction='D';
     } else if (event.code === "ArrowUp"){
         snakeH.direction='U';
     } else if (event.code === "ArrowLeft"){
         snakeH.direction='L';
     } else if (event.code === "ArrowRight"){
         snakeH.direction='R';
     }
    
   }, true);

   
     
     //move(snakeH,1500);
     //snakeH.direction='U';
    // move(snakeH,2000);
//should add an apple for the snake to eat

//the snake should start moving, it should check that the head does not touch the borders of the stage and itself
//whenever eats an apple the length of the snake should increase

}
function move(node, time){
     if(node.direction ==='R'){ 
          node.left+=15;
          setTimeout(function(){node.$node.css({ left: node.left-7.5});}, time/2);
          setTimeout(function(){node.$node.css({ left: node.left});}, time);
          if(node.childNode){console.log(node.left ) 
               if(node.childNode.left-node.left=== -30)node.childNode.direction='R';
               if(node.childNode.top-node.top===15)node.childNode.direction='U';  
               if(node.childNode.top-node.top=== -15)node.childNode.direction='D';
               move(node.childNode, time) }}
     if(node.direction ==='L'){ 
          node.left-=15;
          setTimeout(function(){node.$node.css({ left: node.left+7.5});}, time/2);
          setTimeout(function(){node.$node.css({ left: node.left});}, time);
          if(node.childNode){ 
               if(node.childNode.left-node.left === 30)node.childNode.direction='L';
               if(node.childNode.top-node.top===15)node.childNode.direction='U';
               if(node.childNode.top-node.top===-15)node.childNode.direction='D';
               move(node.childNode, time);}}
     if(node.direction ==='D'){ 
          node.top+=15;
          setTimeout(function(){node.$node.css({ top: node.top-7.5});}, time/2);
          setTimeout(function(){node.$node.css({ top: node.top});}, time);
          if(node.childNode){ 
               if(node.childNode.left-node.left===15)node.childNode.direction='L';
               if(node.childNode.left-node.left===-15)node.childNode.direction='R'; 
               if(node.childNode.top-node.top=== -30)node.childNode.direction='D';
               move(node.childNode, time);    }} 
     if(node.direction ==='U'){ 
          node.top-=15;
          setTimeout(function(){node.$node.css({ top: node.top+7.5});}, time/2);
          setTimeout(function(){node.$node.css({ top: node.top});}, time);
          if(node.childNode){ 
               if(node.childNode.left-node.left===15)node.childNode.direction='L';
               if(node.childNode.left-node.left===-15)node.childNode.direction='R';  
               if(node.childNode.top-node.top===30)node.childNode.direction='U';
               move(node.childNode, time) }}                                                                              
 }

//this function should give a random ubication for the apple that the snake eats
//its coordinates should not touch the snake body and should not be too close to the edges of the stage
//it is in the format [left,top]
function getRandomAppleCoord(snakeL){
     let ans=[(width*0.125) + (parseInt(width*0.75*Math.random()/15)*15), (width*0.125) + (parseInt(width*0.75*Math.random()/15)*15)];
     let nodes=$('#stage').children('div');
     let again=false;
     for( let i=0; i<snakeL;i++){
          if( Math.abs(parseInt(nodes[i].style.left) -ans[0])+Math.abs(parseInt(nodes[i].style.top) -ans[1])< 100)again=true;
     }
     if(again)return getRandomAppleCoord(snakeL);

    return ans; 
}
const $stage=$('#stage');
const width=$stage.innerWidth();

function appendPiece(Node){
     $stage.append(Node.$node);
}

class SnakeNode{
     constructor(len,parentN,dir, left, top){
          this.lenght=len;
          
          this.direction=dir;
          this.parentNode=parentN;
          if(len===1)this.childNode=null;
          else this.childNode=new SnakeNode(len -1,this,dir, left-15, top );
          console.log(width);
          this.top=top;
          this.left=left;
          this.$node=$('<div class="snakeNode"></div>');
          this.$node.css({ left: this.left, top: this.top });
          $stage.append(this.$node);
          return this;
          // this.setPosition(top,left)
          // appendPiece(this);
     }

     setPosition(left,top){
          this.$node.css({top : top,left:left});
     }

}

$("#startG").on("click", function(){ startG();
     this.style.display = 'none';
})
