const lib = require('../lib');

describe('absolute', () =>{
    it('should return a positive number if positive', () => {
        const result = lib.absolute(6);
        expect(result).toBe(6);
    });
    
    it('should return a positive number if negative', () => {
        const result = lib.absolute(-6);
        expect(result).toBe(6);
    });
    
    
    it('should return a positive number if negative', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
    
})

describe('greet', () => {
    it('Should be the Greeting message', () => {
        const result = lib.greet('Vinay');
        expect(result).toBe('Welcome Vinay');
    });
})
