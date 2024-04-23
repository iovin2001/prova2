module unfold::rpg_game {
    // Imports
    use sui::object::{Self, UID, new};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    struct Shield has key, store {
        id: UID,
        protection: u64,
    }

    // Struct definitions
    struct Sword has key, store {
        id: UID,
        magic: u64,
        strength: u64,
    }

    struct Forge has key, store {
        id: UID,
        swords_created: u64,
        shields_created: u64,
    }

    // Module init to be executed when module is published
    fun init(ctx: &mut TxContext) {
        let admin = Forge {
            id: object::new(ctx),
            swords_created: 0,
            shields_created: 0,
        };
        // assign that to admin
        transfer::transfer(admin, tx_context::sender(ctx));
    }

    public fun forgeSword() {

    }

    fun newSword(strength: u64, magic: u64, ctx: TxContext) {
        Sword {
            id: new(ctx),
            magic,
            strength,
        }
    }

    
    public fun getSwordMagic(self: &Sword): u64 {
        self.magic
    }

    public fun getSwordStrength(self: &Sword): u64 {
        self.strength
    }

    // add admin capability to this
    public fun getSwordsCreated(self: &Forge): u64 {
        self.swords_created
    }
}

