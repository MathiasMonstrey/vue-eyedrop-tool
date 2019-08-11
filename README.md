# Vue Eyedrop Tool

Component that allows the user to have a magnifying glass when hovering an image that shows the current color in rgb and hex.

## Installation

```bash
npm install vue-eyedrop-tool
```

## Example

[Demo](https://vue-eyedrop-tool.netlify.com/)

## Usage

Performance wise it's best to only import components when you need them, and you probably don't need this component on every page, so there is no need to load it of you don't need it.

Import the vue-eyedrop-component inside the component you need:
```javascript
import EyedropTool from 'vue-eyedrop-tool';

...

export default {
    components: {
        EyedropTool
    },
    data() {
        return {
            imgSrc1: require('./assets/image1.jpg'),
            imgSrc2: require('./assets/image2.jpg'),
        }
    }
}

```

Inside your template:

```html
<div>
    <eyedrop-tool :src="imgSrc1" :width="559" :height="744" alt="City" @color-update="updateColor" color-label
        style="display: inline-block" />
    <eyedrop-tool :zoom="10" :magnifier-glass-width="200" :magnifier-glass-height="200" :src="imgSrc2" :width="640" :height="360"
        alt="Rick and morty" @color-update="updateColor" color-label style="display: inline-block" />
</div>
```

## CSS

The component comes with css, to make use of it, add the following code to your main.js file:

```javascript
import 'vue-eyedrop-tool/dist/eyedrop.css';
```

## Exposed props
|Name|Type|Default|required|
|-|-|-|-|
|alt|string||yes|
|height|number||yes|
|src|string||yes|
|width|number||yes|
|colorLabel|boolean|false|
|magnifierGlassheight|number|100|
|magnifierGlassWidth|number|100|
|zoom|number|4|
