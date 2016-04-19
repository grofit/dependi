export interface IInstanceGenerator
{
    generate(targetConstructor: Function, args: any): any;
}