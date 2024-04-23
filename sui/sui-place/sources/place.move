module sui_place::game {
    use sui::object::{Self, UID, new, delete};
    use sui::tx_context::{Self, TxContext};
    use sui::vector::Vector;

    struct Point {
        int x: u32,
        int y: u32
    }

    struct Plot has key{
        id: UID,
        standard_price: u64,
        ownership: address?,
        completion: bool,
        current_price: u64,
    }

    struct Unit: Plot has key{
        id: UID,
        community_name: address,
    }

    struct Consumer has key{
        id: UID,
        consumer_name: address,
        units_owned: u64,
        community_name: address,
        tokens: u64,
    }

    struct Request has key{
        id: UID,
        buy_or_sell: bool,
        unit_location: Point,
        price: u64,
        requested_by: address,
        responded_by: address?,
        community_name: address?,
    }

    // Init functions for Plot
    public fun initPlot(ctx: &mut TxContext): Plot {
        Plot {
            id: object::new(ctx),
            standard_price:1000,
            ownership: null,
            completion: false,
            current_price: standard_price,
        }
    }

    // Init functions for Unit
    public fun initUnit(): Unit {
        Unit {
            id,
            standard_price:10,
            ownership: null,
            completion: true,
            current_price: standard_price,
            community_name:null,
        }
    }

    // Init functions for Consumer
    public fun initConsumer(consumer_name: address): Consumer {
        Consumer {
            id,
            consumer_name,
            units_owned: 0,
            community_name: null,
            tokens: 0, //need to take from wallet or assign a fixed number of tokens
        }
    }

    // Init functions for Request
    // need to add id
    public fun initRequest(
        buy_or_sell: bool,
        unit_location: Point,
        price: u64,
        requested_by: address
    ): Request {
        Request {
            buy_or_sell,
            unit_location,
            price,
            requested_by,
            responded_by: null,
            community_name: null,
        }
    }

    public fun isComplete(plot: &Plot): bool {
        plot.completion
    }

    public fun communityName(plot: &Plot): address? {
        plot.ownership
    }

    public fun unitCounter(plot: &Plot, community: address): u64 {
        // Implement logic to count units owned by the community in this plot
        0
    }

    public fun unitAdjacent(plot: &Plot, community: address): u64 {
        // Implement logic to count units owned by the community in adjacent plots
        0
    }

    public fun calculateCurrentPrice(
        plot: &Plot,
        completion: bool,
        unitAdjacent: u64
    ): u64 {
        // Implement formula to calculate current price
        0
    }

    public fun getCurrentPrice(unit: &Unit): u64 {
        unit.current_price + unit.bonus
    }

    public fun changeOwner(unit: &mut Unit, owner: address) {
        unit.ownership = owner;
    }

    public fun cu(unit: &Unit, community: address): u64 {
        // Implement logic to calculate the percentage of units owned by the community
        0
    }

    public fun calculateCurrentPrice(
        unit: &Unit,
        community: address,
        unitCounter: u64
    ): u64 {
        // Implement formula to calculate current price
        0
    }

    public fun checkMaxUnits(consumer: &Consumer): bool {
        consumer.units_owned >= 10
    }

    public fun checkIfTokens(consumer: &Consumer, tokens_req: u64): bool {
        consumer.tokens >= tokens_req
    }

    public fun transaction(
        request: &Request,
        price: u64,
        community_name: address
    ) {
        // Implement the transaction logic
    }

    public fun newUnit(request: &mut Request, requested_by: address) {
        // Update Request fields and call NewUnit function
        request.price = unit.standard_price;
        request.community_name = unit.community_name;
    }

    public fun updateUnits(request: &Request, unit_location: NFT.Capsule) {
        // Implement logic to update units and their prices
    }

    public fun getRespondent(request: &mut Request) {
        // Implement logic to find and update the respondent
    }

    public fun requestCompleted(
        request: &mut Request,
        price: u64
    ) {
        // Implement logic for completing a request
        let tokens_req = price;
        if request.buy_or_sell {
            // It's a buy request
            if checkIfTokens(request.requested_by, tokens_req) {
                // Deduct tokens from the buyer
                request.requested_by.tokens -= tokens_req;
            }
        } else {
            // It's a sell request
            if checkIfTokens(request.responded_by, tokens_req) {
                // Deduct tokens from the seller
                request.responded_by.tokens -= tokens_req;
            }
        }
        // Change the unit's community name to the new community name from the request
        unit.community_name = request.community_name;
        // Call UpdateUnits to update the unit's current price
        updateUnits(request, request.unit_location);
    }

    
}
