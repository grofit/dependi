import {ConstructorDescriptor} from "./constructor-descriptor"

export class BindingSetup
{
    public args = [];
    public isSingleton = false;
    public named = "";

    constructor(public descriptor: ConstructorDescriptor){}
}