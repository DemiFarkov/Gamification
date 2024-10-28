import React, { useCallback, useEffect, useMemo, useState } from "react";
import classes from "./style.module.scss";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import snow from "./snowflake4.png";
const Background = (props) => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    if (!props.load) {
      initParticlesEngine(async (engine) => {
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadAll(engine);
        //await loadFull(engine);
        await loadSlim(engine);
        //await loadBasic(engine);
      }).then(() => {
        setInit(true);
      });
    }
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
    document
      .querySelectorAll(
        `div > [mainblock="true"] > fieldset > span, div > [mainblockDiv="true"]`
      )
      .forEach((el) => (el.style.backgroundColor = "rgb(23 27 49 / 47%)"));
  };

  const options = useMemo(
    () => ({
      // The background color is for making the particles visible since they're white. Remove this section if not needed
      background: {
        color: "rgb(28, 28, 29)",
      },
      // The particles options
      particles: {
        // The color of the particles/snowflakes
        color: {
          value: "#fff",
        },
        // Move the snow flakes to bottom for a realistic effect, "out" in outModes is for making them reappear on top once exited at the bottom of the page, the speed should be slow for a realistic effect
        move: {
          direction: "bottom",
          enable: true,
          outModes: "out",
          speed: 2,
        },
        // How many particles/snowflakes will be created when starting the effect, density is a good option to enable since it calculates the particles number based on the screen size (mobile users will be happy)
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 400,
        },
        // The opacity of the particles/snowflakes
        opacity: {
          value: 0.7,
        },
        // The shape of the particles/snowflakes, also custom shapes can be used, this will be discussed at the end
        shape: {
          type: "images",
          options: {
            images: {
              src: `${snow}`,
              width: 200,
              height: 200,
            },
          },
        },
        // The size of the particles/snowflakes
        size: {
          value: 10,
        },
        // A nice wobble movement
        wobble: {
          enable: true,
          distance: 10,
          speed: 10,
        },
        // Some depth to the effect, (the layers count by default is 100, changing max here is not affecting that count)
        // The zIndex will affect speed, size and opacity of the particles/snowflakes, the smaller the zIndex the smaller/more transparent/slower the particles/snowflakes will be
        zIndex: {
          value: {
            min: 0,
            max: 100,
          },
        },
      },
    }),
    []
  );

  if (init) {
    return (
      <div className={classes.ParticlesContainer}>
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      </div>
    );
  }

  return <></>;
};

export default Background;
