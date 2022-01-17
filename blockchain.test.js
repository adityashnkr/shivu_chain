const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    let blockchain, newChain, originalChain;

    beforeEach(() => {
        blockchain = new Blockchain();
        newChain = new Blockchain();
        originalChain = blockchain.chain;
    })

    it('contains a `chain` Array instance', () => {
        expect(blockchain.chain instanceof Array).toBeTruthy();
    })
    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });
    it('add new block to a chain',() => {
        const newData = 'foo bar';
        blockchain.addBlock({data : newData });

        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData) ;
    });

    describe('isValidChain()', () => {
        beforeEach(() => {
            blockchain.addBlock({data:"Hello"});
            blockchain.addBlock({data:"its"});
            blockchain.addBlock({data:"me"}); 
        });
        describe('when the chain does not start with the genesis block', () => {

            it('returns false',() => {
                blockchain.chain[0] = {data: 'fake'};
                expect(Blockchain.isValidChain(blockchain.chain)).toBeFalsy();
            });
        })
        describe('when the chain start with the genesis block and has multiple blocks', () => {
          describe('and a lastHash reference has changed',() => {
              it('returns false',() => {
                  blockchain.chain[2].lastHash = 'broken-lastHash'
                  expect(Blockchain.isValidChain(blockchain.chain)).toBeFalsy();
              });
          });
          describe('and the chain contains a block with an invalid field',() => {
             it('returns false', () => {                 
             blockchain.chain[2].data = 'broken-lastHash'
             expect(Blockchain.isValidChain(blockchain.chain)).toBeFalsy();}); 
          });  
          describe('and the chain does not contains any invalid block',() => {
            it('returns true', () => {
                expect(Blockchain.isValidChain(blockchain.chain)).toBeTruthy();
            });
         });  
        })
    });

    describe('replaceChain()', () => {
        let logMock,errorMock;
        beforeEach(() => {
            errorMock = jest.fn()
            logMock = jest.fn()

            global.console.error = errorMock;
            global.console.log = logMock;
                })

        describe('when the new chain is shorter',() => {
            beforeEach(() => {
                newChain.chain[0] = {new: 'chain'}
                blockchain.replaceChain(newChain.chain);
            })
            it('does not replace the chain',() => {
                expect(blockchain.chain).toEqual(originalChain);
            })
            it('logs an error',() => {
                expect(errorMock).toHaveBeenCalled() 
            })
        })
        describe('when the new chain is longer',() => {   
            beforeEach(() => {
                newChain.addBlock({data:"Hello"});
                newChain.addBlock({data:"its"});
                newChain.addBlock({data:"me"});
                })
            describe('The chain is invalid',() => {
                beforeEach(() => {
                    newChain.chain[2].hash = 'fake'
                    blockchain.replaceChain(newChain.chain);
                })
                it('does not replace the chain',() => {

                    expect(blockchain.chain).toEqual(originalChain);
                })
                it('logs an error',() => {
                    expect(errorMock).toHaveBeenCalled() 
                })
            })
            describe('The chain is valid',() => {
                beforeEach(() => {
                    blockchain.replaceChain(newChain.chain); 
                })
                it('replaces the chain',() => {
                    expect(blockchain.chain).toEqual(newChain.chain);
                })
                it('logs about chain replacements',() => {
                    expect(logMock).toHaveBeenCalled() 
                })
            })
        })
    })
});

