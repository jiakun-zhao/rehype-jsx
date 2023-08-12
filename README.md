# rehype-jsx

![npm version](https://img.shields.io/npm/v/rehype-jsx?color=%236054ba)

##### The image will be transformed into a module.

```markdown
![alt](./example.png)
```

->

```jsx
import __image_0__ from './example.png'

<img {...__image_0__} alt="alt" />
```
