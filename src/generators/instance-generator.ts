import {IInstanceGenerator} from "./iinstance-generator";

export class InstanceGenerator implements IInstanceGenerator
{
    public generate(targetConstructor: any, args: any)
    {
        var finalArgs = [null].concat(args);
        return targetConstructor.bind.apply(targetConstructor, finalArgs);
    }
}