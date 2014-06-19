function ConstructorDescription(name, targetConstructor, args)
{
	this.name = name;
	this.targetConstructor = targetConstructor;
	this.args = args;
}

function BindingRule(constructorDescriptor)
{
	this.descriptor = constructorDescriptor;
	this.args = [];
}

function BoundArgument(value, isDependency)
{
	this.value = value;
	this.isDependency = isDependency;
}

function BindJS()
{	
	var self = this;
	var bindings = [];
	
	function BindingContext(bindingRule) {
	
		this.withDependency = function(name, targetConstructor) {
			if(bindingRule.args[name])
			{ throw "Dependency [" + bindingRule.descriptor.name + "] already has bound argument [" + name + "]"; }

			bindingRule.args[name] = new BoundArgument(targetConstructor, true);
			return this;
		};
		
		this.withArgument = function(name, value) {
			if(bindingRule.args[name])
			{ throw "Dependency [" + bindingRule.descriptor.name + "] already has bound argument [" + name + "]"; }
			bindingRule.args[name] = new BoundArgument(value, false);
			return this;
		};
	};
	
	var getObjectDescriptor = function(targetConstructor) {
		var functionMatcher = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
        var constructorMatcher = /function (\w*)/;
        var text = targetConstructor.toString();
		var matches = text.match(functionMatcher);
		var descriptor = new ConstructorDescription();
		var constructorName = matches[0].match(constructorMatcher)[1];
        var constructorArgs = matches[1].split(',');
		var descriptor = new ConstructorDescription(constructorName, targetConstructor, constructorArgs);
		return descriptor;		
	};
	
	var getOrderedArgs = function(descriptor) {
		var bindingRule = bindings[descriptor.name];
		var orderedArgs = [];
		
		for(var argName in bindingRule.args) {
			var boundArg = bindingRule.args[argName];
			var valueToUse;
			if(boundArg.isDependency) 
			{ 
				var dependency = self.get(boundArg.value);
				orderedArgs.push(dependency); 
			}
			else 
			{ orderedArgs.push(boundArg.value); }
		}
		
		return orderedArgs;
	};
	
	var createInstance = function(targetConstructor, args) {
		var finalArgs = [null].concat(args);
		var factoryFunction = targetConstructor.bind.apply(targetConstructor, finalArgs);
		return new factoryFunction();
	};
	
	this.bind = function(targetConstructor) {
		var descriptor = getObjectDescriptor(targetConstructor);
		if(bindings[descriptor.name]) 
		{ throw "Dependency [" + descriptor.name + "] is already bound"; }
		
		var bindingRule = new BindingRule(descriptor);
		bindings[descriptor.name] = bindingRule;
		return new BindingContext(bindingRule);
	};
	
	this.get = function(targetConstructor) {
		var descriptor = getObjectDescriptor(targetConstructor);
		if(!bindings[descriptor.name])
		{ throw "There is no available binding for [" + descriptor.name + "] confirm you have bound it"; }
		
		var orderedArgs = getOrderedArgs(descriptor);
		return createInstance(targetConstructor, orderedArgs);
	};
}