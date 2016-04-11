var assert = chai.assert;
var expect = chai.expect;

describe('Decorator Tests', function () {

    it('should correctly provide container to method with withContainer decorator', function () {

        var container = Dependi.__container;
        function pretendDecoratedMethod()
        {
            expect(arguments.length).to.equal(1);
            expect(arguments[0]).to.equal(container);
        }

        var fakeDescriptor = { value: pretendDecoratedMethod };
        Dependi.withContainer()(null, null, fakeDescriptor);

        fakeDescriptor.value();
    });

    it('should correctly provide instance to method with inject decorator', function () {
        var container = Dependi.__container;

        function ClassA(message)
        {
            this.message = message;
        }

        function pretendDecoratedMethod()
        {
            expect(arguments.length).to.equal(1);
            expect(arguments[0].message).to.equal("hello");
        }

        container.bind(ClassA).withArgument("message", "hello");

        var fakeDescriptor = { value: pretendDecoratedMethod };
        Dependi.inject(ClassA)(null, null, fakeDescriptor);

        fakeDescriptor.value();
    });

    it('should correctly provide complex instance to method with inject decorator', function () {
        var container = Dependi.__container;

        function ClassX(message)
        {
            this.message = message;
        }

        function ClassY(classX)
        {
            this.classX = classX;
        }

        function pretendDecoratedMethod()
        {
            console.log(arguments);
            expect(arguments.length).to.equal(1);
            expect(arguments[0].classX.message).to.equal("hello");
        }

        container.bind(ClassX).withArgument("message", "hello");
        container.bind(ClassY).withDependency("classX", ClassX);

        var fakeDescriptor = { value: pretendDecoratedMethod };
        Dependi.inject(ClassY)(null, null, fakeDescriptor);

        fakeDescriptor.value();
    });

    it('should correctly provide default instance to method with inject decorator', function () {
        var container = Dependi.__container;

        function ClassA()
        {
            this.message = "hello";
        }

        function pretendDecoratedMethod()
        {
            expect(arguments.length).to.equal(1);
            expect(arguments[0].message).to.equal("hello");
        }

        var fakeDecriptor = { value: pretendDecoratedMethod };
        Dependi.inject(ClassA)(null, null, fakeDecriptor);

        fakeDecriptor.value();
    });

});