const cryptoHash = require('./crypto-hash');


describe('cryptoHash()',()=>{
    it('generates sha256 output',() => {
        expect(cryptoHash('foo')).toEqual('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae')
    });
    it('generates same hash with same input in any order',() => {
        expect(cryptoHash('one','two')).toEqual(cryptoHash('two','one'))
    });
    
})