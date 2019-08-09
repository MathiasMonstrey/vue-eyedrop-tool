import { Component, Prop, Vue, Watch, PropSync } from 'vue-property-decorator';

@Component
export default class Eyedrop extends Vue {

    public canvas: HTMLCanvasElement = null;
    public pixel: Uint8ClampedArray = null;
    public magnifierGlassStyle: any = {};
    public magnifierColorStyle: any = {};
    public mouseOver: boolean = false;

    @Prop({ default: 4, type: Number })
    public zoom: number;

    @Prop({ default: 50, type: Number })
    public magnifierGlassWidth: number;

    @Prop({ default: 50, type: Number })
    public magnifierGlassHeight: number;

    @Prop({ default: false, type: Boolean })
    public colorLabel: boolean;

    @Prop({ required: true, type: String })
    public src: string;

    @Prop({ required: true, type: Number })
    public width: number;

    @Prop({ required: true, type: Number })
    public height: number;

    @Prop({ required: true, type: String })
    public alt: string;

    @Watch('src', { immediate: true })
    public onImageSourceUpdate(newImageSource: string) {
        this.createCanvas(newImageSource);
        this.createMagnifyingGlass(newImageSource);
    }

    get colorPickerStyle(): any {
        return {
            width: this.width,
            height: this.height,
        };
    }

    get label(): string {
        if (this.pixel) {
            const r = this.pixel[0];
            const g = this.pixel[1];
            const b = this.pixel[2];
            return `r:${r} g:${g} b:${b} ${RGBToHex(r, g, b)}`;
        }
        return '';
    }

    get showMagnifierColor(): boolean {
        return this.pixel && this.colorLabel && this.mouseOver;
    }
    get showMagnifierGlass(): boolean {
        return !!this.canvas && this.mouseOver;
    }

    get magnifierColorSquareStyle() {
        if (this.pixel) {
            return {
                backgroundColor: `rgb(${this.pixel[0]},${this.pixel[1]},${this.pixel[2]})`,
            };
        }
        return {};
    }

    public mouseleave(event: MouseEvent){
        this.mouseOver = false;
    }

    public mousemove(event: MouseEvent) {
        this.mouseOver = true;
        if (this.canvas) {
            this.pixel = this.canvas.getContext('2d')!.getImageData(event.offsetX, event.offsetY, 1, 1).data;
            this.$emit('color-update', { r: this.pixel[0], g: this.pixel[1], b: this.pixel[2] });
            Vue.set(this.magnifierGlassStyle, 'left', `${event.pageX - this.magnifierGlassWidth}px`);
            Vue.set(this.magnifierGlassStyle, 'top', `${event.pageY - this.magnifierGlassHeight}px`);
            Vue.set(this.magnifierColorStyle, 'left', `${event.pageX - this.magnifierGlassWidth - 100}px`);
            Vue.set(this.magnifierColorStyle, 'top', `${event.pageY + this.magnifierGlassHeight + 5}px`);

            console.log({ clientY: event.clientY, offsetY: event.offsetY, event });

            Vue.set(
                this.magnifierGlassStyle,
                'backgroundPosition',
                `${0 - (
                    (event.offsetX * this.zoom) - this.magnifierGlassWidth)
                }px ${0 - (
                    (event.offsetY * this.zoom) - this.magnifierGlassHeight)
                }px`,
            );
        }
    }

    private createCanvas(imageSource: string) {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        const context = canvas.getContext('2d');
        const img = new Image();
        img.src = imageSource;
        img.onload = () => {
            context!.drawImage(img, 0, 0, this.width, this.height);
        };
        this.canvas = canvas;
    }

    private createMagnifyingGlass(imageSource: string) {
        Vue.set(this.magnifierGlassStyle, 'backgroundImage', `url('${imageSource}')`);
        Vue.set(this.magnifierGlassStyle, 'backgroundRepeat', 'no-repeat');
        Vue.set(this.magnifierGlassStyle,
            'backgroundSize',
            `${this.width * this.zoom}px ${this.height * this.zoom}px`);
    }
}

function RGBToHex(r: number, g: number, b: number) {
    let rString = r.toString(16);
    let gString = g.toString(16);
    let bString = b.toString(16);

    if (rString.length === 1) {
        rString = '0' + rString;
    }
    if (gString.length === 1) {
        gString = '0' + gString;
    }
    if (bString.length === 1) {
        bString = '0' + bString;
    }

    return '#' + rString + gString + bString;
}
