# Vue Eyedrop Tool

Component that allows the user to have a magnifying glass when hovering an image that shows the current color in rgb and hex.

## Installation

```bash
npm install vue-eyedrop-tool
```

## Usage

Performance wise it's best to only import components when you need them, and you probably don't need this component on every page, so there is no need to load it of you don't need it.

Import the vue-eyedrop-component inside the component you need:
```javascript
import EyedropTool from 'vue-eyedrop-tool';

...

export default {
    components: {
        VueEyedropTool
    }
}

```

Inside your template:

```html
<eyedrop-tool src="../assets/yourimage.jpg" width="500" height="500" alt="My image" color-label @color-update="doSomething"/>
```