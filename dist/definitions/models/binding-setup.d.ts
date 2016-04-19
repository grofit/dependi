import { ConstructorDescriptor } from "./constructor-descriptor";
export declare class BindingSetup {
    descriptor: ConstructorDescriptor;
    args: any[];
    isSingleton: boolean;
    named: string;
    constructor(descriptor: ConstructorDescriptor);
}
