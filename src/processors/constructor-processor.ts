import {ConstructorDescriptor} from "../models/constructor-descriptor";
import {IConstructorProcessor} from "./iconstructor-processor";

export class ConstructorProcessor implements IConstructorProcessor
{
    private functionMatcher = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    private constructorMatcher = /function (\w*)/;

    public processConstructor = (targetConstructor: any): ConstructorDescriptor =>
    {
        var text = targetConstructor.toString();
        var matches = text.match(this.functionMatcher);

        if(!matches) {
            throw new Error("The function matcher cannot find a valid constructor for: " + targetConstructor);
        }

        var constructorName = matches[0].match(this.constructorMatcher)[1];
        var constructorArgs = [];

        if(matches[1].length > 0)
        { constructorArgs = matches[1].replace(/ /g,'').split(','); }

        return new ConstructorDescriptor(constructorName, constructorArgs, targetConstructor);
    }
}