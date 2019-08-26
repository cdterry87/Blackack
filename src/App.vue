<template>
    <div class="container">
        <h1 class="title">Blackjack</h1>
        <div class="field is-grouped">
            <p class="control" v-if="turn == 0">
                <button class="button is-info" @click="deal">
                    <span class="icon">
                        <cards-icon />
                    </span>
                    <span>Deal</span>
                </button>
            </p>
            <p class="control" v-if="turn == 1">
                <button class="button is-success" @click="dealCardToPlayer">
                    <span class="icon">
                        <hand-pointing-up-icon />
                    </span>
                    <span>Hit</span>
                </button>
            </p>
            <p class="control" v-if="turn == 1">
                <button class="button is-link" @click="stay">
                    <span class="icon">
                        <hand-right-icon />
                    </span>
                    <span>Stay</span>
                </button>
            </p>
            <p class="control" v-if="turn != 0">
                <button class="button is-danger" @click="resetGame">
                    <span class="icon">
                        <exit-run-icon />
                    </span>
                    <span>End Game</span>
                </button>
            </p>
        </div>
        <hr>
        <div class="content notification is-info" v-if="gameState != '' && turn > 1">
            {{ gameState }}
        </div>
        <div class="content">
            <h2 class="subtitle">Your Hand:</h2>
            <div class="columns is-multiline is-mobile">
                <Card :card="card" v-for="(card, index) in playerHand" :key="index" />
            </div>
            <div v-if="debug">{{ playerHand }}</div>
            <div>Player Total: {{ playerHandTotal }}</div>
        </div>
        <div class="content" v-if="turn > 1">
            <h2 class="subtitle">Dealer's Hand</h2>
            <div class="columns is-multiline is-mobile">
                <Card :card="card" v-for="(card, index) in dealerHand" :key="index" />
            </div>
            <div v-if="debug">{{ dealerHand }}</div>
            <div>Dealer Total: {{ dealerHandTotal }}</div>
        </div>
    </div>
</template>

<script>
import deck from './deck'
import Card from './components/Card'
import CardsIcon from 'vue-material-design-icons/Cards.vue'
import HandRightIcon from 'vue-material-design-icons/HandRight.vue'
import HandPointingUpIcon from 'vue-material-design-icons/HandPointingUp.vue'
import ExitRunIcon from 'vue-material-design-icons/ExitRun.vue'

export default {
    name: 'app',
    components: {
        Card,
        CardsIcon,
        HandRightIcon,
        HandPointingUpIcon,
        ExitRunIcon,
    },
    data() {
        return {
            debug: false,
            deck: deck,
            turn: 0,
            gameDeck: [],
            playerHand: [],
            dealerHand: [],
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
            
            this.turn = 1
            
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
        stay() {
            this.turn = 2
            while (this.dealerHandTotal < 16) {
                this.dealCardToDealer()
            } 
        },
        resetGame() {
            this.turn = 0
            this.gameDeck = Object.assign([], this.deck)
            this.playerHand = []
            this.dealerHand = []
        }
    },
    watch: {
        playerHandTotal: function(total) {
            if (total >= 21) {
                this.turn = 2
            }
        },
        dealerHandTotal: function(total) {
            if (total >= 21) {
                this.turn = 3
            }
        },
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
        },
        gameState: function() {
            if (this.playerHandTotal == this.dealerHandTotal) {
                // Tie game
                return "Tie game!"
            }
            if (this.playerHandTotal == 21 && this.playerHand.length == 2) {
                // Player blackjack
                return "Blackjack! You win!"
            }
            if (this.dealerHandTotal == 21 && this.dealerHand.length == 2) {
                // Dealer blackjack
                return "Dealer Blackjack! You lose!"
            }
            if (this.playerHandTotal > 21) {
                // Player bust
                return "Sorry, you bust!"
            }
            if (this.dealerHandTotal > 21) {
                // Dealer bust
                return "Dealer bust! You win!"
            }
            if (this.playerHandTotal <= 21 && this.playerHandTotal > this.dealerHandTotal) {
                // Player wins
                return "You win!"
            }
            if (this.dealerHandTotal <= 21 && this.dealerHandTotal > this.playerHandTotal) {
                // Dealer wins
                return "Sorry, you lost!"
            }
            return ''
        },
    }
}
</script>

<style lang="css">
    .container {
        margin: 1.5rem !important;
    }
</style>