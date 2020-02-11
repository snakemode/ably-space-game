export default [
    { 
        hint: "Press the button to the right of the square logo", 
        succeedsWhen: (state, extraParams) => {
            return state.foo === "bar";
        }
    }
];