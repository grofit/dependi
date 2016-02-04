import {BindingSetup} from "../models/binding-setup";
import {ConstructorDescriptor} from "../models/constructor-descriptor";

export interface IBindingProcessor
{
    process(bindingSetup: BindingSetup);
}