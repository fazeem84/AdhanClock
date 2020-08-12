module.exports = {
    purge: ["index.html", "src/**/*.scss", "src/**/*.js"],
    theme: {
        extend: {
            boxShadow: {
                solid: "1px 1px 0 rgba(0, 0, 0, 0.5)"
            },
            fontFamily: {
                mono: [
                    "Fira Code",
                    "Menlo",
                    "Monaco",
                    "Consolas",
                    "Liberation Mono",
                    "Courier New",
                    "monospace"
                ]
            },
            fontSize: {
                "16vw": "16vw",
                "12vw": "12vw",
                "14vw": "12vw",
                "10vw": "10vw",
                "8vw": "8vw"
            }
        }
    },
    variants: {},
    plugins: []
};