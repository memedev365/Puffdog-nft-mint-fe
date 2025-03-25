// src/react-reveal.d.ts or types/react-reveal.d.ts
declare module "react-reveal" {
    import { Component } from "react";

    // Define the types for the components you're using
    export class Fade extends Component<any> { }
    export class Flip extends Component<any> { }
    export class Zoom extends Component<any> { }

    // You can export other components from `react-reveal` as needed
}
