// https://www.omnisci.com/blog/12-color-palettes-for-telling-better-stories-with-your-data

const colors = ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"];

let colorIndex = 0;

const color = (reset) => {
    if(reset) colorIndex = 0;
    const color = colors[colorIndex];
    colorIndex += 1;
    if(colorIndex >= colors.length) colorIndex = 0;
    return color;
}

export { colors, color };