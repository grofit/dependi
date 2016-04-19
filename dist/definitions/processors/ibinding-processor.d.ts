import { BindingSetup } from "../models/binding-setup";
export interface IBindingProcessor {
    process(bindingSetup: BindingSetup): void;
}
