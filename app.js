new Vue({
    el: '#app',
    data: {
      startScr: true,
      playerHP: 100,
      monsterHP: 100,
      special: 0,
      gameEnded: false,
      logs: []
    },
    methods:{
        startGame: function(){
            this.startScr = false;
            this.gameEnded = false;
        },
        atk: function(){
            if(this.startScr||this.gameEnded) return;
            var damage = getRndInteger(5,10);
            this.monsterHP -= damage;
            this.increaseSp(1);
            this.checkWin();
            this.monsterRound();
            this.logs.unshift({
                isPlayer: true,
                text: 'Player hits monster for ' + damage
            });
        },
        spAtk: function(){
            if(this.startScr||this.gameEnded) return;
            if(this.special<100) return;
            var damage = getRndInteger(10,15);
            this.monsterHP -= damage
            this.special = 0;
            this.checkWin();
            this.monsterRound();
            this.logs.unshift({
                isPlayerSp: true,
                text: 'Player hits monster for ' + damage
            });
        },
        giveUp: function(){
            this.startScr = true;
            this.playerHP = 100;
            this.monsterHP = 100;
            this.special = 0;
            this.logs = [];
        },
        heal: function(){
            if(this.startScr||this.gameEnded) return;
            var healed =  getRndInteger(6,11);
            this.playerHP += healed;
            this.monsterRound();
            if(this.playerHP>100) this.playerHP = 100;
            this.logs.unshift({
                isHeal: true,
                text: 'Player healed ' + healed,
            });
        },
        monsterRound: function(){
            if(this.startScr||this.gameEnded) return;
            monsterHit = getRndInteger(5,11);
            this.playerHP -= monsterHit;
            this.increaseSp(Math.floor(monsterHit/2));
            this.checkWin();
            this.logs.unshift({
                isMonster: true,
                text: 'Monster hits player for ' + monsterHit
            });
        },
        increaseSp: function(value){
            this.special += value;
            if(this.special>100) this.special = 100;
        },
        checkWin: function(){
            if(this.gameEnded) return;
            if(this.playerHP <= 0){
                this.gameEnded =true;
                if(confirm('YOU LOSE! Start new?')){
                    this.giveUp();
                };
                return;
            }
            if(this.monsterHP <= 0){
                this.gameEnded =true;
                if(confirm('YOU WIN! Start new?')){
                    this.giveUp();
                };
                return;
            }
            
        }
    }
  });

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min; //got from w3
}