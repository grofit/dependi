import { ConstructorDescriptor } from "../models/constructor-descriptor";
export interface IConstructorProcessor {
    processConstructor(targetConstructor: any): ConstructorDescriptor;
}
