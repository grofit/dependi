import {BindingSetup} from "./models/binding-setup";
import {BoundArgument} from "./models/bound-argument";

export class BindingContext
{
    constructor(private bindingSetup: BindingSetup){}

    public withDependency = (name, targetConstructor) => {
        if(this.bindingSetup.args[name])
        { throw "Dependency [" + this.bindingSetup.descriptor.name + "] already has bound argument [" + name + "]"; }
        this.bindingSetup.args[name] = new BoundArgument(targetConstructor, true);
        return this;
    };

    public withArgument = (name, value) => {
        if(this.bindingSetup.args[name])
        { throw "Value [" + this.bindingSetup.descriptor.name + "] already has bound argument [" + name + "]"; }
        this.bindingSetup.args[name] = new BoundArgument(value, false);
        return this;
    };

    public asSingleton = () => {
        this.bindingSetup.isSingleton = true;
        return this;
    };

    public named = (name) => {
        this.bindingSetup.named = name;
        return this;
    };
}