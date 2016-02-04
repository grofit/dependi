(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["BindJs"] = factory();
	else
		root["BindJs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* This is an auto-generated file by gulp-es6-exporter */
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(1));
	__export(__webpack_require__(3));
	__export(__webpack_require__(7));
	__export(__webpack_require__(5));
	__export(__webpack_require__(6));
	__export(__webpack_require__(12));
	__export(__webpack_require__(11));
	__export(__webpack_require__(2));
	__export(__webpack_require__(4));
	__export(__webpack_require__(9));
	__export(__webpack_require__(10));
	__export(__webpack_require__(8));
	__export(__webpack_require__(13));
	__export(__webpack_require__(14));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var binding_setup_1 = __webpack_require__(2);
	var binding_context_1 = __webpack_require__(3);
	var duplicate_binding_error_1 = __webpack_require__(5);
	var no_binding_error_1 = __webpack_require__(6);
	var Binder = (function () {
	    function Binder(constructorProcessor, bindingProcessor, instanceGenerator) {
	        var _this = this;
	        this.constructorProcessor = constructorProcessor;
	        this.bindingProcessor = bindingProcessor;
	        this.instanceGenerator = instanceGenerator;
	        this.bindings = {};
	        this.singletonCache = [];
	        this.getOrderedArgs = function (descriptor) {
	            var bindingSetup = _this.bindings[descriptor.name];
	            var orderedArgs = [];
	            for (var argName in bindingSetup.args) {
	                var boundArg = bindingSetup.args[argName];
	                if (boundArg.isDependency) {
	                    var dependency = _this.get(boundArg.value);
	                    orderedArgs.push(dependency);
	                }
	                else {
	                    orderedArgs.push(boundArg.value);
	                }
	            }
	            return orderedArgs;
	        };
	        this.resolveDescriptorForNamedOrConstructor = function (nameOrConstructor) {
	            if (typeof nameOrConstructor == "string") {
	                for (var namedParam in _this.bindings) {
	                    if (_this.bindings[namedParam].named === nameOrConstructor) {
	                        return _this.bindings[namedParam].descriptor;
	                    }
	                }
	                throw new no_binding_error_1.NoBindingError("There is no named binding for [" + nameOrConstructor + "] confirm you have bound it");
	            }
	            return _this.constructorProcessor.processConstructor(nameOrConstructor);
	        };
	        this.bind = function (targetConstructor) {
	            var descriptor = _this.constructorProcessor.processConstructor(targetConstructor);
	            if (_this.bindings[descriptor.name]) {
	                throw new duplicate_binding_error_1.DuplicateBindingError("Dependency [" + descriptor.name + "] is already bound");
	            }
	            var bindingSetup = new binding_setup_1.BindingSetup(descriptor);
	            _this.bindingProcessor.process(bindingSetup);
	            _this.bindings[descriptor.name] = bindingSetup;
	            return new binding_context_1.BindingContext(bindingSetup);
	        };
	        this.unbind = function (targetConstructor) {
	            var descriptor = _this.constructorProcessor.processConstructor(targetConstructor);
	            if (_this.bindings[descriptor.name]) {
	                delete _this.bindings[descriptor.name];
	            }
	        };
	        this.get = function (constructorOrName) {
	            var descriptor = _this.resolveDescriptorForNamedOrConstructor(constructorOrName);
	            if (!_this.bindings[descriptor.name]) {
	                throw new no_binding_error_1.NoBindingError("There is no available binding for [" + descriptor.name + "] confirm you have bound it");
	            }
	            if (_this.singletonCache[descriptor.name]) {
	                return _this.singletonCache[descriptor.name];
	            }
	            var bindingSetup = _this.bindings[descriptor.name];
	            var orderedArgs = _this.getOrderedArgs(descriptor);
	            var instanceFactory = _this.instanceGenerator.generate(descriptor.factory, orderedArgs);
	            if (bindingSetup.isSingleton) {
	                _this.singletonCache[descriptor.name] = new instanceFactory();
	                return _this.singletonCache[descriptor.name];
	            }
	            return new instanceFactory();
	        };
	    }
	    return Binder;
	})();
	exports.Binder = Binder;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var BindingSetup = (function () {
	    function BindingSetup(descriptor) {
	        this.descriptor = descriptor;
	        this.args = [];
	        this.isSingleton = false;
	        this.named = "";
	    }
	    return BindingSetup;
	})();
	exports.BindingSetup = BindingSetup;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var bound_argument_1 = __webpack_require__(4);
	var BindingContext = (function () {
	    function BindingContext(bindingSetup) {
	        var _this = this;
	        this.bindingSetup = bindingSetup;
	        this.withDependency = function (name, targetConstructor) {
	            if (_this.bindingSetup.args[name]) {
	                throw "Dependency [" + _this.bindingSetup.descriptor.name + "] already has bound argument [" + name + "]";
	            }
	            _this.bindingSetup.args[name] = new bound_argument_1.BoundArgument(targetConstructor, true);
	            return _this;
	        };
	        this.withArgument = function (name, value) {
	            if (_this.bindingSetup.args[name]) {
	                throw "Value [" + _this.bindingSetup.descriptor.name + "] already has bound argument [" + name + "]";
	            }
	            _this.bindingSetup.args[name] = new bound_argument_1.BoundArgument(value, false);
	            return _this;
	        };
	        this.asSingleton = function () {
	            _this.bindingSetup.isSingleton = true;
	            return _this;
	        };
	        this.named = function (name) {
	            _this.bindingSetup.named = name;
	            return _this;
	        };
	    }
	    return BindingContext;
	})();
	exports.BindingContext = BindingContext;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var BoundArgument = (function () {
	    function BoundArgument(value, isDependency) {
	        this.value = value;
	        this.isDependency = isDependency;
	    }
	    return BoundArgument;
	})();
	exports.BoundArgument = BoundArgument;


/***/ },
/* 5 */
/***/ function(module, exports) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var DuplicateBindingError = (function (_super) {
	    __extends(DuplicateBindingError, _super);
	    function DuplicateBindingError(message) {
	        _super.call(this, message);
	    }
	    return DuplicateBindingError;
	})(Error);
	exports.DuplicateBindingError = DuplicateBindingError;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var NoBindingError = (function (_super) {
	    __extends(NoBindingError, _super);
	    function NoBindingError(message) {
	        _super.call(this, message);
	    }
	    return NoBindingError;
	})(Error);
	exports.NoBindingError = NoBindingError;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var binder_1 = __webpack_require__(1);
	var constructor_processor_1 = __webpack_require__(8);
	var binding_processor_1 = __webpack_require__(10);
	var instance_generator_1 = __webpack_require__(11);
	var Container = (function (_super) {
	    __extends(Container, _super);
	    function Container() {
	        _super.call(this, new constructor_processor_1.ConstructorProcessor(), new binding_processor_1.BindingProcessor(), new instance_generator_1.InstanceGenerator());
	    }
	    return Container;
	})(binder_1.Binder);
	exports.Container = Container;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var constructor_descriptor_1 = __webpack_require__(9);
	var ConstructorProcessor = (function () {
	    function ConstructorProcessor() {
	        var _this = this;
	        this.functionMatcher = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
	        this.constructorMatcher = /function (\w*)/;
	        this.processConstructor = function (targetConstructor) {
	            var text = targetConstructor.toString();
	            var matches = text.match(_this.functionMatcher);
	            if (!matches) {
	                throw new Error("The function matcher cannot find a valid constructor for: " + targetConstructor);
	            }
	            var constructorName = matches[0].match(_this.constructorMatcher)[1];
	            var constructorArgs = [];
	            if (matches[1].length > 0) {
	                constructorArgs = matches[1].replace(/ /g, '').split(',');
	            }
	            return new constructor_descriptor_1.ConstructorDescriptor(constructorName, constructorArgs, targetConstructor);
	        };
	    }
	    return ConstructorProcessor;
	})();
	exports.ConstructorProcessor = ConstructorProcessor;


/***/ },
/* 9 */
/***/ function(module, exports) {

	var ConstructorDescriptor = (function () {
	    function ConstructorDescriptor(name, args, factory) {
	        this.name = name;
	        this.args = args;
	        this.factory = factory;
	    }
	    return ConstructorDescriptor;
	})();
	exports.ConstructorDescriptor = ConstructorDescriptor;


/***/ },
/* 10 */
/***/ function(module, exports) {

	var BindingProcessor = (function () {
	    function BindingProcessor() {
	        this.process = function (bindingSetup) {
	            bindingSetup.descriptor.args.forEach(function (arg) {
	                bindingSetup.args[arg] = null;
	            });
	        };
	    }
	    return BindingProcessor;
	})();
	exports.BindingProcessor = BindingProcessor;


/***/ },
/* 11 */
/***/ function(module, exports) {

	var InstanceGenerator = (function () {
	    function InstanceGenerator() {
	    }
	    InstanceGenerator.prototype.generate = function (targetConstructor, args) {
	        var finalArgs = [null].concat(args);
	        return targetConstructor.bind.apply(targetConstructor, finalArgs);
	    };
	    return InstanceGenerator;
	})();
	exports.InstanceGenerator = InstanceGenerator;


/***/ },
/* 12 */
/***/ function(module, exports) {

	


/***/ },
/* 13 */
/***/ function(module, exports) {

	


/***/ },
/* 14 */
/***/ function(module, exports) {

	


/***/ }
/******/ ])
});
;