<template>
    <div class="column is-one-quarter-desktop is-half-mobile">
        <div class="card">
            <div class="card-content has-text-centered title">
                <span>{{ card.value }}</span>
                <span v-if="card.suit == 'spades'"><cards-spade-icon /></span>
                <span v-if="card.suit == 'hearts'" class="has-text-danger"><cards-heart-icon /></span>
                <span v-if="card.suit == 'clubs'"><cards-club-icon /></span>
                <span v-if="card.suit == 'diamonds'" class="has-text-danger"><cards-diamond-icon /></span>
            </div>
        </div>
    </div>
</template>

<script>
    import CardsClubIcon from 'vue-material-design-icons/CardsClub.vue'
    import CardsSpadeIcon from 'vue-material-design-icons/CardsSpade.vue'
    import CardsHeartIcon from 'vue-material-design-icons/CardsHeart.vue'
    import CardsDiamondIcon from 'vue-material-design-icons/CardsDiamond.vue'

    export default {
        name: 'Card',
        props: ['card'],
        components: {
            CardsClubIcon,
            CardsSpadeIcon,
            CardsHeartIcon,
            CardsDiamondIcon
        }
    }
</script>
