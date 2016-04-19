import { BindingSetup } from "../models/binding-setup";
import { IBindingProcessor } from "./ibinding-processor";
export declare class BindingProcessor implements IBindingProcessor {
    process: (bindingSetup: BindingSetup) => void;
}
