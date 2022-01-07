const Block = require('./block');
const { GENESIS_DATA } = require('./config');

describe('Block',() => {
    const timestamp = 'a-date';
    const lastHash = 'aaaa';
    const hash = 'add';
    const data = ["1","2"];
    const block = new Block({timestamp ,lastHash,hash,data});

    it('has a time,hash,lasthash,data',() => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.timestamp).toEqual(timestamp);
        expect(block.timestamp).toEqual(timestamp);
        expect(block.timestamp).toEqual(timestamp);

    })

    describe('gensis()',() => {
        const genesisBlock = Block.genesis();

        it('returns a Block instance',()=> {
            expect(genesisBlock instanceof Block).toBeTruthy();
        });
        it('returns the gensis data',() => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });
    //DO THIS 2.4
    // describe('mineBlock()',() => {})
});