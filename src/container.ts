import {Binder} from "./binder";
import {ConstructorProcessor} from "./processors/constructor-processor";
import {BindingProcessor} from "./processors/binding-processor";
import {InstanceGenerator} from "./generators/instance-generator";

export class Container extends Binder
{
    constructor()
    {
        super(new ConstructorProcessor(), new BindingProcessor(), new InstanceGenerator())
    }
}