import { BindingSetup } from "./models/binding-setup";
export declare class BindingContext {
    private bindingSetup;
    constructor(bindingSetup: BindingSetup);
    withDependency: (name: any, targetConstructor: any) => this;
    withArgument: (name: any, value: any) => this;
    asSingleton: () => this;
    named: (name: any) => this;
}
