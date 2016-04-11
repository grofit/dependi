import {Container} from "../container";
import {ConstructorProcessor} from "../processors/constructor-processor";
import {UnableToResolveError} from "../errors/unable-to-resolve-error";
import {ConstructorDescriptor} from "../models/constructor-descriptor";

//TODO: This needs changing as the global scope pollutes stuff
export var __container = new Container();
var constructorProcessor = new ConstructorProcessor();

export function withContainer() : Function {
    return function(target: Object, key: string, descriptor:  TypedPropertyDescriptor<any>): any {
        var originalExecutor = descriptor.value;
        descriptor.value = function() { return originalExecutor(__container); };
        return descriptor;
    }
};

export function inject(...types: Array<Function>) : Function {
    return function(target: Object, key: string, descriptor:  TypedPropertyDescriptor<any>): any {
        var allInstances = [];
        for (var type of types) {
            let instance = __container.get(type);
            let descriptor: ConstructorDescriptor;

            if(!instance) {
                descriptor = constructorProcessor.processConstructor(type);
                instance = descriptor.factory();
            }

            if(!instance) {
                throw new UnableToResolveError(`Unable to resolve or instantiate ${descriptor.name}`);
            }

            allInstances.push(instance);
        }

        var originalExecutor = descriptor.value;
        descriptor.value = function() { return originalExecutor.apply(originalExecutor, allInstances); };
        return descriptor;
    }
};