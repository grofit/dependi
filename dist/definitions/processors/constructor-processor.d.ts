import { ConstructorDescriptor } from "../models/constructor-descriptor";
import { IConstructorProcessor } from "./iconstructor-processor";
export declare class ConstructorProcessor implements IConstructorProcessor {
    private functionMatcher;
    private constructorMatcher;
    processConstructor: (targetConstructor: Function) => ConstructorDescriptor;
}
