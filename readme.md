# BindJS

A simple dependency container which allows for construction injection, meaning you can have your cake and eat it.

## Warning

This is still a prototype so it is not ready for use anywhere.

## Features to come

Ideally before I start using it anywhere I will need it to:

- Allow lifecycle binding options (singleton, transient etc)
- Cache instance factories for performance boost

Ideally if it is possible (I think it is) and I get time:

- Proxying for AoP style wrappers

It would be nice if there was a way to infer arguments some way, so you dont need
to manually tie the arg name to the dependency, however will see how it evolves over time.

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

var binder = new BindJS();
binder.bind(Bar);
binder.bind(Foo)
	  .withDependency("bar", Bar)	// withDependency(argName, constructorForDependency);
	  .withArgument("message", "DANGER WILL ROBINSON"); // withArgument(argName, argValue);
		
var foo = binder.get(Foo);
foo.doSomething(); // Alerts DANGER WILL ROBINSON
```

Here is an example of what it does, check source code.
[View Example](https://rawgithub.com/grofit/bindjs/master/example.html)