<template>
    <div class="container">
        <h1 class="title">Blackjack</h1>
        <div class="field is-grouped">
            <p class="control">
                <button class="button is-info" @click="deal">
                    <span class="icon">
                        <cards-icon />
                    </span>
                    <span>Deal</span>
                </button>
            </p>
            <p class="control">
                <button class="button is-success" @click="dealCardToPlayer">
                    <span class="icon">
                        <hand-pointing-up-icon />
                    </span>
                    <span>Hit</span>
                </button>
            </p>
            <p class="control">
                <button class="button is-warning">
                    <span class="icon">
                        <hand-right-icon />
                    </span>
                    <span>Stay</span>
                </button>
            </p>
            <p class="control">
                <button class="button is-danger" @click="resetGame">
                    <span class="icon">
                        <exit-run-icon />
                    </span>
                    <span>End Game</span>
                </button>
            </p>
        </div>
        <hr>
        <div class="content">
            <h2 class="subtitle">Dealer's Hand</h2>
            <div class="columns is-multiline is-mobile">
                <div class="column is-3" v-for="(card, index) in dealerHand" :key="index">
                    <div class="card">
                        <div class="card-content has-text-centered">
                            <span class="title">{{ card.value }}</span>
                            <span v-if="card.suit == 'spades'" class="title"><cards-spade-icon /></span>
                            <span v-if="card.suit == 'hearts'" class="title has-text-danger"><cards-heart-icon /></span>
                            <span v-if="card.suit == 'clubs'" class="title"><cards-club-icon /></span>
                            <span v-if="card.suit == 'diamonds'" class="title has-text-danger"><cards-diamond-icon /></span>
                        </div>
                    </div>
                </div>
            </div>
            <div>{{ dealerHand }}</div>
            <div>Dealer Total: {{ dealerHandTotal }}</div>
        </div>
        <hr>
        <div>
            <h2 class="subtitle">Player's Hand:</h2>
            <div class="columns is-multiline is-mobile">
                <div class="column is-3" v-for="(card, index) in playerHand" :key="index">
                    <div class="card">
                        <div class="card-content has-text-centered">
                            <span class="title">{{ card.value }}</span>
                            <span v-if="card.suit == 'spades'" class="title"><cards-spade-icon /></span>
                            <span v-if="card.suit == 'hearts'" class="title has-text-danger"><cards-heart-icon /></span>
                            <span v-if="card.suit == 'clubs'" class="title"><cards-club-icon /></span>
                            <span v-if="card.suit == 'diamonds'" class="title has-text-danger"><cards-diamond-icon /></span>
                        </div>
                    </div>
                </div>
            </div>
            <div>{{ playerHand }}</div>
            <div>Player Total: {{ playerHandTotal }}</div>
        </div>
    </div>
</template>

<script>
import deck from './deck'
import CardsIcon from 'vue-material-design-icons/Cards.vue';
import HandRightIcon from 'vue-material-design-icons/HandRight.vue';
import HandPointingUpIcon from 'vue-material-design-icons/HandPointingUp.vue';
import ExitRunIcon from 'vue-material-design-icons/ExitRun.vue';
import CardsClubIcon from 'vue-material-design-icons/CardsClub.vue';
import CardsSpadeIcon from 'vue-material-design-icons/CardsSpade.vue';
import CardsHeartIcon from 'vue-material-design-icons/CardsHeart.vue';
import CardsDiamondIcon from 'vue-material-design-icons/CardsDiamond.vue';

export default {
    name: 'app',
    components: {
        CardsIcon,
        HandRightIcon,
        HandPointingUpIcon,
        ExitRunIcon,
        CardsClubIcon,
        CardsSpadeIcon,
        CardsHeartIcon,
        CardsDiamondIcon
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
        stay() {

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

