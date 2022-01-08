const Block = require('./block');
const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

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
    describe('minedBlock()',() => {
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock = Block.minedBlock({lastBlock,data});

        it('returns a Block instance', () => {
        expect(minedBlock instanceof Block).toBeTruthy();
        });

        it('sets the `lastHash` = `hash` of the last block', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash)
        }); 

        it('sets the data', () =>{
             expect(minedBlock.data).toEqual(data);
        });

        it('sets the timestamp', () =>{
            expect(minedBlock.timestamp).not.toEqual(undefined);
       });

       it('sha256 `hash` = to inputs', () =>{
        expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timestamp,minedBlock.lastHash,data));
   });
    });
});