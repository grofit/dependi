import {BindingSetup} from "../models/binding-setup";
import {ConstructorDescriptor} from "../models/constructor-descriptor";
import {IBindingProcessor} from "./ibinding-processor";

export class BindingProcessor implements IBindingProcessor
{
    public process = (bindingSetup: BindingSetup) => {
        bindingSetup.descriptor.args.forEach((arg) => {
            bindingSetup.args[arg] = null;
        });
    };
}