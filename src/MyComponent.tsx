import { Chart } from "@antv/g2";
import { InitCfg } from "@antv/g2/lib/geometry/base";
import { ChartCfg } from "@antv/g2/lib/interface";
import { Component, createEffect, onCleanup, onMount } from "solid-js";
import parser from "./parser";

export type Props = {
  data?: any[];
  scope: Record<string, any>;
  json: string;
  "init-config"?: Omit<ChartCfg, "container">;
  debug?: boolean;
};

const MyComponent: Component<Props> = (props) => {
  let div: HTMLDivElement;
  let chart: Chart;
  onMount(() => {
    chart = new Chart({
      container: div,
      ...props["init-config"],
    });

    console.log("div", div.parentElement);

    onCleanup(() => chart.destroy());
  });

  /**
   * {
      ...props.scope,
      chart,
      data: props.data ? props.data : [],
    }
   */
  createEffect(() => {
    props.debug && console.log("props", props);

    chart?.clear();
    const scope = {
      ...props.scope,
      chart,
      data: props.data ? props.data : [],
    };
    if (!props.json) {
      return;
    }

    try {
      const parsed = parser.parse(props.json);
      if (!parsed) {
        console.error(
          `[g2-render]: props.json参数格式不对, parse之后是 ${typeof parsed},期待parse成 object`
        );
      }
      parsed.render(scope);
    } catch (err) {
      console.error(err);
    }
  });

  return <div ref={div!}> {/*...*/} </div>;
};

export default MyComponent;
