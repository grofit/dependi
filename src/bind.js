(function (factory) {
    // Module systems magic dance.
	var global = (0, eval)('this');
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node
        factory(exports);
    } else if (typeof define === "function" && define["amd"]) {
        // AMD anonymous module
        define(["exports"], factory);
    } else {
        // <script> tag: use the global `BindJs` object
        factory(global);
    }
}(function (exports) {
	
	function ConstructorDescriptor(name, args)
	{
		this.name = name;
		this.args = args;
	}

	function BindingSetup(constructorDescriptor)
	{
		this.descriptor = constructorDescriptor;
		this.args = [];
        this.isSingleton = false;
        this.named = "";
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
        var constructorArgs = [];

        if(matches[1].length > 0)
        { constructorArgs = matches[1].replace(/ /g,'').split(','); }

        return new ConstructorDescriptor(constructorName, constructorArgs);
    };

    var createInstanceFactory = function(targetConstructor, args) {
        var finalArgs = [null].concat(args);
        return targetConstructor.bind.apply(targetConstructor, finalArgs);
    };

    var populateDefaultArgs = function(bindingSetup) {
        bindingSetup.descriptor.args.forEach(function(arg){
            bindingSetup.args[arg] = null;
        });
    };

	function BindJs()
	{	
		var self = this;
		var bindings = [];
        var singletonCache = [];
	
		function BindingContext(bindingSetup) {
		
			this.withDependency = function(name, targetConstructor) {
				if(bindingSetup.args[name])
				{ throw "Dependency [" + bindingSetup.descriptor.name + "] already has bound argument [" + name + "]"; }
				bindingSetup.args[name] = new BoundArgument(targetConstructor, true);
				return this;
			};
			
			this.withArgument = function(name, value) {
				if(bindingSetup.args[name])
				{ throw "Value [" + bindingSetup.descriptor.name + "] already has bound argument [" + name + "]"; }
				bindingSetup.args[name] = new BoundArgument(value, false);
				return this;
			};
			
            this.asSingleton = function() {
                bindingSetup.isSingleton = true;
                return this;
            };
            
            this.named = function(name) {
            	bindingSetup.named = name;
            	return this;
            };
		}
		
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
            populateDefaultArgs(bindingSetup);
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

            if(singletonCache[descriptor.name])
            { return singletonCache[descriptor.name]; }

            var bindingSetup = bindings[descriptor.name];
            var orderedArgs = getOrderedArgs(descriptor);
            var instanceFactory = createInstanceFactory(targetConstructor, orderedArgs);

            if(bindingSetup.isSingleton)
            {
                singletonCache[descriptor.name] = new instanceFactory();
                return singletonCache[descriptor.name];
            }

            return new instanceFactory();
		};
	}

	exports.BindJs = BindJs;
}));