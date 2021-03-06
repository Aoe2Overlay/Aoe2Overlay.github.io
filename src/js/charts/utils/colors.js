// https://www.omnisci.com/blog/12-color-palettes-for-telling-better-stories-with-your-data

const colors = ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"];
// const colors = ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"];

const createPalette = () => {
    let self = { 
        i: 0
    }
    self.color = () => {
        const color = colors[self.i];
        self.i += 1;
        if(self.i >= colors.length) self.i = 0;
        return color;
    }
    self.reset = () => {
        self.i = 0;
    }
    return self;
}

export { createPalette };