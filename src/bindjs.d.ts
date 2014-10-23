interface BindingContext
{
    withDependency(name, targetConstructor): BindingContext;
	withArgument(name: string, value: any) : BindingContext;
    asSingleton() : BindingContext;
}

declare class BindJs
{
    bind(objectConstructor: Function): BindingContext;
    unbind(objectConstructor: Function);
    get(objectConstructor: Function): any;
    get<T>(objectConstructor: Function): T;
}