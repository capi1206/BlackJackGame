
const $stage=$('#stage');
const width=$stage.innerWidth();
let snakeH;
let $apple;
  
function startG(){ console.log('empezo!')
 snakeH=new SnakeNode(7, null, 'R',width/2,width/2);
 $apple=new Apple(snakeH.lenght);
let time=70;
let notOut=true;
//force way out of the setInterval function once hitWall or bumps into body

actualMotion(time);
// let movInt= setInterval(  () => {
//      if(hitWall()){restart();snakeH=null;$apple=null;clearInterval(movInt);notOut=false}
//      if(ateApple()){$('#stage').find('.apple').each(function(){this.remove()});
//           console.log("come");time*=0.99;snakeH.incByOne();clearInterval(movInt);
//           }
//           move(snakeH,time);},2*time);



}
function actualMotion(time){

     let movInt= setInterval(  () => {
          if(hitWall() || hitOwn()){restart();snakeH=null;$apple=null;clearInterval(movInt);}
          if(ateApple()){$('#stage').find('.apple').each(function(){this.remove()});
               $apple=null;
               console.log("come");time*=0.9;
               snakeH.incByOne();
               snakeH.lenght++;
               $apple=new Apple(snakeH.lenght);
               clearInterval(movInt);
               actualMotion(time);
               }
               move(snakeH,time);},2*time);


}
// function moveHeadCheck(snakeH,time){
//      if(hitWall(snakeH)){restart();snakeH=null;clearInterval();}
//      else move(snakeH,time);
// }

window.addEventListener("keydown", function(event) {
     if (event.defaultPrevented) {return;}
     if (snakeH && event.code === "ArrowDown" && snakeH.direction!="U") {
         snakeH.direction='D';
     } else if (snakeH && event.code === "ArrowUp" && snakeH.direction!="D"){
         snakeH.direction='U';
     } else if (snakeH && event.code === "ArrowLeft" && snakeH.direction!="R"){
         snakeH.direction='L';
     } else if (snakeH && event.code === "ArrowRight" && snakeH.direction!="L"){
         snakeH.direction='R';
     }
   }, true);


//checks if the snake's head is too close to the wall and going in that direction
function hitWall() {
     if((snakeH.left<2 && snakeH.direction === "L")||(snakeH.left>400 && snakeH.direction === "R")||
      (snakeH.top>400 && snakeH.direction === "D")||(snakeH.top<2 && snakeH.direction === 'U')){
        return true;
      }
    return false;
}

function hitOwn() {
     let actualNode=snakeH.childNode;
     while(actualNode.childNode){
          if((snakeH.left===actualNode.left &&snakeH.top==actualNode.top)){return true;}
          actualNode = actualNode.childNode;
     }return false;
}
    

//impl

function ateApple(){
    if($apple!==null){if(snakeH.left-$apple.left<2 && snakeH.top-$apple.top<2&&$apple.top-snakeH.top<2&&
     snakeH.direction === "L")return true;
    if($apple.left-snakeH.left<2 && snakeH.top-$apple.top<2&&$apple.top-snakeH.top<2&&
          snakeH.direction === "R")return true;
    if(snakeH.top-$apple.top<2 && snakeH.left-$apple.left<2&&$apple.left-snakeH.left<2&&
               snakeH.direction === "U")return true;
     if($apple.top-snakeH.top<2 && snakeH.left-$apple.left<2&&$apple.left-snakeH.left<2&&
                    snakeH.direction === "D")return true;                     
    }return false;
//     ||($apple.left-snakeH.left<2 && snakeH.direction === "R")||
//       (snakeH.top-$apple.top<2 && snakeH.direction === "U")||($apple.top-snakeH.top<2 && snakeH.direction === 'D'))
}


function move(node, time){if(node== null){return}
     if(node.direction ==='R'){ 
          node.left+=15;
          setTimeout(function(){node.$node.css({ left: node.left-7.5});}, time/2);
          setTimeout(function(){node.$node.css({ left: node.left});}, time);
          if(node.childNode){ 
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



          function restart(){snakeH=undefined;
               $apple=null;
               $('#stage').find('.snakeNode').each(function(){this.remove()});
               $('#stage').find('.snakeH').each(function(){this.remove()});
               $('#stage').find('.apple').each(function(){this.remove()});
               document.getElementById("startG").style.display = "block";
               
          }          
//this function should give a random ubication for the apple that the snake eats
//its coordinates should not touch the snake body and should not be too close to the edges of the stage
//it is in the format [left,top]
function getRandomAppleCoord(snakeL){
     let ans=[(width*0.18) + (parseInt(width*0.75*Math.random()/15)*15), (width*0.18) + (parseInt(width*0.75*Math.random()/15)*15)];
     let nodes=$('#stage').children('div');
     let again=false;
     for( let i=0; i<snakeL;i++){
          if( Math.abs(parseInt(nodes[i].style.left) -ans[0])+Math.abs(parseInt(nodes[i].style.top) -ans[1])< 100)again=true;
     }
     if(again)return getRandomAppleCoord(snakeL);

    return ans; 
}




//places a node into the stage
function setPosition(Node,left,top){
     Node.$node.css({ left: left, top: top });
     $stage.append(Node.$node);
}

class SnakeNode{
     constructor(len,parentN,dir, left, top){
          this.lenght=len;
          
          this.direction=dir;
          this.parentNode=parentN;
          if(len===1)this.childNode=null;
          else this.childNode=new SnakeNode(len -1,this,dir, left-15, top );
          this.top=top;
          this.left=left;
          this.$node=$('<div ></div>');
          //assigns the class snakeHead if the len is actual to the initial snake's lenght
          if(len===7)this.$node.addClass("snakeH");
          else this.$node.addClass("snakeNode");
          setPosition(this, left,top);
          return this;
      }
      //need to fix to detail of what happens when the node is next to the border
     incByOne(){
          if (this.childNode!==null)this.childNode.incByOne();
          else {if(this.direction=='R')this.childNode=new SnakeNode(1,this,'R', this.left-15, this.top );
                if(this.direction=='L')this.childNode=new SnakeNode(1,this,'L', this.left+15, this.top );
                if(this.direction=='D')this.childNode=new SnakeNode(1,this,'L', this.left, this.top -15);
                if(this.direction=='U')this.childNode=new SnakeNode(1,this,'L', this.left, this.top +15);

          }
     }
     

}

class Apple{
     constructor(len){
          let coor=getRandomAppleCoord(len);
          this.left=coor[0];
          this.top=coor[1];
          this.$node=$('<div class="apple"></div>');
          setPosition(this,this.left,this.top);

     }
}

$("#startG").on("click", function(){ startG();
     this.style.display = 'none';
})