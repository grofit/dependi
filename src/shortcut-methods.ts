import {ConstructorProcessor} from "./processors/constructor-processor";
var constructorProcessor = new ConstructorProcessor();

export function getTypeName(type: Function) {
    var typeDetails = constructorProcessor.processConstructor(type);
    return typeDetails.name;
}