import { Vue } from 'vue-property-decorator';
export default class Eyedrop extends Vue {
    canvas: HTMLCanvasElement;
    pixel: Uint8ClampedArray;
    magnifierGlassStyle: any;
    magnifierColorStyle: any;
    mouseOver: boolean;
    zoom: number;
    magnifierGlassWidth: number;
    magnifierGlassHeight: number;
    colorLabel: boolean;
    src: string;
    width: number;
    height: number;
    alt: string;
    onImageSourceUpdate(newImageSource: string): void;
    readonly colorPickerStyle: any;
    readonly label: string;
    readonly showMagnifierColor: boolean;
    readonly showMagnifierGlass: boolean;
    readonly magnifierColorSquareStyle: {
        backgroundColor: string;
    } | {
        backgroundColor?: undefined;
    };
    mouseleave(event: MouseEvent): void;
    mousemove(event: MouseEvent): void;
    private createCanvas;
    private createMagnifyingGlass;
}
