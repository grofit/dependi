var BindJS = (function(){
    
	function ConstructorDescriptor(name, args)
	{
		this.name = name;
		this.args = args;
	}

	function BindingSetup(constructorDescriptor)
	{
		this.descriptor = constructorDescriptor;
		this.args = [];
	}

	function BoundArgument(value, isDependency)
	{
		this.value = value;
		this.isDependency = isDependency;
	}

    var getConstructorDescriptor = function(targetConstructor) {
        var functionMatcher = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
        var constructorMatcher = /function (\w*)/;
        var text = targetConstructor.toString();
        var matches = text.match(functionMatcher);
        var constructorName = matches[0].match(constructorMatcher)[1];
        var constructorArgs = matches[1].split(',');
        return new ConstructorDescriptor(constructorName, constructorArgs);
    };

    var createInstanceFactory = function(targetConstructor, args) {
        var finalArgs = [null].concat(args);
        return targetConstructor.bind.apply(targetConstructor, finalArgs);
    };

	return function()
	{	
		var self = this;
		var bindings = [];
	
		function BindingContext(bindingSetup) {
		
			this.withDependency = function(name, targetConstructor) {
				if(bindingSetup.args[name])
				{ throw "Dependency [" + bindingSetup.descriptor.name + "] already has bound argument [" + name + "]"; }

				bindingSetup.args[name] = new BoundArgument(targetConstructor, true);
				return this;
			};
			
			this.withArgument = function(name, value) {
				if(bindingSetup.args[name])
				{ throw "Dependency [" + bindingSetup.descriptor.name + "] already has bound argument [" + name + "]"; }
				bindingSetup.args[name] = new BoundArgument(value, false);
				return this;
			};
		};
		
		var getOrderedArgs = function(descriptor) {
			var bindingSetup = bindings[descriptor.name];
			var orderedArgs = [];
			
			for(var argName in bindingSetup.args) {
				var boundArg = bindingSetup.args[argName];
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

		this.bind = function(targetConstructor) {
			var descriptor = getConstructorDescriptor(targetConstructor);
			if(bindings[descriptor.name]) 
			{ throw "Dependency [" + descriptor.name + "] is already bound"; }
			
			var bindingSetup = new BindingSetup(descriptor);
			bindings[descriptor.name] = bindingSetup;
			return new BindingContext(bindingSetup);
		};

        this.unbind = function(targetConstructor) {
            var descriptor = getConstructorDescriptor(targetConstructor);
            if(bindings[descriptor.name])
            { delete bindings[descriptor.name]; }
        };
		
		this.get = function(targetConstructor) {
			var descriptor = getConstructorDescriptor(targetConstructor);

            if(!bindings[descriptor.name])
			{ throw "There is no available binding for [" + descriptor.name + "] confirm you have bound it"; }

            var orderedArgs = getOrderedArgs(descriptor);
            var instanceFactory = createInstanceFactory(targetConstructor, orderedArgs);
            return new instanceFactory();
		};
	}

})();