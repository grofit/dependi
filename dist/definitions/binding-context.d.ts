import { BindingSetup } from "./models/binding-setup";
export declare class BindingContext {
    private bindingSetup;
    constructor(bindingSetup: BindingSetup);
    withDependency: (name: string, targetConstructor: Function) => BindingContext;
    withArgument: (name: string, value: any) => BindingContext;
    asSingleton: () => BindingContext;
    named: (name: string) => BindingContext;
}
