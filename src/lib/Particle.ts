import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { ISourceOptions } from "@tsparticles/engine";

function getRandomColor(count: number) {
   const targetSaturation = 90;
   const targetBrightness = 60;
   const colors = [];
   for (let i = 0; i < count; i++) {
      const hue = Math.floor(Math.random() * 360);
      const saturation = targetSaturation;
      const lightness = targetBrightness;
      const color = hslToHex(hue, saturation, lightness);
      colors.push(color);
   }
   return colors;
}
function hslToHex(h: number, s: number, l: number) {
   h /= 360;
   s /= 100;
   l /= 100;
   let r, g, b;
   if (s === 0) {
      r = g = b = l;
   } else {
      const hueToRgb = (p: number, q: number, t: number) => {
         if (t < 0) t += 1;
         if (t > 1) t -= 1;
         if (t < 1 / 6) return p + (q - p) * 6 * t;
         if (t < 1 / 2) return q;
         if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
         return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
   }
   const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
   };
   return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function Particle() {
   const isDesktop = useMediaQuery("(min-width: 768px)");
   const configuration: ISourceOptions = {
      autoPlay: true,
      background: {
         color: {
            value: "#transparent",
         },
         image: "",
         position: "",
         repeat: "",
         size: "",
         opacity: 1,
      },
      backgroundMask: {
         composite: "destination-out",
         cover: {
            color: {
               value: "#fff",
            },
            opacity: 1,
         },
         enable: false,
      },
      clear: true,
      defaultThemes: {},
      delay: 0,
      fullScreen: {
         enable: false,
         zIndex: 0,
      },
      detectRetina: false,
      duration: 0,
      fpsLimit: 120,
      interactivity: {
         detectsOn: "window",
         events: {
            onClick: {
               enable: false,
               mode: [],
            },
            onDiv: {
               selectors: [],
               enable: false,
               mode: [],
               type: "circle",
            },
            onHover: {
               enable: isDesktop,
               mode: ["bubble"],
               parallax: {
                  enable: true,
                  force: 50,
                  smooth: 1000,
               },
            },
            resize: {
               delay: 0.5,
               enable: true,
            },
         },
         modes: {
            trail: {
               delay: 1,
               pauseOnStop: false,
               quantity: 1,
            },
            attract: {
               distance: 200,
               duration: 0.4,
               easing: "ease-out-quad",
               factor: 1,
               maxSpeed: 50,
               speed: 1,
            },
            bounce: {
               distance: 200,
            },
            bubble: {
               distance: 200,
               size: 100,
               opacity: 10,
               duration: 0.4,
               mix: false,
            },
            connect: {
               distance: 80,
               links: {
                  opacity: 0.5,
               },
               radius: 60,
            },
            grab: {
               distance: 100,
               links: {
                  blink: false,
                  consent: false,
                  opacity: 1,
               },
            },
            push: {
               default: true,
               groups: [],
               quantity: 4,
            },
            remove: {
               quantity: 2,
            },
            repulse: {
               distance: 200,
               duration: 0.4,
               factor: 100,
               speed: 1,
               maxSpeed: 50,
               easing: "ease-out-quad",
            },
            slow: {
               factor: 3,
               radius: 200,
            },
            light: {
               area: {
                  gradient: {
                     start: {
                        value: "#ffffff",
                     },
                     stop: {
                        value: "#000000",
                     },
                  },
                  radius: 1000,
               },
               shadow: {
                  color: {
                     value: "#000000",
                  },
                  length: 2000,
               },
            },
         },
      },
      manualParticles: [],
      particles: {
         bounce: {
            horizontal: {
               value: 1,
            },
            vertical: {
               value: 1,
            },
         },
         collisions: {
            absorb: {
               speed: 2,
            },
            bounce: {
               horizontal: {
                  value: 1,
               },
               vertical: {
                  value: 1,
               },
            },
            enable: false,
            maxSpeed: 50,
            mode: "bounce",
            overlap: {
               enable: true,
               retries: 0,
            },
         },
         color: {
            value: getRandomColor(30),
            animation: {
               h: {
                  count: 0,
                  enable: false,
                  speed: 1,
                  decay: 0,
                  delay: 0,
                  sync: true,
                  offset: 0,
               },
               s: {
                  count: 0,
                  enable: false,
                  speed: 1,
                  decay: 0,
                  delay: 0,
                  sync: true,
                  offset: 0,
               },
               l: {
                  count: 0,
                  enable: false,
                  speed: 1,
                  decay: 0,
                  delay: 0,
                  sync: true,
                  offset: 0,
               },
            },
         },
         effect: {
            close: true,
            fill: true,
            options: {},
            type: [],
         },
         groups: {},
         move: {
            angle: {
               offset: 0,
               value: 90,
            },
            attract: {
               distance: 200,
               enable: false,
               rotate: {
                  x: 3000,
                  y: 3000,
               },
            },
            center: {
               x: 50,
               y: 50,
               mode: "percent",
               radius: 0,
            },
            decay: 0,
            distance: {},
            direction: "none",
            drift: 0,
            enable: true,
            gravity: {
               acceleration: 9.81,
               enable: false,
               inverse: false,
               maxSpeed: 50,
            },
            path: {
               clamp: true,
               delay: {
                  value: 0,
               },
               enable: false,
               options: {},
            },
            outModes: {
               default: "out",
               bottom: "out",
               left: "out",
               right: "out",
               top: "out",
            },
            random: true,
            size: false,
            speed: 6,
            spin: {
               acceleration: 0,
               enable: false,
            },
            straight: false,
            trail: {
               enable: false,
               length: 10,
               fill: {},
            },
            vibrate: false,
            warp: false,
         },
         number: {
            density: {
               enable: true,
               width: 1920,
               height: 1080,
            },
            limit: {
               mode: "delete",
               value: 0,
            },
            value: 300,
         },
         opacity: {
            value: { min: 0, max: 1 },
            animation: {
               count: 0,
               enable: true,
               speed: 1,
               decay: 0,
               delay: 0,
               sync: false,
               mode: "increase",
               startValue: "min",
               destroy: "none",
            },
         },
         reduceDuplicates: false,
         shadow: {
            blur: 0,
            color: {
               value: "#000",
            },
            enable: false,
            offset: {
               x: 0,
               y: 0,
            },
         },
         shape: {
            close: true,
            fill: true,
            options: {},
            type: "circle",
         },
         size: {
            value: { min: 1, max: 80 },
            animation: {
               count: 0,
               enable: false,
               speed: 5,
               decay: 0,
               delay: 0,
               sync: false,
               mode: "auto",
               startValue: "random",
               destroy: "none",
            },
         },
         stroke: {
            width: 0,
         },
         zIndex: {
            value: {
               min: 0,
               max: 100,
            },
            opacityRate: 10,
            sizeRate: 10,
            velocityRate: 10,
         },
         destroy: {
            bounds: {},
            mode: "none",
            split: {
               count: 1,
               factor: {
                  value: 3,
               },
               rate: {
                  value: {
                     min: 4,
                     max: 9,
                  },
               },
               sizeOffset: true,
               particles: {},
            },
         },
         roll: {
            darken: {
               enable: false,
               value: 0,
            },
            enable: false,
            enlighten: {
               enable: false,
               value: 0,
            },
            mode: "vertical",
            speed: 25,
         },
         tilt: {
            value: 0,
            animation: {
               enable: false,
               speed: 0,
               decay: 0,
               sync: false,
            },
            direction: "clockwise",
            enable: false,
         },
         twinkle: {
            lines: {
               enable: false,
               frequency: 0.05,
               opacity: 1,
            },
            particles: {
               enable: false,
               frequency: 0.05,
               opacity: 1,
            },
         },
         wobble: {
            distance: 10,
            enable: true,
            speed: {
               angle: 10,
               move: 10,
            },
         },
         life: {
            count: 0,
            delay: {
               value: 0,
               sync: false,
            },
            duration: {
               value: 0,
               sync: false,
            },
         },
         rotate: {
            value: 0,
            animation: {
               enable: false,
               speed: 0,
               decay: 0,
               sync: false,
            },
            direction: "clockwise",
            path: false,
         },
         orbit: {
            animation: {
               count: 0,
               enable: false,
               speed: 1,
               decay: 0,
               delay: 0,
               sync: false,
            },
            enable: false,
            opacity: 1,
            rotation: {
               value: 45,
            },
            width: 1,
         },
         links: {
            blink: false,
            color: {
               value: "#fff",
            },
            consent: false,
            distance: 100,
            enable: false,
            frequency: 1,
            opacity: 1,
            shadow: {
               blur: 5,
               color: {
                  value: "#000",
               },
               enable: false,
            },
            triangles: {
               enable: false,
               frequency: 1,
            },
            width: 1,
            warp: false,
         },
         repulse: {
            value: 0,
            enabled: false,
            distance: 1,
            duration: 1,
            factor: 1,
            speed: 1,
         },
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      responsive: [],
      smooth: false,
      style: {},
      // themes: [
      //   {
      //     name: "light",
      //     default: {
      //       value: true,
      //       mode: "light",
      //     },
      //     options: {
      //       particles: {
      //         color: {
      //           value: ["#111827"],
      //         },
      //       },
      //     },
      //   },
      //   {
      //     name: "dark",
      //     default: {
      //       value: true,
      //       mode: "dark",
      //     },
      //     options: {
      //       particles: {
      //         color: {
      //           value: ["#E2E8F0"],
      //         },
      //       },
      //     },
      //   },
      // ],
      zLayers: 100,
      name: "Snow",
      motion: {
         disable: false,
         reduce: {
            factor: 4,
            value: true,
         },
      },
   };

   return configuration;
}
