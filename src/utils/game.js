export const calculateHandTotal = hand => {
    let ace
    let value = hand.reduce((sum, current) => {
        ace |= current.value === 1
        sum += current.value
        return sum
    }, 0)
    if (ace && value + 10 <= 21) {
        value += 10
    }
    return value
}

export const shuffleAndDeal = (deck) => {
    let uGameDeck = [...deck]
    let uPlayerHand = []
    let uDealerHand = []

    // Shuffle the deck
    for (let i = 0; i < uGameDeck.length - 1; i++) {
        let j = i + Math.floor(Math.random() * (uGameDeck.length - i))
        let temp = uGameDeck[j]
        uGameDeck[j] = uGameDeck[i]
        uGameDeck[i] = temp
    }

    // Add the first card to player's hand and then remove it from the deck
    uPlayerHand.push(uGameDeck[0])
    uGameDeck = [...uGameDeck.filter((card, index) => index !== 0)]

    // Add the second card to the dealer's hand and then remove it from the deck
    uDealerHand.push(uGameDeck[0])
    uGameDeck = [...uGameDeck.filter((card, index) => index !== 0)]

    // Add the third card to player's hand and then remove it from the deck
    uPlayerHand.push(uGameDeck[0])
    uGameDeck = [...uGameDeck.filter((card, index) => index !== 0)]

    // Add the fourth card to the dealer's hand and then remove it from the deck
    uDealerHand.push(uGameDeck[0])
    uGameDeck = [...uGameDeck.filter((card, index) => index !== 0)]

    // Calculate the player's hand total
    let uPlayerHandTotal = calculateHandTotal(uPlayerHand)

    // Calculate the dealer's hand total
    let uDealerHandTotal = calculateHandTotal(uDealerHand)

    return {
        uGameDeck,
        uPlayerHand,
        uDealerHand,
        uPlayerHandTotal,
        uDealerHandTotal
    }
}

export const dealCardToPlayer = (deck, playerHand) => {
    let uGameDeck = [...deck]
    let uPlayerHand = [...playerHand]

    // Add the first card to player's hand
    uPlayerHand.push(uGameDeck[0])

    // Remove the first card from the deck
    uGameDeck = [...uGameDeck.filter((card, index) => index !== 0)]

    // Calculate the player's hand total
    let uHandTotal = calculateHandTotal(uPlayerHand)

    return {
        uGameDeck,
        uPlayerHand,
        uHandTotal
    }
}

export const dealCardsToDealer = (deck, dealerHand) => {
    let uGameDeck = [...deck]
    let uDealerHand = [...dealerHand]
    let uHandTotal = calculateHandTotal(uDealerHand)
    let dealerHitCount = 0

    // Dealer must hit until they reach 17, so keep dealing the first card
    // and removing it from the deck until the dealer's hand total is 17 or greater
    while (uHandTotal < 17) {
        // NOTE: This should never happen, but in order to prevent an infinite loop break out if
        // the dealer hits more than 10 times since this shouldn't be possible without busting
        if (dealerHitCount > 10) break

        uDealerHand.push(uGameDeck[0])
        uGameDeck = [...uGameDeck.filter((card, index) => index !== 0)]
        uHandTotal = calculateHandTotal(uDealerHand)

        // Counts the number of times the dealer hits
        dealerHitCount++
    }

    return {
        uGameDeck,
        uDealerHand,
        uHandTotal
    }
}