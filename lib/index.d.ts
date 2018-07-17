declare global {
    interface Window {
        crabug: boolean;
    }
}
interface IShadowRoot extends ShadowRoot {
    innerHTML: any;
}
export declare class Component extends HTMLElement {
    [key: string]: any;
    componentDidMount?(): void;
    componentDidUnmount?(): void;
    handleClick?: () => void;
    inner: string;
    render?(_inner?: string): string | number;
    root: IShadowRoot;
    shouldComponentUpdate?: (oldState: any, oldAttributes: any) => boolean;
    state: {} | any[] | string | number;
    constructor();
    _handleClick(): void;
    handleInternalRender(): void;
    connectedCallback(): void;
    setProp(name: string, value: any): void;
    disconnectedCallback(): void;
    attributeChangedCallback(attrName: string, oldValue: any, newValue: any): void;
    setState(data: any): void;
    shouldRender(oldState?: any, oldAttributes?: any): false | void;
    forceRender(): void;
    reRender(): void;
}
export declare function defineComponents(components: any[], options: {
    crabug: boolean;
}): void;
export declare function render(content: string, globalStyle: string | null, element: HTMLElement): void;
export {};
