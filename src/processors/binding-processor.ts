import {BindingSetup} from "../models/binding-setup";
import {IBindingProcessor} from "./ibinding-processor";

export class BindingProcessor implements IBindingProcessor
{
    public process = (bindingSetup: BindingSetup): void => {
        bindingSetup.descriptor.args.forEach((arg) => {
            bindingSetup.args[arg] = null;
        });
    };
}