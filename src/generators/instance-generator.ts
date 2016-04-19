import {IInstanceGenerator} from "./iinstance-generator";

export class InstanceGenerator implements IInstanceGenerator
{
    public generate(targetConstructor: Function, args: any): any
    {
        var finalArgs = [null].concat(args);
        return targetConstructor.bind.apply(targetConstructor, finalArgs);
    }
}