
    
    
    
    //the function that returns a random card from the deck removing it
    function take(){ let ind=Math.floor(Math.random()*deck.length);
                     let ans=deck[ind];
                     deck.splice(ind, 1); 
                     return ans;}
    //function that counts the total of a hand
    function count(arr){let auxarr=arr.map(x => x %13).map(x => (x>10)|| x===0? 10: x);let ans=0;
                       let aux2=auxarr.map(x=> x===1?11:x);
                           aux2.forEach((element)=>{ans=ans+(element)});
                       while( ans>21 && aux2.indexOf(11)!==-1){
                                      aux2[aux2.indexOf(11)]=1;ans=0;
                                      aux2.forEach((element)=>{ans=ans+(element)});}
                                return ans;}
    //the dealer plays, computes the max of the other games and keeps on getting cards until it gets that score
    function dealerStrat(){ let opp=count(p1);
      //if a score goes beyond 21 it is counted as 0
                            (opp>21)? opp=0: opp=opp;
    //the dealer will keep on taking cards until has the same score as the opponent
                  while(count(dealer)< opp  && count(dealer) < 22 && count(dealer)<18)dealer.push(take());
    //takes another card if reaches a tie and is below 16
                  if(count(dealer)== opp && opp<16)dealer.push(take());}
    
    
                   
    var deck=[];
    let dealer=[]
    let p1=[]
    function reinit(){deck=[];
        for(let i=1;i<53;i++)deck.push(i);
        dealer=[take(),take()];
        p1=[take(),take()];$("#playerS").empty();$("#winner-turn").empty();
        $("#player").empty();$("#dealerHand").empty();

    }
    //the deck of cards, the values are represented by their representation in base 13. So that the value is the correspoinding number mod 13, with 11:J, 12:Q, 13:K, A:1 abd clubs:0, diamond:1, heart:2 and spades:3
    // so then 5= 0*13 +5 represents a 5 of clubs,  19=1*13 + 6 represents a 6 of diamonds and a Jack of spades corresponds to the number 50=3*13+11
    
        var cards={
            1:"images/ace_of_clubs.png",
            2:"images/2_of_clubs.png",
            3:"images/3_of_clubs.png",
            4:"images/4_of_clubs.png",
            5:"images/5_of_clubs.png",
            6:"images/6_of_clubs.png",
            7:"images/7_of_clubs.png",
            8:"images/8_of_clubs.png",
            9:"images/9_of_clubs.png",
            10:"images/10_of_clubs.png",
            11:"images/jack_of_clubs.png",
            12:"images/queen_of_clubs.png",
            13:"images/king_of_clubs.png",
            14:"images/ace_of_diamonds.png",
            15:"images/2_of_diamonds.png", 
            16:"images/3_of_diamonds.png",
            17:"images/4_of_diamonds.png",
            18:"images/5_of_diamonds.png",
            19:"images/6_of_diamonds.png",
            20:"images/7_of_diamonds.png",
            21:"images/8_of_diamonds.png",
            22:"images/9_of_diamonds.png",
            23:"images/10_of_diamonds.png",
            24:"images/jack_of_diamonds.png",
            25:"images/queen_of_diamonds.png",
            26:"images/king_of_diamonds.png",
            27:"images/ace_of_hearts.png",
            28:"images/2_of_hearts.png", 
            29:"images/3_of_hearts.png",
            30:"images/4_of_hearts.png",
            31:"images/5_of_hearts.png",
            32:"images/6_of_hearts.png",
            33:"images/7_of_hearts.png",
            34:"images/8_of_hearts.png",
            35:"images/9_of_hearts.png",
            36:"images/10_of_hearts.png",
            37:"images/jack_of_hearts.png",
            38:"images/queen_of_hearts.png",
            39:"images/king_of_hearts.png",
            40:"images/ace_of_spades.png",
            41:"images/2_of_spades.png", 
            42:"images/3_of_spades.png",
            43:"images/4_of_spades.png",
            44:"images/5_of_spades.png",
            45:"images/6_of_spades.png",
            46:"images/7_of_spades.png",
            47:"images/8_of_spades.png",
            48:"images/9_of_spades.png",
            49:"images/10_of_spades.png",
            50:"images/jack_of_spades.png",
            51:"images/queen_of_spades.png",
            52:"images/king_of_spades.png"
        }

    
        
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    
    
 //if the player decides to start the game the hit-stand buttons are enabled and start game disabled  
 //the player's cards are showed and only one of the dealer's cards   . a 'is your turn' message is displayed 
    $("#g").on("click", function(){ reinit();
    
            document.getElementById("g").disabled = true;
            document.getElementById("hit").disabled = false;
            document.getElementById("stand").disabled = false;
            var $dimg=$("<img>").height(80).attr("src",cards[dealer[0]]);$dimg.appendTo('[id=dealerHand]');
            var $img=$("<img>").height(80).attr("src",cards[p1[0]]);$img.appendTo('[id=player]');
            var $img2=$("<img>").height(80).attr("src",cards[p1[1]]);$img2.appendTo('[id=player]');
            var mess=$("<p>").text("You have "+count(p1)).css("color","white").css("font-size", "34px");
            mess.appendTo("[id=playerS]");
            setTimeout(function () { alert("It is your turn"); }, 1000);
            
           })
  //stand triggers the dealer's turn         
    $("#stand").on("click", function(event) {
            document.getElementById("hit").disabled = true;
            document.getElementById("stand").disabled = true;
            dealerTurn();
                 })
     
   //if the player goes over 21 by getting more cards it is displayed a 'you lost' message and the dealer card is revealed 
    $("#hit").on("click", function(event) {
             let cardn=take();p1.push(cardn);
             var $img = $("<img>").height(80).attr("src", cards[cardn]);$img.appendTo('[id=player]');
             $("#playerS").empty();   
           if(count(p1)>21){  $mes=$("<p>").text("you have "+count(p1) +", you lost the game, you can try again ...").css("color","black").css("font-size", "34px");
                   $mes.appendTo('[id=playerS]'); 
             var $dimg = $("<img>").height(80).attr("src", cards[dealer[1]]);$dimg.appendTo('[id=dealerHand]');
             $dimg.slideUp( 300 ).delay( 800 ).fadeIn( 400 );setTimeout(function () { alert("You went over, the house wins with "+ count(dealer)+ "."); }, 4000);
             document.getElementById("hit").disabled = true;
             document.getElementById("stand").disabled = true;
             $("#g").html("Another game");
             document.getElementById("g").disabled = false;}
           else{$mes=$("<p>").text("you have "+count(p1)).css("color","white").css("font-size", "34px");
                        $mes.appendTo('[id=playerS]');}
        })

    //in the dealer turn the dealer strategy is executed and the final result is displayed in alerts
    //the 'another game' button is enabled
    function dealerTurn(){setTimeout(function () { alert("It is the dealer turn."); }, 1000);
                 dealerStrat();
                   for(let i=1; i<dealer.length ;i++){ $img=$("<img>").height(80).attr("src", cards[dealer[i]]);
                                                       $img.appendTo('[id=dealerHand]');
                                                       $img.slideUp( 300 ).delay( 1200 +i*1200).fadeIn( 400 );
                        } 
                    let opp=count(p1);
                    let dealct=count(dealer);$mes=$("<p>"); if(dealct >21) setTimeout(function () {alert("You Win!! \n The dealer has " + count(dealer) + ".\n You can try your luck again..."); }, 9000);
                    else if (opp > dealct )setTimeout(function () { alert("You Win!! \n The dealer only has " + count(dealer) + ".\n You can try your luck again..."); }, 9000);
                     else if(dealct > opp && opp < 22)setTimeout(function () { alert("The house wins wit " +count(dealer) +".\n You can try again..."); }, 9000);
                     else setTimeout(function () { alert("It is a tie."); }, 9000);

                    $("#g").html("Another game");
                    document.getElementById("g").disabled = false;
                    }
       

           
                

              
    
        