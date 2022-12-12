$(document).ready(function () {
   
});
const COLORS = {
    OFF: "#111",
    WHITE: "#f0f0f0",

    DARKRED: "#5A354B",
    RED: "#f971c3",
    BRIGHTRED: "#ffd3ee",

    DARKBLUE: "#2B4D4C",
    BLUE: "#6ff9ea",
    BRIGHTBLUE: "#d7fdf9",

    YELLOW: "#fff568",

    UI_ACCENT: "#08bfa2",
    UI_ACCENT2: "#f01978",
};

COLORS.schemes = {
    default: {
        name: "Super Medium",
        off: "#111",
        primary: COLORS.RED,
        primarybright: COLORS.BRIGHTRED,
        secondary: COLORS.BLUE,
        secondarybright: COLORS.BRIGHTBLUE,
        tertiary: COLORS.YELLOW,
    },

    blue: {
        name: "Star Warrior",
        off: "#111",
        primary: "#1e4482",
        primarybright: "#0B4BB3",
        secondary: "#c27727",
        secondarybright: "#FFD840",
        tertiary: "#d7fdf9",
    },

    purple: {
        name: "Galactic Royal",
        off: "#111",
        primary: "#6A39B3",
        primarybright: "#B685FF",
        secondary: "#FAF239",
        secondarybright: "#FFFC9E",
        tertiary: "#50FFF2",
    },

    green: {
        name: "Space Joker",
        off: "#111",
        primary: "#779E37",
        primarybright: "#C0FF59",
        secondary: "#6A39B3",
        secondarybright: "#B685FF",
        tertiary: "#FAFAFA",
    },

    yellow: {
        name: "Solar Flare",
        off: "#111",
        primary: "#C2C04C",
        primarybright: "#FAF761",
        secondary: "#E03A3E",
        secondarybright: "#FA7578",
        tertiary: "#278ECC",
    },

    red: {
        name: "Trail Blazer",
        off: "#111",
        primary: "#E03A3E",
        primarybright: "#FA7578",
        secondary: "#DADADA",
        secondarybright: "#EFEFEF",
        tertiary: "#666",
    },

    rgb: {
        name: "Mint Choco",
        off: "#111",
        primary: "#34eb89",
        primarYBRIGht: "#40fb95",
        secondary: "#34ebd8",
        secondarybright: "#40fbeA",
        tertiary: "#eb3434",
    },

    cheetah: {
        name: "Cheetah SoL",
        off: "#111",
        primary: "#c27727",
        primarYBright: "#e68319",
        secondary: "#635c54",
        secondarybright: "#8a857f",
        tertiary: "#ebebeb",
    },

    black: {
        name: "Ash Nova",
        off: "#111",
        primary: "#555",
        primarybright: "#808080",
        secondary: "#FFF",
        secondarybright: "#FFF",
        tertiary: "#B8B8B8",
    },
};
COLORS.options = Object.keys(COLORS.schemes);
AFRAME.registerShader("panelShader", {
    schema: {
        activePanel: {
            type: "number",
            is: "uniform",
            default: 0,
        },
        brightness: {
            type: "number",
            is: "uniform",
            default: 0.3,
        },
        borderWidth: {
            type: "number",
            is: "uniform",
            default: 0.004,
        },
        borderRadius: {
            type: "number",
            is: "uniform",
            default: 0.15,
        },
        colorPrimary: {
            type: "color",
            is: "uniform",
            default: "#f971c3",
        },
        colorSecondary: {
            type: "color",
            is: "uniform",
            default: "#6ff9ea",
        },
        midSection: {
            type: "number",
            is: "uniform",
            default: 0,
        },
        opacity: {
            type: "number",
            is: "uniform",
            default: 1,
        },
        ratio: {
            type: "number",
            is: "uniform",
            default: 0.5,
        },
        transparent: {
            default: true,
        },
    },

    // vertexShader: require('./shaders/panel.vert.glsl'),

    // fragmentShader: require('./shaders/panel.frag.glsl'),

    // vertexShader: document.getElementById('vertexShader').textContent,
    vertexShader: [
        "varying vec2 uvs;",
        "void main() {",
        "uvs.xy = uv.xy;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}",
    ].join("\n"),

    fragmentShader: [
        "#if __VERSION__ == 100",
        "#extension GL_OES_standard_derivatives : enable",
        "#endif",
        "uniform vec3 colorPrimary;",
        "uniform vec3 colorSecondary;",
        "#define PI 3.141592",
        "#define DIFF_SECTION_WIDTH 0.06",
        "uniform float borderWidth;",
        "uniform float borderRadius;",
        "uniform float brightness;",
        "uniform float ratio;",
        "uniform float midSection;",
        "uniform float opacity;",
        "uniform float activePanel;",
        "varying vec2 uvs;",
        "float sdBox( in vec2 p, in vec2 b )",
        "{",
        "vec2 d = abs(p)-b;",
        "return length(max(d,vec2(0.0))) + min(max(d.x,d.y), 0.0);",
        "}",
        "void main()",
        "{",
        "vec2 uv = uvs;",
        "vec2 uv2 = uv * 2.0 - 1.0; // from -1 to 1",
        "uv2.x *= ratio;",
        "vec3 col = mix(colorSecondary * uv.y, colorPrimary * uv.y, uv.x) * (brightness + activePanel * 0.4);",
        "vec3 borderCol = mix(colorSecondary, colorPrimary, uv.y);",
        "vec2 size = vec2(0.83 * ratio, 0.86) - borderRadius;",
        "float grad = sdBox(uv2, size) - borderRadius;",
        "grad = min(grad, sdBox(uv2 - size, vec2(borderRadius)));",
        "grad = min(grad, sdBox(uv2 + size, vec2(borderRadius)));",
        "grad = -grad;",
        "float aa = fwidth(grad);",
        "float isShape = smoothstep(-aa, 0.0, grad);",
        "float alpha = clamp(isShape + smoothstep(-0.015, 0.015, grad), 0.0, 1.0);",
        "float isBorder = smoothstep(-aa - borderWidth, aa - borderWidth, grad) - smoothstep(-aa + borderWidth, aa + borderWidth, grad);",
        "float mid = clamp(midSection, 0.0, 1.0);",
        "col *= 1.0 - mid * (step(0.5 - DIFF_SECTION_WIDTH * mid, uv.x) - step(0.5 + DIFF_SECTION_WIDTH * midSection, uv.x)) * 0.3;",
        "gl_FragColor = vec4(mix(col * isShape, borderCol, isBorder), alpha * opacity);",
        "}",
    ].join("\n"),

    // fragmentShader: document.getElementById('fragmentShader').textContent,
    update: function (data) {
        this.updateVariables(data, "attribute");
        this.updateVariables(data, "uniform");
        // this.el.sceneEl.systems.materials.registerPanel(this.material);
    },
});

