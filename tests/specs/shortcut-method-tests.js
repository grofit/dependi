var assert = chai.assert;
var expect = chai.expect;

describe('Shortcut Methods', function () {

    it('should correctly unbind object', function () {
        function SomeSimpleClass()
        { this.value = 10; }

        var typeName = Dependi.getTypeName(SomeSimpleClass);
        expect(typeName).to.equal("SomeSimpleClass");
    });

});