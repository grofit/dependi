var assert = chai.assert;
var expect = chai.expect;

var Container = Dependi.Container;

describe('Unbinding', function () {

    it('should correctly unbind object', function () {
        function SomeSimpleClass()
        { this.value = 10; }

        var container = new Container();
        container.bind(SomeSimpleClass);
        container.unbind(SomeSimpleClass);

        expect(function(){ container.get(SomeSimpleClass) }).to.throw(Dependi.NoBindingError);
    });

});