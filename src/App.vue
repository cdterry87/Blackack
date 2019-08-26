<template>
    <div>
        <h1>Blackjack</h1>
        <button @click="deal">Deal</button>
        <button @click="dealCardToPlayer">Hit</button>
        <hr>
        <div>
            <h2>Player's Hand:</h2>
            <div>{{ playerHand }}</div>
            <div>{{ playerHandTotal }}</div>
        </div>
        <hr>
        <div>
            <h2>Dealer's Hand</h2>
            <div>{{ dealerHand }}</div>
            <div>{{ dealerHandTotal }}</div>
        </div>
    </div>
</template>

<script>
import deck from './deck'

export default {
    name: 'app',
    components: {

    },
    data() {
        return {
            deck: deck,
            gameDeck: [],
            playerHand: [],
            dealerHand: []
        }
    },
    methods: {
        shuffle() {
            for (var i = 0; i < this.gameDeck.length - 1; i++) {
                var j = i + Math.floor(Math.random() * (this.gameDeck.length - i));
                var temp = this.gameDeck[j];
                this.gameDeck[j] = this.gameDeck[i];
                this.gameDeck[i] = temp;
            }
        },
        deal() {
            this.resetGame()            
            this.shuffle()
            this.dealCardToPlayer()
            this.dealCardToPlayer()
            this.dealCardToDealer()
            this.dealCardToDealer()
        },
        dealCardToPlayer() {
            let draw = Math.floor(Math.random() * this.gameDeck.length)
            this.playerHand.push(this.gameDeck[draw])
            this.gameDeck.splice(draw, 1)
        },
        dealCardToDealer() {
            let draw = Math.floor(Math.random() * this.gameDeck.length)
            this.dealerHand.push(this.gameDeck[draw])
            this.gameDeck.splice(draw, 1)
        },
        resetGame() {
            this.gameDeck = Object.assign([], this.deck)
            this.playerHand = []
            this.dealerHand = []
        }
    },
    computed: {
        playerHandTotal: function() {
            let value = 0
            let total = 0
            for( let card in this.playerHand ){
                value = this.playerHand[card].value

                if (value == "K" || value == "Q" || value == "J") {
                    value = 10
                }

                if (value == "A") {
                    value = 11
                }

                value = parseInt(value)
                total += value
            }
            return total
        },
        dealerHandTotal: function() {
            let value = 0
            let total = 0
            for( let card in this.dealerHand ){
                value = this.dealerHand[card].value

                if (value == "K" || value == "Q" || value == "J") {
                    value = 10
                }

                if (value == "A") {
                    value = 11
                }

                value = parseInt(value)
                total += value
            }
            return total
        }
    }
}
</script>

