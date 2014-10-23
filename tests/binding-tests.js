function someSimpleClass()
{ this.value = 10; }

function someClassWithConstructorArgs(someArg)
{ this.someArg = someArg; }

QUnit.test("should correctly instantiate object", function( assert ) {
    var bindJs = new BindJs();
    bindJs.bind(someSimpleClass);

    var createdObj = bindJs.get(someSimpleClass);

	assert.ok(createdObj);
	assert.equal(createdObj.value, 10);
});