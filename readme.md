# Dependi

[![Build Status](https://travis-ci.org/grofit/dependi.svg?branch=master)](https://travis-ci.org/grofit/dependi)

A simple dependency container which allows for construction injection, meaning you can have your cake and eat it.

## Warning

This is a prototype and is designed to work in a classical way so will require named function constructors to work.

This was designed for ES3/5 systems in a world without decorators, it does have decorators for TS and ES6/7 users,
however going forward more use cases could be supported for injection chains rather than simple instantiations.

## Features to come

Ideally before I start using it anywhere I will need it to:

- Allow lifecycle binding options (singleton, transient etc) [DONE]
- Allow named/alias bindings [DONE]
- Cache instance factories for performance boost
- Add decorators for ES7 style use-cases [PARTIALLY DONE]

Ideally if it is possible (I think it is) and I get time:

- Proxying for AoP style wrappers

It would be nice if there was a way to infer arguments some way, so you dont need
to manually tie the arg name to the dependency, however will see how it evolves over time.

## Usage

To do something basic you will need to new up an instance of `Dependi`, you really should just have one instance,
although you can make multiple instances. Each one is isolated and has its own binding details.

To bind something you would do:
```
// Browser
var container = new Dependi.Container();
container.bind(YourObjectConstructor);

// NodeJs
var container = require("dependi").Container;
```

Then to get it you would do:
```
var myInstance = container.get(YourObjectConstructor);
```

If you have parameters in your constructor then tell the binding what to put in there:
```
container.bind(YourObjectConstructor).withArgument("argumentName", argumentValue);
```

Sometimes you will have a dependency on another object that has been bound, so in that case
you will need to indicate to the container that you require a dependency injected into your constructor.

```
var container = new Dependi.Container();
container.bind(DependencyConstructor);
container.bind(DependantConstructor).withDependency("argumentName", DependencyConstructor);
```

You can chain together your bindings so if you have multiple arguments:
```
container.bind(YourObjectConstructor).withArgument("argument1Name", someValue).withArgument("argument2Name", someOtherValue).withDependency("argument3Name", SomeDependencyConstructor);
```

Finally you can manage the lifetime of your objects, in some cases you will want to share the same instance
between all components within the dependency tree, in other cases you will want a new instance in each use.
By default each `get` or dependency requirement will create a new instance of the dependency, however you can
infer the lifetime like so:

```
container.bind(YourObjectConstructor).asSingleton();
```

## Example

A simple example of using IoC:

```
function Foo(bar, message) // requires bar instance and a message
{
	this.doSomething = function() {
		bar.alertUser(message);
	}
}

function Bar()
{
	this.alertUser = function(message) {
		alert(message);
	};
}

var container = new Dependi.Container();
container.bind(Bar);
container.bind(Foo)
	  .withDependency("bar", Bar)	// withDependency(argName, constructorForDependency);
	  .withArgument("message", "DANGER WILL ROBINSON"); // withArgument(argName, argValue);
		
var foo = container.get(Foo);
foo.doSomething(); // Alerts DANGER WILL ROBINSON
```

Here is an example of what it does, check source code.
[View Example](https://rawgithub.com/grofit/dependi/master/example.html)
