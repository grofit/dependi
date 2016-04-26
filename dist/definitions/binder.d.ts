import { IBindingProcessor } from "./processors/ibinding-processor";
import { IInstanceGenerator } from "./generators/iinstance-generator";
import { BindingContext } from "./binding-context";
import { IConstructorProcessor } from "./processors/iconstructor-processor";
export declare class Binder {
    private constructorProcessor;
    private bindingProcessor;
    private instanceGenerator;
    private bindings;
    private singletonCache;
    constructor(constructorProcessor: IConstructorProcessor, bindingProcessor: IBindingProcessor, instanceGenerator: IInstanceGenerator);
    private getOrderedArgs;
    private resolveDescriptorForNamedOrConstructor;
    bind: (targetConstructor: Function) => BindingContext;
    unbind: (targetConstructor: Function) => void;
    get: <T>(constructorOrName: string | Function) => T;
}
