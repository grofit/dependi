import {ConstructorDescriptor} from "./models/constructor-descriptor";
import {BindingSetup} from "./models/binding-setup";
import {IBindingProcessor} from "./processors/ibinding-processor";
import {IInstanceGenerator} from "./generators/iinstance-generator";
import {BindingContext} from "./binding-context";
import {IConstructorProcessor} from "./processors/iconstructor-processor";
import {DuplicateBindingError} from "./errors/duplicate-binding-error";
import {NoBindingError} from "./errors/no-binding-error";

export class Binder
{
    private bindings = {};
    private singletonCache = [];

    constructor(private constructorProcessor: IConstructorProcessor,
                private bindingProcessor: IBindingProcessor,
                private instanceGenerator: IInstanceGenerator)
    {}

    private getOrderedArgs = (descriptor: ConstructorDescriptor): Array<any> => {
        var bindingSetup = this.bindings[descriptor.name];
        var orderedArgs = [];

        for(var argName in bindingSetup.args) {
            var boundArg = bindingSetup.args[argName];
            if(boundArg.isDependency)
            {
                var dependency = this.get(boundArg.value);
                orderedArgs.push(dependency);
            }
            else
            { orderedArgs.push(boundArg.value); }
        }

        return orderedArgs;
    };

    private resolveDescriptorForNamedOrConstructor = (nameOrConstructor: (string | Function)): ConstructorDescriptor => {
        if(typeof nameOrConstructor == "string")
        {
            for(var namedParam in this.bindings){
                if(this.bindings[namedParam].named === nameOrConstructor)
                { return this.bindings[namedParam].descriptor; }
            }

            throw new NoBindingError("There is no named binding for [" + nameOrConstructor + "] confirm you have bound it");
        }

        return this.constructorProcessor.processConstructor(nameOrConstructor);
    };

    public bind = (targetConstructor: Function): BindingContext => {
        var descriptor = this.constructorProcessor.processConstructor(targetConstructor);

        if(this.bindings[descriptor.name])
        { throw new DuplicateBindingError("Dependency [" + descriptor.name + "] is already bound"); }

        var bindingSetup = new BindingSetup(descriptor);
        this.bindingProcessor.process(bindingSetup);
        this.bindings[descriptor.name] = bindingSetup;
        return new BindingContext(bindingSetup);
    };

    public unbind = (targetConstructor: Function): void => {
        var descriptor = this.constructorProcessor.processConstructor(targetConstructor);

        if(this.bindings[descriptor.name])
        { delete this.bindings[descriptor.name]; }
    };

    public get = (constructorOrName: (string | Function)): IInstanceGenerator => {

        var descriptor = this.resolveDescriptorForNamedOrConstructor(constructorOrName);

        if(!this.bindings[descriptor.name])
        { throw new NoBindingError("There is no available binding for [" + descriptor.name + "] confirm you have bound it"); }

        if(this.singletonCache[descriptor.name])
        { return this.singletonCache[descriptor.name]; }

        var bindingSetup = this.bindings[descriptor.name];
        var orderedArgs = this.getOrderedArgs(descriptor);
        var instanceFactory = this.instanceGenerator.generate(descriptor.factory, orderedArgs);

        if(bindingSetup.isSingleton)
        {
            this.singletonCache[descriptor.name] = new instanceFactory();
            return this.singletonCache[descriptor.name];
        }

        return new instanceFactory();
    };
}