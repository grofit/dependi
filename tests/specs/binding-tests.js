var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var Container = Dependi.Container;

describe('Binding', function () {

    it('should correctly instantiate object', function () {
        function SomeSimpleClass()
        { this.value = 10; }

        var container = new Container();
        container.bind(SomeSimpleClass);

        var createdObj = container.get(SomeSimpleClass);

        assert.ok(createdObj);
        assert.equal(createdObj.value, 10);
    });

    it('should correctly instantiate object with argument', function () {
        function SomeSimpleClass(value1)
        { this.value = value1; }

        var container = new Container();
        container.bind(SomeSimpleClass).withArgument("value1", 22);

        var createdObj = container.get(SomeSimpleClass);

        assert.ok(createdObj);
        assert.equal(createdObj.value, 22);
    });

    it('should correctly instantiate object with argument', function () {

        function SomeOtherClass(value1)
        { this.value = value1; }

        function SomeSimpleClass(someOtherClass)
        { this.value = someOtherClass.value + 10; }

        var container = new Container();
        container.bind(SomeOtherClass).withArgument("value1", 12);
        container.bind(SomeSimpleClass).withDependency("someOtherClass", SomeOtherClass);

        var createdObj = container.get(SomeSimpleClass);

        assert.ok(createdObj);
        assert.equal(createdObj.value, 22);
    });


    it('should correctly instantiate named object', function () {

        function SomeSimpleClass(value1)
        { this.value = value1; }

        var container = new Container();
        container.bind(SomeSimpleClass).withArgument("value1", 12).named("SuperAce");

        var createdObj = container.get("SuperAce");

        assert.ok(createdObj);
        assert.equal(createdObj.value, 12);
    });


    it('should not allow 2 bindings for same type', function () {

        function SomeSimpleClass(value1)
        { this.value = value1; }

        var container = new Container();
        container.bind(SomeSimpleClass).withArgument("value1", 12);

        expect(function(){ container.bind(SomeSimpleClass); }).to.throw(Dependi.DuplicateBindingError)
    });

    it('should return singleton instance when bound as singleton', function () {

        function SomeSimpleClass(value1)
        { this.value = value1; }

        var container = new Container();
        container.bind(SomeSimpleClass).withArgument("value1", 12).asSingleton();

        var instance1 = container.get(SomeSimpleClass);
        instance1.value += 10;

        var instance2 = container.get(SomeSimpleClass);

        expect(instance2.value).to.equal(22);
    });

});